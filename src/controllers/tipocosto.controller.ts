import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
export const getTipoCostoPorEmbarque = async (req: Request, res: Response) => {
  const { id_modality, id_shipment } = req.query;

  await pool.query(
    "SELECT * FROM function_tipocosto_embarque_cargar($1,$2)",
    [id_modality, id_shipment],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
