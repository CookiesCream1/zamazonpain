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
    setResponseStatus(event, 400)
    return
  }
  const body = validator.safeParse(await readBody(event)).data
  if (body === undefined) {
    setResponseStatus(event, 400)
    return
  }

  const db = await useDbClient()

  const r = (await db.query(
    'insert into sales (user_id, total_amount) values (?, ?);',
    [uid, body.total_price]
  )) as Record<string, unknown> & { insertId: number }

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
  db.end()
})
