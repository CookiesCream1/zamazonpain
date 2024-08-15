import { createConnection } from "mariadb";

export const useDbClient = async () => {
  const { mariadb } = useRuntimeConfig();

  const conn = await createConnection({ ...mariadb, port: +mariadb.port });
  conn.query("use railway");
  return conn;
};
