import z from 'zod'
import { useDbClient } from '~/composables/useDbClient'

const validator = z.object({
  id: z.number().positive(),
  OnOff: z.boolean()
})

export default defineEventHandler(async (event) => {
  const db = await useDbClient()
  const { id, OnOff } = validator.parse(await readBody(event))
  const value = OnOff ? 0 : 1
  const r = await db.query(
    'UPDATE products AS p SET p.removed = ? WHERE p.product_id = ?;',
    [value, id]
  )
  console.log(r)
  db.end()
})
