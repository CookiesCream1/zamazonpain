import { useDbClient } from '~/composables/useDbClient'

export default defineEventHandler(async () => {
  const db = await useDbClient()
  const r = (await db.query(
    'select product_id, product_name, description, price, rating, removed from products order by rating desc;'
  )) as {
    product_id: string;
    product_name: string;
    description: string;
    price: string;
    rating: number;
    removed: number;
  }[]
  db.end()
  return r.map(v => ({
    productId: +v.product_id,
    productName: v.product_name,
    price: +v.price,
    description: v.description,
    rating: v.rating,
    removed: v.removed
  }))
})
