import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { IPosition } from "interface/iPosition";

export const CargarPosicion = async (req: Request, res: Response) => {
  const position: IPosition = req.query;
  await pool.query(
    "SELECT * FROM function_position_cargar($1)",
    [position.id_branch],
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

export const ListarPosicion = async (req: Request, res: Response) => {
  const position: IPosition = req.query;
  await pool.query(
    "SELECT * FROM function_position_listar($1)",
    [position.id_branch, position.code, position.name, position.description],
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
