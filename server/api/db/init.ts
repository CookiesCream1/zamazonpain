import * as sql from '@libsql/client'

export default eventHandler(async function initDB () {
  const config = useRuntimeConfig()
  const client = sql.createClient(config.turso)

  const r = await client.execute('SELECT uuid4()')

  return r.toJSON()
})
