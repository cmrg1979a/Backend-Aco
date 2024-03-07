import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getComentariosPredefinidos = async (req: Request, res: Response) => {
  await pool.query(
    `SELECT * FROM table_comentarios_listar();`,
    [],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
        });
      } else {
        console.log(err);
      }
    }
  );
};
