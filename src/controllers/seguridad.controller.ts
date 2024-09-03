import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const getValidarUsuarioAdmin = async (req: Request, res: Response) => {
  let { usuario, clave } = req.body;
  await pool.query(
    "SELECT * FROM table_validar_usuario_admin($1,$2)",
    [usuario, clave],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
