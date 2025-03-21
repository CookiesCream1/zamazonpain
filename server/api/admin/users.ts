import { useDbClient } from '~/composables/useDbClient'

export default defineEventHandler(async () => {
  const db = await useDbClient()

  const r = (await db.query(
    'select user_id, created_at, role_name from users join user_roles on user_role = role_id;'
  )) as { user_id: string; created_at: Date; role_name: string }[]
  db.end()
  return r
})
