import { useDbClient } from '~/composables/useDbClient'

export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'userid')
  if (uid === undefined) {
    setResponseStatus(event, 400)
    return
  }
  const client = await useDbClient()

  const r = await client.query(
    'select ur.role_name from users as u join user_roles as ur on u.user_role = ur.role_id where u.user_id = ?;',
    [uid]
  )
  
  if (r.length !== 1 || r[0].role_name === undefined) {
    setResponseStatus(event, 400)
    return
  }

  return r[0].role_name
})
