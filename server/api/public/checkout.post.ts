import { z } from 'zod'
import { getServerSession } from '#auth'
import { useDbClient } from '~/composables/useDbClient'
import useMail from '~/composables/useMail'

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
      const mailClient = useMail()
      db.query('START TRANSACTION')
      try {
        await db.query(
          'UPDATE sales SET sale_status = (SELECT id FROM sale_status WHERE status = "success") ' +
            'WHERE sale_id = ? AND sale_status != (SELECT id FROM sale_status WHERE status = "cancelled")',
          [r.insertId]
        )

        const userResult = (await db.query(
          'SELECT email FROM users WHERE user_id = ?',
          [uid]
        )) as { email: string }[]

        if (!userResult.length) {
          throw new Error('User email not found')
        }

        const userEmail = userResult[0].email

        mailClient.sendMail({
          from: 'lemmensmano@gmail.com',
          to: userEmail,
          subject: 'Confirmation of Sale',
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: #4CAF50;">Sale Confirmation</h2>
              <p>Dear Customer,</p>
              <p>We are pleased to inform you that your sale has been successfully processed.</p>
              <p>Thank you for your purchase!</p>
              <br>
              <p>Best regards,</p>
              <p>Zamazon Company</p>
            </div>
          `
        })
      } catch (error) {
        db.query('ABORT')
        console.error('Failed to set sale status to success:', error)
      } finally {
        db.query('COMMIT')
        db.end()
        mailClient.close()
      }
    }, 5 * 60 * 1000) // 5 minutes in milliseconds

    await db.query('COMMIT')

    // Return the sale ID in the response
    return { saleId: '' + r.insertId }
  } catch (error) {
    await db.query('ROLLBACK')
    console.error('Checkout error:', error)
    setResponseStatus(event, 500, 'Internal server error')
    return
  } finally {
    db.end()
  }
})
