import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import path from "path";
var xl = require("excel4node");

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
export const arbolIngreso = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_arbol_ingreso($1);",
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
export const cargarTipoIngreso = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_cargar_ingreso($1);",
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
export const cargarTipoSubIngreso = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_cargar_subingreso($1);",
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
export const cargarTipoGastos = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_cargar_gasto($1);",
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
export const cargarTipoSubGastos = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_cargar_subgasto($1);",
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

export const detalleGanancia = async (req: Request, res: Response) => {
  console.log(req.query);
  await pool.query(
    "SELECT * FROM function_monto_egreso_x_exp($1,$2,$3,$4,$5,$6);",
    [
      req.query.year,
      req.query.month,
      req.query.tipoingreso === "0" ? 0 : req.query.tipoingreso || null,
      req.query.tiposubingreso === "0" ? 0 : req.query.tiposubingreso || null,
      req.query.nro_expediente === "0" ? 0 : req.query.nro_expediente || null,
      req.query.monto === "0" ? 0 : req.query.monto || null,
    ],
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
    "SELECT * FROM function_monto_egreso_x_mes($1,$2);",
    [req.query.year, req.query.month ? req.query.month : null],
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
  console.log(req.query.tipogastos);
  await pool.query(
    "SELECT * FROM function_monto_gastos_x_proveedor($1,$2,$3,$4,$5,$6);",
    [
      req.query.year,
      req.query.month ? req.query.month : null,
      req.query.tipogastos === "0" ? 0 : req.query.tipogastos || null,
      req.query.tiposubgastos === "0" ? 0 : req.query.tiposubgastos || null,
      req.query.proveedor === "0" ? 0 : req.query.proveedor || null,
      req.query.monto === "0" ? 0 : req.query.monto || null,
    ],
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
    "SELECT * FROM function_monto_gastos_x_mes($1,$2);",
    [req.query.year, req.query.month ? req.query.month : null],
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

export const resumenGastosxTipoGasto = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_monto_gastos_x_tipogasto($1,$2);",
    [req.query.year, req.query.month ? req.query.month : null],
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
export const resumenGananciaPorTipoIngreso = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_egreso_resumen_por_tipo($1,$2);",
    [req.query.year, req.query.month ? req.query.month : null],
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

// ---------------------------------------------------------------------------------------------------

export const exportarReporteGanancias = async (req: Request, res: Response) => {
  let detalleGanancia = await dGanancia(req.query.year, req.query.month);
  let resumenGanancia = await rGanancia(req.query.year, req.query.month);
  let detallePerdida = await dPerdida(req.query.year, req.query.month);
  let resumenPerdida = await rPerdida(req.query.year, req.query.month);

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
  wr.cell(fila, 2).string("Cliente").style(cabTitle);
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
  itemsGanancia.forEach((element) => {
    wr.cell(fila, 1).string(element.exp);
    wr.cell(fila, 2).string(element.cliente);
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
  // --------------------------- perdida
  fila = fila + 2;

  wr.cell(fila, 1).string("Gastos").style(cabTitle);
  wr.cell(fila, 2).string("SubGasto").style(cabTitle);
  wr.cell(fila, 3).string("Proveedor").style(cabTitle);
  wr.cell(fila, 4).string("Concepto").style(cabTitle);
  wr.cell(fila, 5).string("Enero").style(cabTitle);
  wr.cell(fila, 6).string("Febrero").style(cabTitle);
  wr.cell(fila, 7).string("Marzo").style(cabTitle);
  wr.cell(fila, 8).string("Abril").style(cabTitle);
  wr.cell(fila, 9).string("Mayo").style(cabTitle);
  wr.cell(fila, 10).string("Junio").style(cabTitle);
  wr.cell(fila, 11).string("Julio").style(cabTitle);
  wr.cell(fila, 12).string("Agosto").style(cabTitle);
  wr.cell(fila, 13).string("Septiembre").style(cabTitle);
  wr.cell(fila, 14).string("Octubre").style(cabTitle);
  wr.cell(fila, 15).string("Noviembre").style(cabTitle);
  wr.cell(fila, 16).string("Diciembre").style(cabTitle);
  fila++;
  itemsGastos.forEach((element) => {
    wr.cell(fila, 1).string(
      element.gasto_description ? element.gasto_description : ""
    );
    wr.cell(fila, 2).string(
      element.subgasto_description ? element.subgasto_description : ""
    );
    wr.cell(fila, 3).string(element.proveedor);
    wr.cell(fila, 4).string(element.concepto);
    wr.cell(fila, 5).number(element.enero ? parseFloat(element.enero) : 0);
    wr.cell(fila, 6).number(element.febrero ? parseFloat(element.febrero) : 0);
    wr.cell(fila, 7).number(element.marzo ? parseFloat(element.marzo) : 0);
    wr.cell(fila, 8).number(element.abril ? parseFloat(element.abril) : 0);
    wr.cell(fila, 9).number(element.mayo ? parseFloat(element.mayo) : 0);
    wr.cell(fila, 10).number(element.junio ? parseFloat(element.junio) : 0);
    wr.cell(fila, 11).number(element.julio ? parseFloat(element.julio) : 0);
    wr.cell(fila, 12).number(element.agosto ? parseFloat(element.agosto) : 0);
    wr.cell(fila, 13).number(
      element.septiembre ? parseFloat(element.septiembre) : 0
    );
    wr.cell(fila, 14).number(element.octubre ? parseFloat(element.octubre) : 0);
    wr.cell(fila, 15).number(
      element.noviembre ? parseFloat(element.noviembre) : 0
    );
    wr.cell(fila, 16).number(
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
function dGanancia(year, month) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM function_monto_egreso_x_exp($1,$2);",
      [year, month],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          resolve(rows);
        }
      }
    );
  });
}
function rGanancia(year, month) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM function_monto_egreso_x_mes($1,$2);",
      [year, month],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          resolve(rows);
        }
      }
    );
  });
}
function dPerdida(year, month) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM function_monto_gastos_x_proveedor($1,$2);",
      [year, month],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          resolve(rows);
        }
      }
    );
  });
}
function rPerdida(year, month) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM function_monto_gastos_x_mes($1,$2);",
      [year, month],
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
          cliente: element.cliente,
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
  montosPorMes.proveedor = "Totales";

  itemsGastos.push(montosPorMes);
  console.table(detallePerdida);
  //   -------------------------------
  detallePerdida.forEach((element) => {
    switch (element.mes) {
      case "01":
        itemsGastos.push({
          proveedor: element.proveedor,
          concepto: element.concepto,
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
          gasto_description: element.gasto_description,
          subgasto_description: element.subgasto_description,
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
