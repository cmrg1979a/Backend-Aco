import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import { iConfigEmpresa } from "interface/iConfigEmpresa";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const ObtenerExisteDatosConfig = async (req: Request, res: Response) => {
  let { id_branch } = req.query;
  await pool.query(
    "SELECT * FROM function_validar_existen_datos_config($1)",
    [id_branch],
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

export const GuardarExisteDatosConfig = async (req: Request, res: Response) => {
  let iConfigEmpresa: iConfigEmpresa = req.body;
  await pool.query(
    "SELECT * FROM function_insertar_actualizar_config($1,$2,$3,$4)",
    [
      iConfigEmpresa.id_branch,
      iConfigEmpresa.correlativopricing,
      iConfigEmpresa.correlativomaster,
      iConfigEmpresa.correlativocge,
    ],
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
