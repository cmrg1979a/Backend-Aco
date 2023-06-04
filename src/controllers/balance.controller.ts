import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import path from "path";
var xl = require("excel4node");

export const detalleGanancia = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_monto_egreso_x_exp($1,null,null);",
    [req.query.year],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const resumenGanancia = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_monto_egreso_x_mes($1,null,null);",
    [req.query.year],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const detalleGastos = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_monto_gastos_x_proveedor($1,null,null);",
    [req.query.year],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const resumenGastos = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_monto_gastos_x_mes($1,null,null);",
    [req.query.year],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const exportarReporteGanancias = async (req: Request, res: Response) => {
  let itemsGanancia = req.body.itemsGanancia;
  let itemsGastos = req.body.itemsGastos;
  let itemsResumen = req.body.itemsResumen;
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });

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
  var wr = wb.addWorksheet("Resumen");
  var wg = wb.addWorksheet("Ganancias");
  var wp = wb.addWorksheet("Gasto");
  // --------------------------- resumen

  wr.row(1).filter();
  wr.column(1).setWidth(15);
  wr.column(2).setWidth(15);
  wr.column(3).setWidth(15);
  wr.column(4).setWidth(15);
  wr.column(5).setWidth(15);
  wr.column(6).setWidth(15);
  wr.column(7).setWidth(15);
  wr.column(8).setWidth(15);
  wr.column(9).setWidth(15);
  wr.column(10).setWidth(15);
  wr.column(11).setWidth(15);
  wr.column(12).setWidth(15);
  wr.column(13).setWidth(15);

  wr.cell(1, 1).string("Descripción").style(cabTitle);
  wr.cell(1, 2).string("Enero").style(cabTitle);
  wr.cell(1, 3).string("Febrero").style(cabTitle);
  wr.cell(1, 4).string("Marzo").style(cabTitle);
  wr.cell(1, 5).string("Abril").style(cabTitle);
  wr.cell(1, 6).string("Mayo").style(cabTitle);
  wr.cell(1, 7).string("Junio").style(cabTitle);
  wr.cell(1, 8).string("Julio").style(cabTitle);
  wr.cell(1, 9).string("Agosto").style(cabTitle);
  wr.cell(1, 10).string("Septiembre").style(cabTitle);
  wr.cell(1, 11).string("Octubre").style(cabTitle);
  wr.cell(1, 12).string("Noviembre").style(cabTitle);
  wr.cell(1, 13).string("Diciembre").style(cabTitle);
  let fila = 2;
  itemsResumen.forEach((element) => {
    wr.cell(fila, 1).string(element.description);
    wr.cell(fila, 2).number(element.enero ? parseFloat(element.enero) : 0);
    wr.cell(fila, 3).number(element.febrero ? parseFloat(element.febrero) : 0);
    wr.cell(fila, 4).number(element.marzo ? parseFloat(element.marzo) : 0);
    wr.cell(fila, 5).number(element.abril ? parseFloat(element.abril) : 0);
    wr.cell(fila, 6).number(element.mayo ? parseFloat(element.mayo) : 0);
    wr.cell(fila, 7).number(element.junio ? parseFloat(element.junio) : 0);
    wr.cell(fila, 8).number(element.julio ? parseFloat(element.julio) : 0);
    wr.cell(fila, 9).number(element.agosto ? parseFloat(element.agosto) : 0);
    wr.cell(fila, 10).number(
      element.septiembre ? parseFloat(element.septiembre) : 0
    );
    wr.cell(fila, 11).number(element.octubre ? parseFloat(element.octubre) : 0);
    wr.cell(fila, 12).number(
      element.noviembre ? parseFloat(element.noviembre) : 0
    );
    wr.cell(fila, 13).number(
      element.diciembre ? parseFloat(element.diciembre) : 0
    );
    fila++;
  });
  // --------------------------- ganancia

  wg.row(1).filter();
  wg.column(1).setWidth(15);
  wg.column(2).setWidth(15);
  wg.column(3).setWidth(15);
  wg.column(4).setWidth(15);
  wg.column(5).setWidth(15);
  wg.column(6).setWidth(15);
  wg.column(7).setWidth(15);
  wg.column(8).setWidth(15);
  wg.column(9).setWidth(15);
  wg.column(10).setWidth(15);
  wg.column(11).setWidth(15);
  wg.column(12).setWidth(15);
  wg.column(13).setWidth(15);

  wg.cell(1, 1).string("Expediente").style(cabTitle);
  wg.cell(1, 2).string("Enero").style(cabTitle);
  wg.cell(1, 3).string("Febrero").style(cabTitle);
  wg.cell(1, 4).string("Marzo").style(cabTitle);
  wg.cell(1, 5).string("Abril").style(cabTitle);
  wg.cell(1, 6).string("Mayo").style(cabTitle);
  wg.cell(1, 7).string("Junio").style(cabTitle);
  wg.cell(1, 8).string("Julio").style(cabTitle);
  wg.cell(1, 9).string("Agosto").style(cabTitle);
  wg.cell(1, 10).string("Septiembre").style(cabTitle);
  wg.cell(1, 11).string("Octubre").style(cabTitle);
  wg.cell(1, 12).string("Noviembre").style(cabTitle);
  wg.cell(1, 13).string("Diciembre").style(cabTitle);
  let filag = 2;
  itemsGanancia.forEach((element) => {
    wg.cell(filag, 1).string(element.exp);
    wg.cell(filag, 2).number(element.enero ? parseFloat(element.enero) : 0);
    wg.cell(filag, 3).number(element.febrero ? parseFloat(element.febrero) : 0);
    wg.cell(filag, 4).number(element.marzo ? parseFloat(element.marzo) : 0);
    wg.cell(filag, 5).number(element.abril ? parseFloat(element.abril) : 0);
    wg.cell(filag, 6).number(element.mayo ? parseFloat(element.mayo) : 0);
    wg.cell(filag, 7).number(element.junio ? parseFloat(element.junio) : 0);
    wg.cell(filag, 8).number(element.julio ? parseFloat(element.julio) : 0);
    wg.cell(filag, 9).number(element.agosto ? parseFloat(element.agosto) : 0);
    wg.cell(filag, 10).number(
      element.septiembre ? parseFloat(element.septiembre) : 0
    );
    wg.cell(filag, 11).number(
      element.octubre ? parseFloat(element.octubre) : 0
    );
    wg.cell(filag, 12).number(
      element.noviembre ? parseFloat(element.noviembre) : 0
    );
    wg.cell(filag, 13).number(
      element.diciembre ? parseFloat(element.diciembre) : 0
    );
    filag++;
  });
  // --------------------------- perdida

  wp.row(1).filter();
  wp.column(1).setWidth(15);
  wp.column(2).setWidth(15);
  wp.column(3).setWidth(15);
  wp.column(4).setWidth(15);
  wp.column(5).setWidth(15);
  wp.column(6).setWidth(15);
  wp.column(7).setWidth(15);
  wp.column(8).setWidth(15);
  wp.column(9).setWidth(15);
  wp.column(10).setWidth(15);
  wp.column(11).setWidth(15);
  wp.column(12).setWidth(15);
  wp.column(13).setWidth(15);
  wp.column(14).setWidth(15);

  wp.cell(1, 1).string("Proveedor").style(cabTitle);
  wp.cell(1, 2).string("Concepto").style(cabTitle);
  wp.cell(1, 3).string("Enero").style(cabTitle);
  wp.cell(1, 4).string("Febrero").style(cabTitle);
  wp.cell(1, 5).string("Marzo").style(cabTitle);
  wp.cell(1, 6).string("Abril").style(cabTitle);
  wp.cell(1, 7).string("Mayo").style(cabTitle);
  wp.cell(1, 8).string("Junio").style(cabTitle);
  wp.cell(1, 9).string("Julio").style(cabTitle);
  wp.cell(1, 10).string("Agosto").style(cabTitle);
  wp.cell(1, 11).string("Septiembre").style(cabTitle);
  wp.cell(1, 12).string("Octubre").style(cabTitle);
  wp.cell(1, 13).string("Noviembre").style(cabTitle);
  wp.cell(1, 14).string("Diciembre").style(cabTitle);
  let filap = 2;
  itemsGastos.forEach((element) => {
    wp.cell(filap, 1).string(element.proveedor);
    wp.cell(filap, 2).string(element.concepto);
    wp.cell(filap, 3).number(element.enero ? parseFloat(element.enero) : 0);
    wp.cell(filap, 4).number(element.febrero ? parseFloat(element.febrero) : 0);
    wp.cell(filap, 5).number(element.marzo ? parseFloat(element.marzo) : 0);
    wp.cell(filap, 6).number(element.abril ? parseFloat(element.abril) : 0);
    wp.cell(filap, 7).number(element.mayo ? parseFloat(element.mayo) : 0);
    wp.cell(filap, 8).number(element.junio ? parseFloat(element.junio) : 0);
    wp.cell(filap, 9).number(element.julio ? parseFloat(element.julio) : 0);
    wp.cell(filap, 10).number(element.agosto ? parseFloat(element.agosto) : 0);
    wp.cell(filap, 11).number(
      element.septiembre ? parseFloat(element.septiembre) : 0
    );
    wp.cell(filap, 12).number(
      element.octubre ? parseFloat(element.octubre) : 0
    );
    wp.cell(filap, 13).number(
      element.noviembre ? parseFloat(element.noviembre) : 0
    );
    wp.cell(filap, 14).number(
      element.diciembre ? parseFloat(element.diciembre) : 0
    );
    filap++;
  });
  // -------------------------------------------------
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
  // wt.row(1).filter();
};
