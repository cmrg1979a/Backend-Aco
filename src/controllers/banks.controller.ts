import { Request, Response } from "express";
import { logging } from "googleapis/build/src/apis/logging";
import { connect } from "../routes/database";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const getBanksList = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM table_banks_listar()",
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
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getListaPagosXProveedorCxP = async (
  req: Request,
  res: Response
) => {
  let id = req.params.id_proveedor;

  await pool.query(
    `SELECT * FROM pagosXProveedorCxP_listar($1,$2)`,
    [id, 1],
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
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const setPayForProveedor = async (req: Request, res: Response) => {
  const details = req.body.details;
  const pid_pago = req.body.id_path;

  const id_cuenta = req.body.id_cuenta;
  await pool.query(
    "SELECT * FROM detailsPaysInvoiceAdmin_insertar($1,$2,$3,$4,$5,$6,$7)",
    [
      details.map(function (item) {
        return item.id;
      }), // pid_invoiceadmin int[],
      pid_pago,
      details.map(function (item) {
        return item.max_pagar;
      }), // pmonto numeric[],
      id_cuenta,
      details.map(function (item) {
        return !!item.cktotal ? 1 : 0;
      }), // cktotal int[],
      details.map(function (item) {
        return item.monto_deuda;
      }), // monto_deuda numeric[],
      details.map(function (item) {
        return item.monto_pagar;
      }), // monto_pagar numeric[]
    ],
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
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getListBanksDetailsCargar = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    `SELECT * FROM bank_details_cargar();`,
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!err) {
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
            });
          }
        } else {
          console.log(err);
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getListar = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM Table_InvoiceAdmin_listar2($1)",
    [req.body.id_branch],
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
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const getVerPagosPorProveedor = async (req: Request, res: Response) => {
  const { id } = req.query;
  console.log(id);

  pool.query(
    "SELECT * FROM detailsPaysInvoiceAdmin_pagos_por_proveedor($1)",
    [id],
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
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const setPayForCustomer = async (req: Request, res: Response) => {
  const details = req.body.details;
  const pid_pago = req.body.id_path;
  const id_cuenta = req.body.id_cuenta;
  const fecha = req.body.fecha;
  const id_path = req.body.id_path;
  console.log(fecha);
  await pool.query(
    // detailsPaysInvoiceAdmin_insertar(pid_invoiceadmin int[],	pid_pago int,	pmonto numeric[],	pid_cuenta int,	cktotal int[],	monto_deuda numeric[],	monto_pagar numeric[])
    "SELECT * FROM detailsPaysInvoiceAdminCxC_insertar($1,	$2,$3,	$4,	$5,	$6,$7,$8,$9,$10,$11)",
    [
      details.map(function (item) {
        return item.id;
      }), // pid_invoiceadmin int[],
      pid_pago,
      details.map(function (item) {
        return item.max_pagar;
      }), // pmonto numeric[],
      id_cuenta,
      details.map(function (item) {
        return !!item.cktotal ? 1 : 0;
      }), // cktotal int[],
      details.map(function (item) {
        return item.monto_deuda;
      }), // monto_deuda numeric[],
      details.map(function (item) {
        return item.monto_pagar;
      }), // monto_pagar numeric[]
      details.map(function (item) {
        return item.esinvoiceflag;
      }), // pesinvoiceflag boolean[],
      details.map(function (item) {
        return item.id_house;
      }), // pid_house int[],
      id_path, //id_path
      fecha, // pfecha date
    ],

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
            statusBol: false,
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


export const getListarPayForCustomer = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM Table_InvoiceAdminCxC_listado($1);",
    [req.params.id_branch],
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
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const getVerPagosPorCustomer = async (req: Request, res: Response) => {
  const { id } = req.query;
  console.log(id)
  await pool.query(
    "SELECT * FROM pagos_por_cliente($1);",
    [id],
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
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getListaPagosXProveedorCxC = async (
  req: Request,
  res: Response
) => {
  let id = req.params.id_cliente;

  await pool.query(
    `SELECT * FROM Table_InvoiceAdminCxC_pagoxcliente($1)`,
    [id],
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
            statusBol: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

// export const ExportarListadoReportePagos = async (
//   req: Request,
//   res: Response
// ) => {

//   await conn.query("SELECT * from view_reporte_pagos", (err, rows, fields) => {
//     if (err) {
//       console.log(err);

//     } else {
//       res.json({
//         status: 200,
//         statusBol: true,
//         data: rows,
//       });

//     }
//   });
// };

export const RegistroPagoDetalles = async (req: Request, res: Response) => {
  let data = req.body;
  let details = req.body.details;

  console.log(req.body);

  await pool.query(
    "select * from table_pagosControlEgresos_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ",
    [
      details.map(function (item: any) {
        return item.id_payment_pro;
      }), //pid_payment_pro int[],
      details.map(function (item: any) {
        return item.id_programend_payment;
      }), //pid_programend_payment int[],
      data.id_path,
      data.id_cuenta,
      data.fecha,
      details.map(function (item: any) {
        return parseFloat(item.monto).toFixed(4);
      }), //pmonto numeric(19,4),
      details.map(function (item: any) {
        return item.status == 1 || item.status == true ? 1 : 0;
      }), //pstatus int,
      data.nro_operacion, //pnro_operacion varchar,
      details.map(function (item: any) {
        return item.monto;
      }), //pmonto_d numeric(19,4)[],
      details.map(function (item: any) {
        return item.total_pagar;
      }), //ptotal_pagar_d numeric(19,4)[]
      details.map(function (item: any) {
        return item.id_house;
      }),
      details.map(function (item: any) {
        return item.id_proveedor;
      }),
      details.map(function (item: any) {
        return item.id_orders;
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
