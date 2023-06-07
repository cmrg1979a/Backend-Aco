import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import path from "path";
var xl = require("excel4node");
import { balance } from "../interface/balance";



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
export const arbolGastos = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_arbol_gasto($1);",
    [req.query.id_branch],
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
  let detalleGanancia = await dGanancia(req.query.year);
  let resumenGanancia = await rGanancia(req.query.year);
  let detallePerdida = await dPerdida(req.query.year);
  let resumenPerdida = await rPerdida(req.query.year);

  let itemsResumen = generarResumen(resumenGanancia, resumenPerdida);
  let itemsGanancia = generarDetalleGanancia(detalleGanancia);
  let itemsGastos = generarDetallePerdida(detallePerdida);

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

  wr.column(1).setWidth(20);
  wr.column(2).setWidth(20);
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
  fila = fila + 2;

  wr.cell(fila, 1).string("Expediente").style(cabTitle);
  wr.cell(fila, 2).string("Enero").style(cabTitle);
  wr.cell(fila, 3).string("Febrero").style(cabTitle);
  wr.cell(fila, 4).string("Marzo").style(cabTitle);
  wr.cell(fila, 5).string("Abril").style(cabTitle);
  wr.cell(fila, 6).string("Mayo").style(cabTitle);
  wr.cell(fila, 7).string("Junio").style(cabTitle);
  wr.cell(fila, 8).string("Julio").style(cabTitle);
  wr.cell(fila, 9).string("Agosto").style(cabTitle);
  wr.cell(fila, 10).string("Septiembre").style(cabTitle);
  wr.cell(fila, 11).string("Octubre").style(cabTitle);
  wr.cell(fila, 12).string("Noviembre").style(cabTitle);
  wr.cell(fila, 13).string("Diciembre").style(cabTitle);
  fila++;
  itemsGanancia.forEach((element) => {
    wr.cell(fila, 1).string(element.exp);
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
  // --------------------------- perdida
  fila = fila + 2;

  wr.cell(fila, 1).string("Proveedor").style(cabTitle);
  wr.cell(fila, 2).string("Concepto").style(cabTitle);
  wr.cell(fila, 3).string("Enero").style(cabTitle);
  wr.cell(fila, 4).string("Febrero").style(cabTitle);
  wr.cell(fila, 5).string("Marzo").style(cabTitle);
  wr.cell(fila, 6).string("Abril").style(cabTitle);
  wr.cell(fila, 7).string("Mayo").style(cabTitle);
  wr.cell(fila, 8).string("Junio").style(cabTitle);
  wr.cell(fila, 9).string("Julio").style(cabTitle);
  wr.cell(fila, 10).string("Agosto").style(cabTitle);
  wr.cell(fila, 11).string("Septiembre").style(cabTitle);
  wr.cell(fila, 12).string("Octubre").style(cabTitle);
  wr.cell(fila, 13).string("Noviembre").style(cabTitle);
  wr.cell(fila, 14).string("Diciembre").style(cabTitle);
  fila++;
  itemsGastos.forEach((element) => {
    wr.cell(fila, 1).string(element.proveedor);
    wr.cell(fila, 2).string(element.concepto);
    wr.cell(fila, 3).number(element.enero ? parseFloat(element.enero) : 0);
    wr.cell(fila, 4).number(element.febrero ? parseFloat(element.febrero) : 0);
    wr.cell(fila, 5).number(element.marzo ? parseFloat(element.marzo) : 0);
    wr.cell(fila, 6).number(element.abril ? parseFloat(element.abril) : 0);
    wr.cell(fila, 7).number(element.mayo ? parseFloat(element.mayo) : 0);
    wr.cell(fila, 8).number(element.junio ? parseFloat(element.junio) : 0);
    wr.cell(fila, 9).number(element.julio ? parseFloat(element.julio) : 0);
    wr.cell(fila, 10).number(element.agosto ? parseFloat(element.agosto) : 0);
    wr.cell(fila, 11).number(
      element.septiembre ? parseFloat(element.septiembre) : 0
    );
    wr.cell(fila, 12).number(element.octubre ? parseFloat(element.octubre) : 0);
    wr.cell(fila, 13).number(
      element.noviembre ? parseFloat(element.noviembre) : 0
    );
    wr.cell(fila, 14).number(
      element.diciembre ? parseFloat(element.diciembre) : 0
    );
    fila++;
  });
  // -------------------------------------------------
  let pathexcel = path.join(
    `${__dirname}../../../uploads`,
    "BalanceGananciaPerdida.xlsx"
  );
  wb.write(pathexcel, function (err, stats) {
    if (err) {
      console.log(err);
    } else {
      res.download(pathexcel);
    }
  });
};

// ----------------------------------------
function dGanancia(year) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM function_monto_egreso_x_exp($1,null,null);",
      [year],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          resolve(rows);
        }
      }
    );
  });
}
function rGanancia(year) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM function_monto_egreso_x_mes($1,null,null);",
      [year],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          resolve(rows);
        }
      }
    );
  });
}
function dPerdida(year) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM function_monto_gastos_x_proveedor($1,null,null);",
      [year],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          resolve(rows);
        }
      }
    );
  });
}
function rPerdida(year) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM function_monto_gastos_x_mes($1,null,null);",
      [year],
      (err, response) => {
        let rows = response.rows;

        if (!err) {
          resolve(rows);
        }
      }
    );
  });
}

