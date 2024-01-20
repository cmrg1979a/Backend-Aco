import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

var xl = require("excel4node");
import path from "path";
import { postBank } from "../interface/bank";
export const getBanksList = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM table_banks_listar()",
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
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
  let { id_proveedor, id_branch } = req.params;

  await pool.query(
    `SELECT * FROM pagosXProveedorCxP_listar($1,$2)`,
    [id_proveedor, 1],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const setPayForProveedor = async (req: Request, res: Response) => {
  const dabaObj = req.body;
  const details = req.body.details;

  await pool.query(
    "SELECT * FROM detailsPaysInvoiceAdmin_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      details.map((element) => {
        return element.id;
      }), //id int[],
      dabaObj.id_path, //id_path int,
      dabaObj.id_cuenta, //id_cuenta int,
      dabaObj.fecha_pago, //fecha date ,
      details.map((element) => {
        return element.monto_mon_ext;
      }), //onto numeric[],
      dabaObj.tipocambio, //tipocambio numeric,
      dabaObj.nro_operacion, //nro_operacion varchar,
      dabaObj.id_coins, //id_coins int,
      dabaObj.comentarios, //--pcomentarios varchar
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

export const getListarBancosgastos = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_list_egresos($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.desde ? req.query.desde : null,
      req.query.hasta ? req.query.hasta : null,
      req.query.nro_operacion ? req.query.nro_operacion : null,
      req.query.id_cuenta ? req.query.id_cuenta : null,
      req.query.id_proveedor ? req.query.id_proveedor : null,
      req.query.monto ? req.query.monto : null,
      req.query.id_moneda ? req.query.id_moneda : null,
      req.query.nro_factura ? req.query.nro_factura : null,
      req.query.nro_serie ? req.query.nro_serie : null,
      req.query.tipogastos ? req.query.tipogastos : null,
      req.query.tiposubgastos ? req.query.tiposubgastos : null,
      req.query.operativo,
      req.query.administrativo,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            estadoflag: rows[0].estadoflag,
            statusBol: true,
            data: rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
            estadoflag: rows[0].estadoflag,
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
  const dabaObj = req.body;
  const details = req.body.details;
  // const pid_pago = req.body.id_path;
  // const id_cuenta = req.body.id_cuenta;
  // const fecha = req.body.fecha;
  // const id_path = req.body.id_path;
  // const nro_operacion = req.body.nro_operacion;
  // const id_banco_origen = req.body.id_banco_origen;
  await pool.query(
    // detailsPaysInvoiceAdmin_insertar(pid_invoiceadmin int[],	pid_pago int,	pmonto numeric[],	pid_cuenta int,	cktotal int[],	monto_deuda numeric[],	monto_pagar numeric[])
    "SELECT * FROM detailsPaysInvoiceAdminCxC_insertar($1,	$2,$3,	$4,	$5,	$6,$7,$8,$9,$10,$11)",
    [
      details.map((item) => {
        return item.id;
      }), //pid_invoiceadmin integer[],
      details.map((item) => {
        return item.montopagar;
      }), //pmonto numeric[],
      dabaObj.id_cuenta, //pid_cuenta integer,
      details.map((item) => {
        return item.esinvoiceflag;
      }), //pesinvoiceflag boolean[],
      details.map((item) => {
        return item.id_house ? item.id_house : null;
      }), //pid_house integer[],
      details.map((item) => {
        return item.tipocambio;
      }), //ptipocambio numeric[],
      dabaObj.id_path, //pid_path integer,
      dabaObj.fecha, //pfecha date,
      dabaObj.nro_operacion, //pnro_operacion character varying,
      dabaObj.id_banco_origen, //pid_bank integer
      dabaObj.id_coins, //id_coins integer
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
  // "SELECT * FROM Table_InvoiceAdminCxC_listado($1);",

  await pool.query(
    "SELECT * FROM function_list_ingresos($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.nro_operacion ? req.query.nro_operacion : null,
      req.query.monto ? req.query.monto : null,
      req.query.fechadesde ? req.query.fechadesde : null,
      req.query.fechahasta ? req.query.fechahasta : null,
      req.query.factura ? req.query.factura : null,
      req.query.serie ? req.query.serie : null,
      req.query.id_banco ? req.query.id_banco : null,
      req.query.id_coin ? req.query.id_coin : null,
      req.query.id_consigner ? req.query.id_consigner : null,
      req.query.id_tipoingreso ? req.query.id_tipoingreso : null,
      req.query.id_tiposubingreso ? req.query.id_tiposubingreso : null,
      req.query.operativo,
      req.query.administrativo,
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
export const getVerPagosPorCustomer = async (req: Request, res: Response) => {
  const { id } = req.query;

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
    `SELECT * FROM table_invoiceadmincxc_pagoxcliente($1)`,
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: true,
            data: rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            mensaje: rows[0].mensaje,
            estadoflag: false,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const ExportarListadoReportePagos = async (
  req: Request,
  res: Response
) => {
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });
  await pool.query(
    "SELECT * from function_export_ingresos($1)",
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        let cabTitle = wb.createStyle({
          font: {
            color: "#ffffff",
            bold: true,
          },
          fill: {
            type: "pattern",
            patternType: "solid",
            fgColor: "#A43542",
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        });
        var wt = wb.addWorksheet("ReporteIngresos");
        wt.row(1).filter();

        wt.column(1).setWidth(10);
        wt.column(2).setWidth(15);
        wt.column(3).setWidth(18);
        wt.column(4).setWidth(5);
        wt.column(5).setWidth(15);
        wt.column(6).setWidth(100);
        wt.column(7).setWidth(10);
        wt.column(8).setWidth(10);
        wt.column(9).setWidth(150);
        wt.column(10).setWidth(30);
        wt.column(11).setWidth(15);

        wt.cell(1, 1).string("Fecha").style(cabTitle);
        wt.cell(1, 2).string("Nro Operación").style(cabTitle);
        wt.cell(1, 3).string("Cuenta Salida").style(cabTitle);
        wt.cell(1, 4).string("O/A").style(cabTitle);
        wt.cell(1, 5).string("Tipo de Gasto").style(cabTitle);
        wt.cell(1, 6).string("Proveedor").style(cabTitle);
        wt.cell(1, 7).string("Monto").style(cabTitle);
        wt.cell(1, 8).string("Moneda").style(cabTitle);
        wt.cell(1, 9).string("concepto").style(cabTitle);
        wt.cell(1, 10).string("Nro Factura").style(cabTitle);
        wt.cell(1, 11).string("Nro Serie").style(cabTitle);
        let fila = 2;
        rows.forEach((element) => {
          wt.cell(fila, 1).string(element.fecha_pago);
          wt.cell(fila, 2).string(
            element.nro_operacion ? element.nro_operacion : ""
          );
          wt.cell(fila, 3).string(element.banco ? element.banco : "");
          wt.cell(fila, 4).string(element.tipo ? element.tipo : "");
          wt.cell(fila, 5).string(element.tipo_gasto ? element.tipo_gasto : "");
          wt.cell(fila, 6).string(
            element.name_proveedor ? element.name_proveedor : ""
          );
          wt.cell(fila, 7).string(element.monto);
          wt.cell(fila, 8).string(
            element.moneda_simbolo ? element.moneda_simbolo : ""
          );
          wt.cell(fila, 9).string(element.concepto ? element.concepto : "");
          wt.cell(fila, 10).string(element.factura ? element.factura : "");
          wt.cell(fila, 11).string(element.serie ? element.serie : "");
          fila++;
        });

        let pathexcel = path.join(
          `${__dirname}../../../uploads`,
          "ReporteIngresos.xlsx"
        );
        wb.write(pathexcel, function (err, stats) {
          if (err) {
            console.log(err);
          } else {
            res.download(pathexcel);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const RegistroPagoDetalles = async (req: Request, res: Response) => {
  let data = req.body;

  await pool.query(
    "select * from function_bancos_pago($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
    [
      data.isaprobacion,
      data.iscontrolgasto,
      data.isprogramado,
      data.id,
      data.monto,
      data.id_concepto,
      data.id_path,
      data.id_cuenta,
      data.fecha,
      data.nro_operacion,
      data.id_proveedor,
      data.id_user,
      data.tipocambio,
      data.id_coins,
      data.comentarios,
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

export const getVerPagosInvoice = async (req: Request, res: Response) => {
  let id = req.query.id;

  await pool.query(
    `SELECT * FROM function_ver_pago_invoice($1)`,
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: true,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            estadoflag: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const getActualizarPagosInvoice = async (
  req: Request,
  res: Response
) => {
  let dataObj = req.body;
  await pool.query(
    `SELECT * FROM function_actualizar_pago_invoice($1,$2,$3,$4,$5,$6,$7)`,
    [
      dataObj.id,
      dataObj.nro_operacion ? dataObj.nro_operacion : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.fecha ? dataObj.fecha : null,
      dataObj.id_cuenta ? dataObj.id_cuenta : null,
      dataObj.id_path ? dataObj.id_path : null,
      dataObj.usuario ? dataObj.usuario : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: true,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            estadoflag: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getVerPagosCGEgresos = async (req: Request, res: Response) => {
  let id = req.query.id;

  await pool.query(
    `SELECT * FROM function_ver_pago_cg_egreso($1)`,
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: true,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            estadoflag: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getActualizarPagosCGEgreso = async (
  req: Request,
  res: Response
) => {
  let dataObj = req.body;

  await pool.query(
    `SELECT * FROM function_actualizar_pago_cgegreso($1,$2,$3,$4,$5,$6,$7)`,
    [
      dataObj.id,
      dataObj.nro_operacion ? dataObj.nro_operacion : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.fecha ? dataObj.fecha : null,
      dataObj.id_cuenta ? dataObj.id_cuenta : null,
      dataObj.id_path ? dataObj.id_path : null,
      dataObj.usuario ? dataObj.usuario : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: true,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            estadoflag: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getVerPagosIngresosInvoice = async (
  req: Request,
  res: Response
) => {
  let id = req.query.id;

  await pool.query(
    `SELECT * FROM function_ver_ingreso_invoice($1)`,
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: true,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            estadoflag: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getVerPagosDebsClient = async (req: Request, res: Response) => {
  let id = req.query.id;

  await pool.query(
    `SELECT * FROM function_ver_ingreso_debscliente($1)`,
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: true,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            estadoflag: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getActualizarPagosInvoiceIngreso = async (
  req: Request,
  res: Response
) => {
  let dataObj = req.body;

  await pool.query(
    `SELECT * FROM function_actualizar_ingreso_invoice($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      dataObj.id,
      dataObj.nro_operacion ? dataObj.nro_operacion : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.fecha ? dataObj.fecha : null,
      dataObj.id_banco_origen ? dataObj.id_banco_origen : null,
      dataObj.id_path ? dataObj.id_path : null,
      dataObj.id_cuenta_pic ? dataObj.id_cuenta_pic : null,
      dataObj.usuario ? dataObj.usuario : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: true,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            estadoflag: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getActualizarIngresoDebsCliente = async (
  req: Request,
  res: Response
) => {
  let dataObj = req.body;

  await pool.query(
    `SELECT * FROM function_actualizar_ingreso_debscliente($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      dataObj.id,
      dataObj.nro_operacion ? dataObj.nro_operacion : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.fecha ? dataObj.fecha : null,
      dataObj.id_banco_origen ? dataObj.id_banco_origen : null,
      dataObj.id_path ? dataObj.id_path : null,
      dataObj.id_cuenta_pic ? dataObj.id_cuenta_pic : null,
      dataObj.usuario ? dataObj.usuario : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: true,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            estadoflag: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const ExportarListadoReporteEgresos = async (
  req: Request,
  res: Response
) => {
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });
  await pool.query(
    "SELECT * FROM function_list_egresos($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.desde ? req.query.desde : null,
      req.query.hasta ? req.query.hasta : null,
      req.query.nro_operacion ? req.query.nro_operacion : null,
      req.query.id_cuenta ? req.query.id_cuenta : null,
      req.query.id_proveedor ? req.query.id_proveedor : null,
      req.query.monto ? req.query.monto : null,
      req.query.id_moneda ? req.query.id_moneda : null,
      req.query.nro_factura ? req.query.nro_factura : null,
      req.query.nro_serie ? req.query.nro_serie : null,
      req.query.tipogastos ? req.query.tipogastos : null,
      req.query.tiposubgastos ? req.query.tiposubgastos : null,
      req.query.operativo,
      req.query.administrativo,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        let cabTitle = wb.createStyle({
          numberFormat: "0.00",
          font: {
            color: "#ffffff",
            bold: true,
          },
          fill: {
            type: "pattern",
            patternType: "solid",
            fgColor: "#A43542",
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        });

        var wt = wb.addWorksheet("ReporteEgresos");

        wt.row(1).filter();

        wt.column(1).setWidth(10);
        wt.column(2).setWidth(10);
        wt.column(3).setWidth(21);
        wt.column(4).setWidth(21);
        wt.column(5).setWidth(50);
        wt.column(6).setWidth(50);
        wt.column(7).setWidth(50);
        wt.column(8).setWidth(10);
        wt.column(9).setWidth(50);
        wt.column(10).setWidth(10);
        wt.column(11).setWidth(50);
        wt.column(12).setWidth(50);
        wt.column(13).setWidth(50);
        wt.column(14).setWidth(50);
        wt.column(15).setWidth(50);

        wt.cell(1, 1).string("Fecha").style(cabTitle);
        wt.cell(1, 2).string("O/A").style(cabTitle);
        wt.cell(1, 3).string("Tipo Pago").style(cabTitle);
        wt.cell(1, 4).string("Tipo Gasto").style(cabTitle);
        wt.cell(1, 5).string("Sub Tipo de Gasto").style(cabTitle);
        wt.cell(1, 6).string("Proveedor").style(cabTitle);
        wt.cell(1, 7).string("Monto").style(cabTitle);
        wt.cell(1, 8).string("Moneda").style(cabTitle);
        wt.cell(1, 9).string("Monto de Pago").style(cabTitle);
        wt.cell(1, 10).string("Moneda de Pago").style(cabTitle);
        wt.cell(1, 11).string("Tipo de Cambio").style(cabTitle);
        wt.cell(1, 12).string("Cuenta Salida").style(cabTitle);
        wt.cell(1, 13).string("Nro Operación").style(cabTitle);
        wt.cell(1, 14).string("Concepto(s)").style(cabTitle);
        wt.cell(1, 15).string("Nro Factura(s)").style(cabTitle);
        wt.cell(1, 16).string("Nro Serie(s)").style(cabTitle);
        wt.cell(1, 17).string("Comentarios").style(cabTitle);

        let fila = 2;
        rows.forEach((element) => {
          wt.cell(fila, 1).string(element.fecha_pago);
          wt.cell(fila, 2).string(element.tipo ? element.tipo : "");
          wt.cell(fila, 3).string(element.tipo_pago ? element.tipo_pago : "");
          wt.cell(fila, 4).string(element.tipo_gasto);
          wt.cell(fila, 5).string(element.subtipo_gasto);
          wt.cell(fila, 6).string(
            element.name_proveedor ? element.name_proveedor : ""
          );
          wt.cell(fila, 7).number(
            element.monto_dolar ? parseFloat(element.monto_dolar) : 0.0
          );
          wt.cell(fila, 8).string("USD");

          wt.cell(fila, 9).number(
            element.monto_mon_ex ? parseFloat(element.monto_mon_ex) : 0.0
          );
          wt.cell(fila, 10).string(
            element.moneda_simbolo ? element.moneda_simbolo : ""
          );

          wt.cell(fila, 11).string(element.tipo_cambio);
          wt.cell(fila, 12).string(element.banco ? element.banco : "");

          wt.cell(fila, 13).string(
            element.nro_operacion ? element.nro_operacion : ""
          );

          wt.cell(fila, 14).string(element.concepto ? element.concepto : "");
          wt.cell(fila, 15).string(element.factura ? element.factura : "");
          wt.cell(fila, 16).string(element.serie ? element.serie : "");
          wt.cell(fila, 17).string(
            element.comentarios ? element.comentarios : ""
          );
          fila++;
        });

        let pathexcel = path.join(
          `${__dirname}../../../uploads`,
          "ReporteEngresos.xlsx"
        );
        wb.write(pathexcel, function (err, stats) {
          if (err) {
            console.log(err);
          } else {
            res.download(pathexcel);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const ExportarListadoReporteIngresos = async (
  req: Request,
  res: Response
) => {
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });
  await pool.query(
    "SELECT * FROM function_list_ingresos($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.nro_operacion ? req.query.nro_operacion : null,
      req.query.monto ? req.query.monto : null,
      req.query.fechadesde ? req.query.fechadesde : null,
      req.query.fechahasta ? req.query.fechahasta : null,
      req.query.factura ? req.query.factura : null,
      req.query.serie ? req.query.serie : null,
      req.query.id_banco ? req.query.id_banco : null,
      req.query.id_coin ? req.query.id_coin : null,
      req.query.id_cuenta ? req.query.id_cuenta : null,
      req.query.id_tipoingreso ? req.query.id_tipoingreso : null,
      req.query.id_tiposubingreso ? req.query.id_tiposubingreso : null,
      req.query.operativo,
      req.query.administrativo,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        let cabTitle = wb.createStyle({
          numberFormat: "###0.00",
          font: {
            color: "#ffffff",
            bold: true,
          },
          fill: {
            type: "pattern",
            patternType: "solid",
            fgColor: "#A43542",
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        });
        var wt = wb.addWorksheet("ReporteIngresos");
        wt.row(1).filter();

        wt.column(1).setWidth(10);
        wt.column(2).setWidth(10);
        wt.column(3).setWidth(18);
        wt.column(4).setWidth(27);
        wt.column(5).setWidth(27);
        wt.column(6).setWidth(60);
        wt.column(7).setWidth(15);
        wt.column(8).setWidth(12);
        wt.column(9).setWidth(12);
        wt.column(10).setWidth(12);
        wt.column(11).setWidth(12);
        wt.column(12).setWidth(12);
        wt.column(13).setWidth(18);
        wt.column(14).setWidth(18);
        wt.column(15).setWidth(100);
        wt.column(16).setWidth(15);
        wt.column(17).setWidth(15);

        wt.cell(1, 1).string("Fecha").style(cabTitle);
        wt.cell(1, 2).string("O/A").style(cabTitle);
        wt.cell(1, 3).string("Tipo de Pago").style(cabTitle);
        wt.cell(1, 4).string("Tipo Ingreso").style(cabTitle);
        wt.cell(1, 5).string("Sub Tipo de ingreso").style(cabTitle);
        wt.cell(1, 6).string("Cliente").style(cabTitle);
        wt.cell(1, 7).string("Monto").style(cabTitle);
        wt.cell(1, 8).string("Moneda").style(cabTitle);
        wt.cell(1, 9).string("Monto Ingresado al banco").style(cabTitle);
        wt.cell(1, 10).string("Moneda Ingresado al banco").style(cabTitle);
        wt.cell(1, 11).string("Tipo de Cambio").style(cabTitle);
        wt.cell(1, 12).string("Banco Origen").style(cabTitle);
        wt.cell(1, 13).string("Cuenta Destino").style(cabTitle);
        wt.cell(1, 14).string("Nro Operación").style(cabTitle);
        wt.cell(1, 15).string("Concepto").style(cabTitle);
        wt.cell(1, 16).string("Nro Factura").style(cabTitle);
        wt.cell(1, 17).string("Nro Serie").style(cabTitle);

        let fila = 2;
        rows.forEach((element) => {
          wt.cell(fila, 1).string(element.fecha_pago ? element.fecha_pago : "");
          wt.cell(fila, 2).string(element.tipo ? element.tipo : "");
          wt.cell(fila, 3).string(element.tipo_gasto ? element.tipo_gasto : "");
          wt.cell(fila, 4).string(
            element.tipo_ingreso ? element.tipo_ingreso : ""
          );
          wt.cell(fila, 5).string(
            element.subtipo_ingreso ? element.subtipo_ingreso : ""
          );
          wt.cell(fila, 6).string(
            element.name_consigner ? element.name_consigner : ""
          );
          wt.cell(fila, 7).number(
            element.monto ? parseFloat(element.monto) : 0.0
          );
          wt.cell(fila, 8).string(
            element.moneda_simbolo ? element.moneda_simbolo : ""
          );
          wt.cell(fila, 9).number(
            element.monto_destino ? parseFloat(element.monto_destino) : 0.0
          );
          wt.cell(fila, 10).string(
            element.moneda_destino ? element.moneda_destino : ""
          );
          wt.cell(fila, 11).number(
            element.tipocambio ? parseFloat(element.tipocambio) : 0.0
          );
          wt.cell(fila, 12).string(element.banco ? element.banco : "");
          wt.cell(fila, 13).string(
            element.cuenta_destino ? element.cuenta_destino : ""
          );
          wt.cell(fila, 14).string(
            element.nro_operacion ? element.nro_operacion : ""
          );
          wt.cell(fila, 15).string(element.concepto ? element.concepto : "");
          wt.cell(fila, 16).string(element.factura ? element.factura : "");
          wt.cell(fila, 17).string(element.serie ? element.serie : "");
          fila++;
        });

        let pathexcel = path.join(
          `${__dirname}../../../uploads`,
          "ReporteIngresos.xlsx"
        );
        wb.write(pathexcel, function (err, stats) {
          if (err) {
            console.log(err);
          } else {
            res.download(pathexcel);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const reversarCxC = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_reversar_debsclient($1)",
    [req.body.id],
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

export const reversarCxP = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_reversar_debsproveedor($1)",
    [req.body.id],
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
export const verPagosControlEgresos = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_pagoscontrolegresos_ver($1)",
    [req.query.id],
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
export const validarNroOperacion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_table_pagoscontrolegresos_validarnro_op($1)",
    [req.query.nro_operacion],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getListBank = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_banks_listar($1,$2, $3, $4, $5, $6);",
    [
      data.id_branch,
      data.code ? data.code : null,
      data.name ? data.name : null,
      data.acronym ? data.acronym : null,
      data.description ? data.description : null,
      data.status ? data.status : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const insertBank = async (req: Request, res: Response) => {
  const dataObj: postBank = req.body;

  await pool.query(
    "SELECT *from function_banks_insertar($1,$2, $3, $4, $5);",
    [
      dataObj.id_branch,
      dataObj.acronym,
      dataObj.name,
      dataObj.description,
      dataObj.status,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const readBank = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_banks_ver($1);",
    [data.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const updateBank = async (req: Request, res: Response) => {
  const dataObj: postBank = req.body;

  await pool.query(
    "SELECT *from function_banks_actualizar($1,$2, $3, $4, $5);",
    [
      dataObj.id,
      dataObj.acronym,
      dataObj.name,
      dataObj.description,
      dataObj.status,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
        });
      } else {
        console.log(err);
      }
    }
  );
};
