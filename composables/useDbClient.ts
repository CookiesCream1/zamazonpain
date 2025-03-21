import { createConnection } from 'mariadb'

export const useDbClient = async () => {
  const { mariadb } = useRuntimeConfig()

  const conn = await createConnection({ ...mariadb, port: +mariadb.port, connectTimeout: 100000 })
  conn.query('use railway')
  return conn
}