function generarResumen(resumenGanancia, resumenPerdida) {
  let res = [];
  let resumen = {
    description: "",
    enero: "",
    febrero: "",
    marzo: "",
    abril: "",
    mayo: "",
    junio: "",
    julio: "",
    agosto: "",
    septiembre: "",
    octubre: "",
    noviembre: "",
    diciembre: "",
  };
  let resumen2 = {
    description: "",
    enero: "",
    febrero: "",
    marzo: "",
    abril: "",
    mayo: "",
    junio: "",
    julio: "",
    agosto: "",
    septiembre: "",
    octubre: "",
    noviembre: "",
    diciembre: "",
  };
  resumen.description = "Ganancia";
  resumenGanancia.forEach((element) => {
    switch (element.mes) {
      case "01":
        resumen.enero = element.monto ? element.monto : 0;
        break;
      case "02":
        resumen.febrero = element.monto ? element.monto : 0;
        break;
      case "03":
        resumen.marzo = element.monto ? element.monto : 0;
        break;
      case "04":
        resumen.abril = element.monto ? element.monto : 0;
        break;
      case "05":
        resumen.mayo = element.monto ? element.monto : 0;
        break;
      case "06":
        resumen.junio = element.monto ? element.monto : 0;
        break;
      case "07":
        resumen.julio = element.monto ? element.monto : 0;
        break;
      case "08":
        resumen.agosto = element.monto ? element.monto : 0;
        break;
      case "09":
        resumen.septiembre = element.monto ? element.monto : 0;
        break;
      case "10":
        resumen.octubre = element.monto ? element.monto : 0;
        break;
      case "11":
        resumen.noviembre = element.monto ? element.monto : 0;
        break;
      case "12":
        resumen.diciembre = element.monto ? element.monto : 0;
        break;

      default:
        break;
    }
  });
  res.push(resumen);

  // -----------------------------------------
  resumen2.description = "Gastos";
  resumenPerdida.forEach((element) => {
    switch (element.mes) {
      case "01":
        resumen2.enero = element.monto ? element.monto : 0;
        break;
      case "02":
        resumen2.febrero = element.monto ? element.monto : 0;
        break;
      case "03":
        resumen2.marzo = element.monto ? element.monto : 0;
        break;
      case "04":
        resumen2.abril = element.monto ? element.monto : 0;
        break;
      case "05":
        resumen2.mayo = element.monto ? element.monto : 0;
        break;
      case "06":
        resumen2.junio = element.monto ? element.monto : 0;
        break;
      case "07":
        resumen2.julio = element.monto ? element.monto : 0;
        break;
      case "08":
        resumen2.agosto = element.monto ? element.monto : 0;
        break;
      case "09":
        resumen2.septiembre = element.monto ? element.monto : 0;
        break;
      case "10":
        resumen2.octubre = element.monto ? element.monto : 0;
        break;
      case "11":
        resumen2.noviembre = element.monto ? element.monto : 0;
        break;
      case "12":
        resumen2.diciembre = element.monto ? element.monto : 0;
        break;

      default:
        break;
    }
  });
  res.push(resumen2);
  // CALCULAR TOTALES

  let ganancias = res[0];
  let perdidas = res[1];
  let totalPorMes = { description: "" };

  for (let mes in ganancias) {
    if (ganancias.hasOwnProperty(mes)) {
      // Verificar que el mes también esté en el objeto de pérdidas
      if (!perdidas.hasOwnProperty(mes)) {
        throw new Error(`No se encontró el mes '${mes}' en las pérdidas`);
      }

      // Convertir los valores de ganancia y pérdida a números
      let ganancia = parseFloat(ganancias[mes]);
      let perdida = parseFloat(perdidas[mes]);

      // Calcular el total por mes restando la pérdida de la ganancia
      let total = (ganancia ? ganancia : 0) - (perdida ? perdida : 0);

      // Almacenar el total en el objeto totalPorMes
      totalPorMes[mes] = total.toFixed(2);
    }
  }
  totalPorMes.description = "Total";
  res.push(totalPorMes);
  return res;
}

