import { Request, response, Response } from "express";

import { conexion } from "../routes/databasePGOp";
const pool = conexion();

export const getInvoicePath = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM table_invoice_path($1,$2)",
    [req.params.id_house, req.params.id_proveedor],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
            data: rows,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
