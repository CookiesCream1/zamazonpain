import { useDbClient } from '~/composables/useDbClient'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const saleId = query.saleId

  if (!saleId) {
    throw createError({
      statusCode: 400,
      message: 'sale_id is required'
    })
  }

  const client = await useDbClient()

  try {
    // Fetch sale information
    const [saleResult]: [
      {
        sale_id: number;
        user_id: string;
        sale_date: string;
        total_amount: number;
        status: string;
      }
    ] = await client.query(
      `SELECT s.sale_id, s.user_id, s.sale_date, s.total_amount, ss.status
       FROM sales s
       JOIN sale_status ss ON s.sale_status = ss.id
       WHERE s.sale_id = ?`,
      [saleId]
    )

    if (!saleResult) {
      throw createError({
        statusCode: 404,
        message: 'Sale not found'
      })
    }

    // Fetch sale details
    const saleDetailsResult: Array<{
      product_id: number;
      product_name: string;
      quantity: number;
      price: number;
    }> = await client.query(
      `SELECT sd.product_id, p.product_name, sd.quantity, sd.price
       FROM sale_details sd
       JOIN products p ON sd.product_id = p.product_id
       WHERE sd.sale_id = ?`,
      [saleId]
    )

    return {
      sale: {
        saleId: saleResult.sale_id,
        userId: saleResult.user_id,
        saleDate: saleResult.sale_date,
        totalAmount: saleResult.total_amount,
        status: saleResult.status
      },
      saleDetails: saleDetailsResult.map(detail => ({
        productId: detail.product_id,
        productName: detail.product_name,
        quantity: detail.quantity,
        price: +detail.price
      }))
    }
  } finally {
    client.end()
  }
})
