import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";

const pool = conexion();

export const getVerConfigAviso = async (req: Request, res: Response) => {
  const { id_branch, id } = req.query;
  await pool.query(
    "SELECT * FROM function_config_aviso_get($1)",
    [id_branch],
    (err, response, fields) => {
      let rows = response.rows;
      if (!err) {
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

export const actualizarConfigAviso = async (req: Request, res: Response) => {
  const { aviso_llegada, id } = req.body;
  await pool.query(
    "SELECT * FROM function_config_aviso_actualizar($1,$2)",
    [id, aviso_llegada],
    (err, response, fields) => {
      
      let rows = response.rows;
      if (!err) {
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
