import { useDbClient } from '~/composables/useDbClient'

export default defineCachedEventHandler(async function initDB () {
  const client = await useDbClient()

  const r = await client.query('SELECT 1')

  return r
})