function generarDetalleGanancia(detalleGanancia) {
  let itemsGanancia = [];
  let montosPorMes: {
    exp?: string;
    nro_master?: string;
    proveedor?: string;
    concepto?: string;
    monto?: number;
    ganancia?: number;
  } = {
    exp: "DETALLE DE GANANCIA OPERATIVA",
  };
  let mes;

  for (let i = 0; i < detalleGanancia.length; i++) {
    const elemento = detalleGanancia[i];

    switch (elemento.mes) {
      case "01":
        mes = "enero";
        break;
      case "02":
        mes = "febrero";
        break;
      case "03":
        mes = "marzo";
        break;
      case "04":
        mes = "abril";
        break;
      case "05":
        mes = "mayo";
        break;
      case "06":
        mes = "junio";
        break;
      case "07":
        mes = "julio";
        break;
      case "08":
        mes = "agosto";
        break;
      case "09":
        mes = "septiembre";
        break;
      case "10":
        mes = "octubre";
        break;
      case "11":
        mes = "noviembre";
        break;
      case "12":
        mes = "diciembre";
        break;

      default:
        break;
    }

    const ganancia = parseFloat(elemento.ganancia).toFixed(2);
    if (montosPorMes.hasOwnProperty(mes)) {
      montosPorMes[mes] = (
        parseFloat(montosPorMes[mes] ? montosPorMes[mes] : "0") +
        parseFloat(ganancia)
      ).toFixed(2);
    } else {
      montosPorMes[mes] = ganancia;
    }
  }
  montosPorMes.nro_master = "DETALLE DE GANANCIA OPERATIVA";
  itemsGanancia.push(montosPorMes);

  //   -------------------------------
  detalleGanancia.forEach((element) => {
    switch (element.mes) {
      case "01":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          enero: element.ganancia ? element.ganancia : 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "02":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          febrero: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "03":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          marzo: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "04":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          abril: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "05":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          mayo: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "06":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          junio: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "07":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          julio: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "08":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          agosto: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,

          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "09":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          septiembre: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,

          octubre: 0.0,
          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "10":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          octubre: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,

          noviembre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "11":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          noviembre: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,

          diciembre: 0.0,
        });
        break;
      case "12":
        itemsGanancia.push({
          exp: "EXPEDIENTE " + element.nro_master,
          diciembre: element.ganancia ? element.ganancia : 0.0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;

      default:
        break;
    }
  });
  return itemsGanancia;
}

function generarDetallePerdida(detallePerdida) {
  let itemsGastos = [];
  let montosPorMes: {
    exp?: string;
    nro_master?: string;
    proveedor?: string;
    concepto?: string;
    monto?: number;
    ganancia?: number;
  } = {
    exp: "DETALLE DE GASTOS OPERATIVA",
  };

  let mes = "";
  for (let i = 0; i < detallePerdida.length; i++) {
    const elemento = detallePerdida[i];

    switch (elemento.mes) {
      case "01":
        mes = "enero";
        break;
      case "02":
        mes = "febrero";
        break;
      case "03":
        mes = "marzo";
        break;
      case "04":
        mes = "abril";
        break;
      case "05":
        mes = "mayo";
        break;
      case "06":
        mes = "junio";
        break;
      case "07":
        mes = "julio";
        break;
      case "08":
        mes = "agosto";
        break;
      case "09":
        mes = "septiembre";
        break;
      case "10":
        mes = "octubre";
        break;
      case "11":
        mes = "noviembre";
        break;
      case "12":
        mes = "diciembre";
        break;

      default:
        break;
    }
    const monto = parseFloat(elemento.monto).toFixed(2);
    if (montosPorMes.hasOwnProperty(mes)) {
      montosPorMes[mes] = (
        parseFloat(montosPorMes[mes] ? montosPorMes[mes] : "0") +
        parseFloat(monto)
      ).toFixed(2);
    } else {
      montosPorMes[mes] = monto;
    }
  }
  montosPorMes.proveedor = "Proveedor";
  montosPorMes.concepto = "Conceptos";
  itemsGastos.push(montosPorMes);

  //   -------------------------------
  detallePerdida.forEach((element) => {
    switch (element.mes) {
      case "01":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          enero: element.monto ? element.monto : 0,
          diciembre: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "02":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          febrero: element.monto,
          enero: 0.0,
          diciembre: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "03":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          marzo: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          diciembre: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "04":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          abril: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          diciembre: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "05":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          mayo: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          diciembre: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "06":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          junio: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          diciembre: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "07":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          julio: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          diciembre: 0.0,

          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "08":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          agosto: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          diciembre: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "09":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          septiembre: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          diciembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "10":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          octubre: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          diciembre: 0.0,
          noviembre: 0.0,
        });
        break;
      case "11":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          noviembre: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          diciembre: 0.0,
        });
        break;
      case "12":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          diciembre: element.monto ? element.monto : 0,
          enero: 0.0,
          febrero: 0.0,
          marzo: 0.0,
          abril: 0.0,
          mayo: 0.0,
          junio: 0.0,
          julio: 0.0,
          agosto: 0.0,
          septiembre: 0.0,
          octubre: 0.0,
          noviembre: 0.0,
        });
        break;

      default:
        break;
    }
  });
  return itemsGastos;
}

//  ALDO G
