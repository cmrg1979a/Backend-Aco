import * as pg from "pg";
const { Pool } = pg;

require("dotenv").config();

let host = "";
let user = "";
let password = "";
let port = "";
let database = "";
if (process.env.NODE_ENV == "development") {
  host = "67.205.129.62";
  user = "chainsolver";
  password = "Fr3sc0l1t4+";
  port = "5432";
  database = "chainsolver_db_v3";
}

if (process.env.NODE_ENV == "test") {
  host = "67.205.129.62";
  user = "chainsolver";
  password = "Fr3sc0l1t4+";
  port = "5432";
  database = "chainsolver_db_v3";
}
if (process.env.NODE_ENV == "production") {
  host = "10.116.0.2";
  user = "postgres";
  password = "@Developer2021Pic";
  port = "5432";
  database = "chainsolver_db_v3";
}

// // /**PROUCCIÓN  */
// export function conexion() {
//   const pool = new Pool({
//     host: "10.116.0.2",
//     // host: "157.230.14.98", // remoto
//     user: "postgres",
//     password: "@Developer2021Pic",
//     port: "5432",
//     database: "chainsolver_db_v3",
//   });
//   return pool;
// }

// /** DESARROLLO */
// export function conexion() {
//   const pool = new Pool({
//     host: "67.205.129.62",
//     user: "chainsolver",
//     password: "Fr3sc0l1t4+",
//     port: "5432",
//     database: "chainsolver_db_v3",
//   });
//   return pool;
// }
export function conexion() {
  const pool = new Pool({
    host: host,
    user: user,
    password: password,
    port: port,
    database: database,
  });
  return pool;
}
