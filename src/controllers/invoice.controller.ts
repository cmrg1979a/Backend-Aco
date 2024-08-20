import { Request, response, Response } from "express";
import { conexion } from "../routes/databasePGOp";
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";

export const getInvoicePath = async (req: Request, res: Response) => {
  const dataObj = req.query;

  await pool.query(
    "SELECT * FROM table_invoice_path($1,$2,$3)",
    [
      dataObj.id_master ? dataObj.id_master : null, 
      dataObj.id_proveedor ? dataObj.id_proveedor : null,
      dataObj.id_correlativo ? dataObj.id_correlativo : null
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

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
