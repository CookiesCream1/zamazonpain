import { createConnection } from 'mariadb'

export const useDbClient = async () => {
  const { mariadb } = useRuntimeConfig()

  const conn = await createConnection(mariadb)
  conn.execute('use debug')
  return conn
}
