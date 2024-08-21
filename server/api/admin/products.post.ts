import z from "zod";
import { useDbClient } from "~/composables/useDbClient";

const validator = z.object({
  productName: z.string().min(5).max(20),
  price: z.number().positive(),
  productDescription: z.string().min(10).max(100),
  category: z.string().max(255),
});

export default defineEventHandler(async (event) => {
  const db = await useDbClient();
  const parsed = validator.safeParse(await readBody(event));
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: `validation failed : ${parsed.error}`,
    });
  }
  const [{ category_id }] = (await db.query(
    "select category_id from product_categories where category_name = ?",
    [parsed.data.category]
  )) as { category_id: number }[];

  const [{ id: pending_id }] = (await db.query(
    "select id from sale_status where status = 'pending'"
  )) as { id: number }[];

  if (!category_id || !pending_id) {
    throw createError({
      statusCode: 400,
      message: `unkown category : ${parsed.data.category}`,
    });
  }

  await db.query(
    "INSERT INTO products (product_name, description, price, category_id, sale_status) VALUES (?, ?, ?, ?, ?)",
    [
      parsed.data.productName,
      parsed.data.productDescription,
      parsed.data.price,
      category_id,
      pending_id,
    ]
  );
  db.end();
});
