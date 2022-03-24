import { Request, Response } from "express";
import { connect } from "../routes/database";

export const setInvoiceAdmin = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  conn.query(
    "INSERT INTO Table_InvoiceAdmin (type_payment, id_expediente, id_proveedor, fecha, nro_factura, nro_serie, id_coins, monto, type_igv, igv, total, status, id_path) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      dataObj.type_payment,
      dataObj.id_expediente,
      dataObj.id_proveedor,
      dataObj.fecha,
      dataObj.nro_factura,
      dataObj.nro_serie,
      dataObj.id_coins,
      dataObj.monto,
      dataObj.type_igv,
      dataObj.igv,
      dataObj.total,
      dataObj.status,
      dataObj.id_path,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: "Registro no aceptado",
          },
        });
      }
      conn.end();
    }
  );
};

export const putPro = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  conn.query(
    "UPDATE Table_Invoice SET type_pago = 1, id_path = ? where id = ?",
    [dataObj.id_path, dataObj.id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: "Registro no aceptado",
          },
        });
      }
      conn.end();
    }
  );
};

export const paymentInvoiceAdmin = async (req: Request, res: Response) => {
  const conn = await connect();

  const id = req.params.id;
  const dataObj = req.body;

  conn.query(
    "UPDATE Table_InvoiceAdmin SET id_pago = ?, fecha_pago = ?, factura_pago = ?, serie_pago = ?, id_bank_pago = ?, id_coin_pago = ?, monto_pago = ?, status = ? where id = ?",
    [
      dataObj.id_pago,
      dataObj.fecha_pago,
      dataObj.factura_pago,
      dataObj.serie_pago,
      dataObj.id_bank_pago,
      dataObj.id_coin_pago,
      dataObj.monto_pago,
      dataObj.status,
      id,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: "Registro no aceptado",
          },
        });
      }
      conn.end();
    }
  );
};

export const getInvoiceAdmin = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_listInvoiceAdmin where status <> 0",

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

export const delPro = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  conn.query(
    "UPDATE Table_InvoiceAdmin SET status = 0 where id = ?",
    [dataObj.id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: "Registro no aceptado",
          },
        });
      }
      conn.end();
    }
  );
};

export const getRegularizar = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_regularizarPro where pagado = 1 ",

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
