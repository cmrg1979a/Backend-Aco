import * as pg from "pg";
const { Pool } = pg;

// /**PROUCCIÓN */
// export function conexion() {
//   const pool = new Pool({
//     host: "10.116.0.2",
//     // host: "157.230.14.98", // remoto
//     user: "postgres",
//     password: "@Developer2021Pic",
//     port: "5432",
//     database: "db_op_main_01",
//   });
//   return pool;
// }

/** DESARROLLO */
export function conexion() {
  const pool = new Pool({
    host: "67.205.129.62",
    user: "chainsolver",
    password: "Fr3sc0l1t4+",
    port: "5432",
    // database: "db_op_main_dev",
    // database: "db_op_main_02",
    // database: "db_op_main_qa",
    database: "db_op_main_edison",
  });
  return pool;
}
