import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getComentariosPredefinidos = async (req: Request, res: Response) => {
  const { id_branch } = req.query;

  await pool.query(
    `SELECT * FROM table_op_comentarios_tracking_listar($1);`,
    [id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
            token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
