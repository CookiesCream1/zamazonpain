import * as sql from "@libsql/client";

export default async function initDB() {
  const config = useRuntimeConfig();
  const client = sql.createClient(config.turso);

  const r = await client.execute("SELECT 1");

  return r.toJSON();
}
