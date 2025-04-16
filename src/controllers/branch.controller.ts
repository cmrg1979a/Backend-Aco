import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const listarSucursal = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_branch_list()",
    [],
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
export const inactivarSucursal = async (req: Request, res: Response) => {
  let { id } = req.body;
  await pool.query(
    "SELECT * FROM function_branch_inactivar($1)",
    [id],
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
