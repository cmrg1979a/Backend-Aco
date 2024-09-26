import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const getPlanes = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM obtener_planes_con_caracteristicas();",
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
          res.json({
            status: 200,
            statusBol: true,
           data: rows,
          token: renewTokenMiddleware(req),
          });
      } else {
        console.log(err);
      }
    }
  );
};
