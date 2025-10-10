import * as pg from "pg";
const { Pool } = pg;

function conexion() {
  const config = process.env.NODE_ENV
    ? {
        host: "10.116.0.15",
        user: "postgres",
        password: "@Developer2021Pic",
        port: "5432",
        database: "db_op_main_01",
      }
    : {
        // host: "67.205.129.62",
        // host: "143.244.169.120",
        host: "143.244.169.120",
        user: "postgres",
        password: "@Developer2021Pic",
        port: "5432",
        database: "db_op_main_02",
      };

  return new Pool(config);
}

export { conexion };
