import { Request, Response } from "express";
import { logging } from "googleapis/build/src/apis/logging";
import { connect } from "../routes/database";

export const getBanksList = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_banksList where status <> 0",
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
      } else {
        console.log(err);
      }
      conn.end();
    }
  );
};

export const getListaPagosXProveedorCxP = async (
  req: Request,
  res: Response
) => {
  let id = req.params.id_proveedor;
  console.log(id);
  const conn = await connect();
  await conn.query(
    `SELECT * FROM (SELECT @pid:=${id}) alias,view_listado_banco_proveedor`,
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
        conn.end();
      } else {
        console.log(err);
        conn.end();
      }
    }
  );
};

export const setPayForProveedor = async (req: Request, res: Response) => {
  const conn = await connect();
  const dataObj = req.body.details;
  const id_path = req.body.id_path;
  dataObj.map((item: any) => {
    conn.query(
      "INSERT INTO detailsPaysInvoiceAdmin (id_invoiceadmin,id_pago,monto,status) values (?,?,?,?)",
      [item.id, id_path, item.max_pagar, 1],
      (err, rows, fields) => {
        if (!err) {
        } else {
          console.log(err);
        }
      }
    );
  });
  // dataObj.map((item: any) => {
  //   conn.query(
  //     "UPDATE Table_InvoiceAdmin set status = 2 where id = ? and 1 = ?"
  //   ),
  //     [item.id, item.cktotal],
  //     (err, rows, fields) => {
  //       if (!err) {
  //       } else {
  //         console.log(err);
  //       }
  //     };
  // });
  // dataObj.forEach((element) => {
  //   if (element.cktotal == 1) {
  //     conn.query(`
  //     UPDATE Table_InvoiceAdmin set status = 2 where id = ${element.id}
  //     `);
  //   }

  // });
  setTimeout(() => {
    res.json({
      status: 200,
      statusBol: true,
      data: {
        msg: "Registro completo",
      },
    });
    // conn.end();
  }, 600);
};
