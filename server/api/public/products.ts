import { useDbClient } from '~/composables/useDbClient'

export default defineEventHandler(async () => {
  const client = await useDbClient()

  const r = (await client.query(
    'select product_id, product_name, description, price, rating from products where removed = 0 order by rating desc;'
  )) as {
    product_id: string;
    product_name: string;
    description: string;
    price: string;
    rating: number;
  }[]
  client.end()
  return r.map(v => ({
    productId: +v.product_id,
    productName: v.product_name,
    price: +v.price,
    description: v.description,
    rating: v.rating
  }))
})
