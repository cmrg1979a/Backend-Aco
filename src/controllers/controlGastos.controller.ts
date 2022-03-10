import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postControl } from "../interface/controlGastos";

export const setControl = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postControl = req.body;

  await conn.query(
    "call Table_ControlGastos_Insertar(?,?,?)",
    [dataObj.id_house, dataObj.id_user, dataObj.status],
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
    }
  );
};

export const setIngresos = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  await conn.query(
    "call PA_CIngresos_Insert(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      dataObj.id_orders,
      dataObj.concepto,
      dataObj.monto_op,
      0,
      dataObj.igv_op,
      0,
      dataObj.total_op,
      0,
      0,
      "",
      "",
      1,
      dataObj.id_user,
    ],
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
    }
  );
};

export const setEgresos = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  await conn.query(
    "call PA_CEgresos_Insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      dataObj.id_orders,
      dataObj.id_proveedor,
      dataObj.concepto,
      dataObj.monto_op,
      0,
      dataObj.igv_op,
      0,
      dataObj.total_op,
      0,
      0,
      "",
      "",
      1,
      dataObj.id_user,
    ],
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
    }
  );
};

export const getIngresosList = async (req: Request, res: Response) => {
  const conn = await connect();

  const id_orders = req.params.id_orders;

  await conn.query(
    "select * from view_costosIngresos where id_orders = ?",
    [id_orders],
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
    }
  );
};

export const getEgresosList = async (req: Request, res: Response) => {
  const conn = await connect();

  const id_orders = req.params.id_orders;

  await conn.query(
    "select * from view_costosEgresos where id_orders = ?",
    [id_orders],
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
    }
  );
};

export const getEgresosExpediente = async (req: Request, res: Response) => {
  const conn = await connect();

  const id_house = req.params.id_house;

  await conn.query(
    "select * from view_costosEgresos where id_house = ?",
    [id_house],
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
    }
  );
};

export const getEgresosProveedorList = async (req: Request, res: Response) => {
  const conn = await connect();

  const id_orders = req.params.id_orders;
  const id_proveedor = req.params.id_proveedor;

  await conn.query(
    "select * from view_costosEgresos where id_orders = ? and id_proveedor = ?",
    [id_orders, id_proveedor],
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
    }
  );
};

export const getTotalesProveedor = async (req: Request, res: Response) => {
  const conn = await connect();

  const id_orders = req.params.id_orders;

  await conn.query(
    "select * from view_totalesProveedor where id_orders = ?",
    [id_orders],
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
    }
  );
};

export const delEgresos = async (req: Request, res: Response) => {
  const conn = await connect();

  const id = req.params.id;

  await conn.query(
    "delete from ControlGastos_Egresos where id = ?",
    [id],
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
    }
  );
};

export const delIngresos = async (req: Request, res: Response) => {
  const conn = await connect();

  const id = req.params.id;

  await conn.query(
    "delete from ControlGastos_Ingresos where id = ?",
    [id],
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
    }
  );
};

export const getControlList = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query("select * from view_controlList", (err, rows, fields) => {
    if (!err) {
      res.json({
        status: 200,
        statusBol: true,
        data: rows,
      });
    } else {
      console.log(err);
    }
  });
};

export const editIngreso = async (req: Request, res: Response) => {
  const conn = await connect();
  const id = req.params.id;

  const data = req.body;

  await conn.query(
    "update ControlGastos_Ingresos set concepto = ?, monto_pr = ?, monto_op = ?, igv_pr = ?, igv_op = ?, total_pr = ?, total_op = ?, tipo_pago = ?, numero = ?, fecha = ? where id = ?",
    [
      data.concepto,
      data.monto_op,
      data.monto_pr,
      data.igv_op,
      data.igv_pr,
      data.total_op,
      data.total_pr,
      data.tipo_pago,
      data.numero,
      data.fecha,
      id,
    ],
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
    }
  );
};

export const editEgreso = async (req: Request, res: Response) => {
  const conn = await connect();
  const id = req.params.id;

  const data = req.body;

  await conn.query(
    "update ControlGastos_Egresos set id_proveedor = ?, concepto = ?, monto_pr = ?, monto_op = ?, igv_pr = ?, igv_op = ?, total_pr = ?, total_op = ?, tipo_pago = ?, numero = ?, fecha = ? where id = ?",
    [
      data.id_proveedor,
      data.concepto,
      data.monto_op,
      data.monto_pr,
      data.igv_op,
      data.igv_pr,
      data.total_op,
      data.total_pr,
      data.tipo_pago,
      data.numero,
      data.fecha,
      id,
    ],
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
    }
  );
};
