import { useDbClient } from '~/composables/useDbClient'

export default defineEventHandler(async () => {
  const client = await useDbClient()

  return client.query('select product_name, description, price from products;')
})
