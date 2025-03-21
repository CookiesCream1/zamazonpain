import { z } from 'zod'
import { getServerSession } from '#auth'
import { useDbClient } from '~/composables/useDbClient'

const validator = z.object({
  saleId: z.number().positive(),
  productId: z.number().positive(),
  quantity: z.number().int().min(0)
})

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  // @ts-expect-error
  const userId = session?.user?.id
  if (userId === undefined) {
    setResponseStatus(event, 400, 'User not authenticated')
    return
  }

  const body = validator.safeParse(await readBody(event))
  if (!body.success) {
    setResponseStatus(event, 400, 'Invalid input')
    return
  }

  const { saleId, productId, quantity } = body.data

  const db = await useDbClient()

  try {
    // Check if the sale belongs to the user and is in a pending status
    const [saleResult]: [{ sale_id: number, user_id: string, sale_date: Date, total_amount: number, sale_status: number }?] = await db.query(
      'SELECT * FROM sales WHERE sale_id = ? AND user_id = ? AND sale_status = (SELECT id FROM sale_status WHERE status = "pending")',
      [saleId, userId]
    )

    if (!saleResult) {
      setResponseStatus(event, 404, 'Sale not found or not editable')
      return
    }

    if (quantity === 0) {
      await db.query(
        'DELETE FROM sale_details WHERE sale_id = ? AND product_id = ?',
        [saleId, productId]
      )
    } else {
      await db.query(
        'UPDATE sale_details SET quantity = ?, price = (SELECT price FROM products WHERE product_id = ?) ' +
        'WHERE sale_id = ? AND product_id = ?',
        [quantity, productId, saleId, productId]
      )
    }

    // Update the total_amount in the sales table
    await db.query(
      'UPDATE sales s ' +
      'SET total_amount = (SELECT SUM(sd.quantity * sd.price) FROM sale_details sd WHERE sd.sale_id = s.sale_id) ' +
      'WHERE s.sale_id = ?',
      [saleId]
    )

    return { success: true }
  } catch (error) {
    console.error('Error updating sale:', error)
    setResponseStatus(event, 500, 'Failed to update sale')
    return
  } finally {
    db.end()
  }
})
