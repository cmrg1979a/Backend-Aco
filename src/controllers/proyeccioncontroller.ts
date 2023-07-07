import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import path from "path";
var xl = require("excel4node");

export const setProyeccion = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query(
    "SELECT * FROM function_proyeccion_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);",
    [
      data.id_branch,
      data.id_month,
      data.id_year,
      data.id_user,
      data.tipocambio,
      data.total_monlocal,
      data.total_conversionext,
      data.total_monext,
      data.total_proyectado_ext,
      data.details.map((item) => {
        return item.id_tiposubgasto;
      }),
      data.details.map((item) => {
        return item.id_entitie;
      }),
      data.details.map((item) => {
        return item.id_coin;
      }),
      data.details.map((item) => {
        return item.description;
      }),
      data.details.map((item) => {
        return item.monto_monlocal;
      }),
      data.details.map((item) => {
        return item.monto_monext;
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
            mensaje: rows[0].mensaje,
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
export const listProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_list_proyeccion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.id_month ? req.query.id_month : null,
      req.query.id_year ? req.query.id_year : null,
      req.query.id_user ? req.query.id_user : null,
      req.query.correlativo ? req.query.correlativo : null,
      req.query.tipocambio ? req.query.tipocambio : null,
      req.query.total_monlocal ? req.query.total_monlocal : null,
      req.query.total_conversionext ? req.query.total_conversionext : null,
      req.query.total_monext ? req.query.total_monext : null,
      req.query.total_proyectado_ext ? req.query.total_proyectado_ext : null,
      req.query.estado ? req.query.estado : null,
      req.query.aprobadoflag ? req.query.aprobadoflag : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
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
export const verProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_ver($1);",
    [req.query.id ? req.query.id : null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
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

export const updateProyeccion = async (req: Request, res: Response) => {
  let data = req.body;

  await pool.query(
    "SELECT * FROM function_proyeccion_editar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);",
    [
      data.id,
      data.id_branch,
      data.id_month,
      data.id_year,
      data.id_user,
      data.tipocambio,
      data.total_monlocal,
      data.total_conversionext,
      data.total_monext,
      data.total_proyectado_ext,
      data.details.map((item) => {
        return item.id ? item.id : null;
      }),
      data.details.map((item) => {
        return item.id_tiposubgasto;
      }),
      data.details.map((item) => {
        return item.id_entitie;
      }),
      data.details.map((item) => {
        return item.id_coin;
      }),
      data.details.map((item) => {
        return item.description ? item.description : null;
      }),
      data.details.map((item) => {
        return item.monto_monlocal;
      }),
      data.details.map((item) => {
        return item.monto_monext;
      }),
      data.details.map((item) => {
        return item.estado;
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
            mensaje: rows[0].mensaje,
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


export const validateProyeccionAprob = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_validar_aprob($1);",
    [req.query.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
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
export const copiarProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_copiar($1,$2,$3,$4,$5);",
    [
      req.body.id,
      req.body.id_month,
      req.body.id_year,
      req.body.id_user,
      req.body.id_branch,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
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
export const aprobarProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_aprobar($1);",
    [req.body.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
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
export const eliminarProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_eliminar($1);",
    [req.body.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
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
export const generarPrimeraProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_generar($1,$2,$3,$4);",
    [req.body.id_month, req.body.id_year, req.body.id_branch, req.body.id_user],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
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

export const exportarProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_ver($1);",
    [req.query.id ? req.query.id : null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
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
          let cabTitleResumen = wb.createStyle({
            numberFormat: "###0.00",
            font: {
              color: "#ffffff",
              bold: true,
            },
            fill: {
              type: "pattern",
              patternType: "solid",
              fgColor: "light blue",
            },
            alignment: {
              vertical: "center",
              horizontal: "center",
            },
          });
          let cabsubTitle = wb.createStyle({
            numberFormat: "###0.00",
            font: {
              color: "#ffffff",
              bold: true,
            },
            fill: {
              type: "pattern",
              patternType: "solid",
              fgColor: "light blue",
            },
            alignment: {
              vertical: "center",
              horizontal: "left",
            },
          });
          let styleData = wb.createStyle({
            numberFormat: "###0.00",

            alignment: {
              vertical: "center",
              horizontal: "right",
            },
          });
          var wr = wb.addWorksheet("Proyeccion");
          wr.column(1).setWidth(20);
          wr.column(2).setWidth(15);

          wr.column(4).setWidth(20);
          wr.column(5).setWidth(35);
          wr.column(6).setWidth(50);
          wr.column(7).setWidth(40);
          wr.column(8).setWidth(7);
          wr.column(9).setWidth(20);
          wr.column(10).setWidth(20);

          wr.cell(1, 1, 1, 2, true)
            .string("Datos Principales")
            .style(cabTitleResumen);
          wr.cell(2, 1).string("Correlativo").style(cabsubTitle);
          wr.cell(3, 1).string("Mes").style(cabsubTitle);
          wr.cell(4, 1).string("Año").style(cabsubTitle);
          wr.cell(5, 1).string("Tipo Cambio").style(cabsubTitle);
          wr.cell(6, 1).string("Total Proyecto(S/.)").style(cabsubTitle);
          wr.cell(7, 1).string("Conversión a Dolares").style(cabsubTitle);
          wr.cell(8, 1).string("Gastos(USD)").style(cabsubTitle);
          wr.cell(9, 1).string("Total Proyectado (USD)").style(cabsubTitle);
          wr.cell(2, 2).string(rows[0].correlativo.toString()).style(styleData);
          wr.cell(3, 2).string(rows[0].month_description).style(styleData);
          wr.cell(4, 2).string(rows[0].year_description).style(styleData);
          wr.cell(5, 2).string(rows[0].tipocambio).style(styleData);
          wr.cell(6, 2).string(rows[0].total_monlocal).style(styleData);
          wr.cell(7, 2).string(rows[0].total_conversionext).style(styleData);
          wr.cell(8, 2).string(rows[0].total_monext).style(styleData);
          wr.cell(9, 2).string(rows[0].total_proyectado_ext).style(styleData);

          wr.row(1).filter({
            firstColumn: 4,
            lastColumn: 10,
          });
          wr.cell(1, 4).string("Gasto").style(cabTitle);
          wr.cell(1, 5).string("SubGasto").style(cabTitle);
          wr.cell(1, 6).string("Proveedor").style(cabTitle);
          wr.cell(1, 7).string("Descripción").style(cabTitle);
          wr.cell(1, 8).string("Mon").style(cabTitle);
          wr.cell(1, 9).string("Monto Moneda Original").style(cabTitle);
          wr.cell(1, 10).string("Monto FINAL en USD").style(cabTitle);
          let details = rows[0].details;
          let fila = 2;

          details.forEach((element) => {
            wr.cell(fila, 4).string(element.gasto_description);
            wr.cell(fila, 5).string(element.subgasto_descripcion);
            wr.cell(fila, 6).string(element.namelong);
            wr.cell(fila, 7).string(
              element.descripcion ? element.descripcion : ""
            );
            wr.cell(fila, 8).string(element.symbol);
            wr.cell(fila, 9).number(element.monto_monlocal);
            wr.cell(fila, 10).number(element.monto_monext);
            fila++;
          });

          let pathexcel = path.join(
            `${__dirname}../../../uploads`,
            "ReporteProyeccion.xlsx"
          );
          wb.write(pathexcel, function (err, stats) {
            if (err) {
              console.log(err);
            } else {
              res.download(pathexcel);
            }
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

export const getProyeccionAprobada = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_get_proyeccion_aprobada($1);",
    [req.query.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
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
