import * as pg from "pg";
const { Pool } = pg;

require("dotenv").config();

function conexion() {
  const config = process.env.NODE_ENV
    ? {
        host: "10.116.0.2",
        // host: "157.230.14.98", // remoto
        user: "postgres",
        password: "@Developer2021Pic",
        port: "5432",
        database: "chainsolver_db_v3",
      }
    : {
        host: "67.205.129.62",
        user: "chainsolver",
        password: "Fr3sc0l1t4+",
        port: "5432",
        database: "chainsolver_db_v3",
      };
  return new Pool(config);
}

export { conexion };
