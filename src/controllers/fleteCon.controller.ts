import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";

const pool = conexion();

export const getFleteCon = async (req: Request, res: Response) => {
  await pool.query(
    "select * from TABLE_FLETE_CONDITIONS_listar();",
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!err) {
          if (!!rows[0].estadoflag) {
            res.json({
              status: 200,
              statusBol: true,
             data: rows,          token: renewTokenMiddleware(req),
            });
          } else {
            res.json({
              status: 200,
              statusBol: true,
              mensaje: rows[0].mensaje,
            });
          }
        } else {
          console.log(err);
        }
      } else {
        console.log(err);
      }
    }
  );
};
