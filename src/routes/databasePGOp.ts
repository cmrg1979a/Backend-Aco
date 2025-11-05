import * as pg from "pg";
const { Pool } = pg;
console.log("NODE_ENV", process.env.NODE_ENV);
function conexion() {
  const config = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    database: process.env.database,
  };

  return new Pool(config);
}

export { conexion };
