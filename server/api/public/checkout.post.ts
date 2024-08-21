import { z } from 'zod'
import { getServerSession } from '#auth'
import { useDbClient } from '~/composables/useDbClient'

const validator = z.object({
  total_price: z.number().positive(),
  product_arr: z.array(
    z.object({
      product_id: z.number(),
      price: z.number().positive(),
      count: z.number().int()
    })
  )
})

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  // @ts-expect-error
  const uid = session?.user?.id
  if (uid === undefined) {
    setResponseStatus(event, 400, 'User not authenticated')
    return
  }
  const body = validator.safeParse(await readBody(event)).data
  if (body === undefined) {
    setResponseStatus(event, 400, 'Invalid request body')
    return
  }

  const db = await useDbClient()

  try {
    await db.query('START TRANSACTION')

    const statusResult = (await db.query(
      'SELECT id FROM sale_status WHERE status = "pending"'
    )) as { id: number }[]

    if (!statusResult.length) {
      await db.query('ROLLBACK')
      setResponseStatus(event, 500, 'Pending sale status not found')
      return
    }

    const pendingStatusId = statusResult[0].id

    const r = (await db.query(
      'insert into sales (user_id, total_amount, sale_status) values (?, ?, ?);',
      [uid, body.total_price, pendingStatusId]
    )) as { insertId: number }

    await db.query(
      `insert into sale_details (sale_id, product_id, quantity, price) values ${body.product_arr
        .map(_ => '(?, ?, ?, ?)')
        .join(', ')};`,
      body.product_arr.flatMap(v => [
        r.insertId,
        v.product_id,
        v.count,
        v.price
      ])
    )

    setTimeout(async () => {
      const db = await useDbClient()
      try {
        await db.query(
          'UPDATE sales SET sale_status = (SELECT id FROM sale_status WHERE status = "success") ' +
          'WHERE sale_id = ? AND sale_status != (SELECT id FROM sale_status WHERE status = "cancelled")',
          [r.insertId]
        )
      } catch (error) {
        console.error('Failed to set sale status to success:', error)
      } finally {
        db.end()
      }
    }, 5 * 60 * 1000) // 5 minutes in milliseconds

    await db.query('COMMIT')

    // Return the sale ID in the response
    return { saleId: ""+r.insertId }
  } catch (error) {
    await db.query('ROLLBACK')
    console.error('Checkout error:', error)
    setResponseStatus(event, 500, 'Internal server error')
    return
  } finally {
    db.end()
  }
})
