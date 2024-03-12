import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const generarConsolidacion = async (req: Request, res: Response) => {
  let data = req.body;

  await pool.query(
    "SELECT * FROM function_genearconsolidacion($1,$2,$3,$4,$5)",
    [
      data.fecha_inicio,
      data.fecha_fin,
      data.cost.map((element) => {
        return element.fecha;
      }),
      data.cost.map((element) => {
        return element.nro_operacion ? element.nro_operacion : null;
      }),
      data.cost.map((element) => {
        return element.monto;
      }),
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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
    }
  );
};
