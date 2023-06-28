import * as pg from "pg";
const { Pool } = pg;
/** DESARROLLO */
export function conexion() {  
  const pool = new Pool({
    host: "67.205.129.62",
    user: "chainsolver",
    password: "Fr3sc0l1t4+",
    port: "5432",
    database: "chainsolver_db_v3",
  });
  return pool;
}

/**PROUCCIÓN */
// export function conexion() {
//   const pool = new Pool({
//     host: "157.230.14.98",
//     user: "postgres",
//     password: "@Developer2021Pic",
//     port: "5432",
//     database: "chainsolver_db_v3",
//   });
//   return pool;
// }


/**PROUCCIÓN INTERNA */
// export function conexion() {
//   const pool = new Pool({
//     host: "10.116.0.2",
//     user: "postgres",
//     password: "@Developer2021Pic",
//     port: "5432",
//     database: "chainsolver_db_v3",
//   });
//   return pool;
// }
