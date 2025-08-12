import { Request, response, Response } from "express";
import { conexion } from "../routes/databasePGOp";
const pool = conexion();

export const cargarPuertos = async (req: Request, res: Response) => {
  let { search } = req.query;
  await pool.query(
    "SELECT * FROM function_calc_puerto($1)",
    [!!search ? search : null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const cargarPaises = async (req: Request, res: Response) => {
  let { search } = req.query;
  await pool.query(
    "SELECT * FROM function_pais_cargar($1)",
    [!!search ? search : null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
