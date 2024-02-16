import { Request, response, Response } from "express";

import { conexion } from "../routes/databasePGOp";
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
export const getInvoicePath = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM table_invoice_path($1,$2,$3)",
    [req.query.id_master, req.query.id_proveedor,req.query.id_correlativo],
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
           data: rows,
          token: renewTokenMiddleware(req),
          });
          
        }
      } else {
        console.log(err);
      }
    }
    
  );
};
