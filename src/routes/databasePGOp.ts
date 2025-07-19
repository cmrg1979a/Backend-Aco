import * as pg from "pg";
const { Pool } = pg;

console.log("esProduccion", global.esProduccion);

function conexion() {
  const config = global.esProduccion
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
        host: "10.116.0.15",
        user: "postgres",
        password: "@Developer2021Pic",
        port: "5432",
        database: "db_op_main_01",
      };

  return new Pool(config);
}


export { conexion };
