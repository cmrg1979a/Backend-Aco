import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import moment from "moment";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
// const ExcelJS = require("exceljs/dist/es5");
var xl = require("excel4node");
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import path from "path";
moment.locale("es");
import puppeteer from "puppeteer";
import fs from "fs";
let ejs = require("ejs");
export const getControlFile = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_reporte_file($1,$2,$3,$4,$5,$6,$7);",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.id_operativo ? req.query.id_operativo : null,
      req.query.status_op ? req.query.status_op : null,
      req.query.status_admin ? req.query.status_admin : null,
      req.query.sentido ? req.query.sentido : null,
      req.query.desde ? req.query.desde : null,
      req.query.hasta ? req.query.hasta : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
            estadoflag: rows[0].estadoflag,
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

export const getControlFileAllMaster = async (req: Request, res: Response) => {
  pool.query(
    "reportFileMaster_list(null ,null,null)",
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const getControlFileAllFilter = async (req: Request, res: Response) => {
  const {
    id_branch,
    idsentido,
    idOperador,
    idStatus,
    idStatusAdm,
    fecha_ini,
    fecha_fin,
  } = req.body;

  await pool.query(
    "SELECT * FROM reportFile_list2($1,$2,$3,$4,$5,$6);",
    [
      id_branch,
      idOperador ? idOperador : null,
      idStatus ? idStatus : null,
      idStatusAdm ? idStatusAdm : null,
      fecha_ini ? fecha_ini : null,
      fecha_fin ? fecha_fin : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const getTotales = async (req: Request, res: Response) => {
  const { idsentido, idOperador, idStatus, idStatusAdm, fecha_ini, fecha_fin } =
    req.body;

  await pool.query(
    "select * from  TABLE_MASTERCONTROL_Totales($1,$2,$3,$4,$5,$6)",
    [
      idsentido ? idsentido : null,
      idOperador ? idOperador : null,
      idStatus ? idStatus : null,
      idStatusAdm ? idStatusAdm : null,
      fecha_ini ? fecha_ini : null,
      fecha_fin ? fecha_fin : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const getTotalesAll = async (req: Request, res: Response) => {
  const { idsentido, fecha_ini, fecha_fin } = req.body;

  await pool.query(
    "select * from  TABLE_MASTERCONTROL_Totales($1,null,null,null,$2,$3)",
    [idsentido, fecha_ini, fecha_fin],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const getControlFileAllFilterMaster = async (
  req: Request,
  res: Response
) => {
  const { idsentido, fecha_ini, fecha_fin } = req.body;

  pool.query(
    "select * from reportFileMaster_list($1 ,$2 ,$3)",
    [idsentido, fecha_ini, fecha_fin],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const pdfInstructivo = async (req: Request, res: Response) => {
  const {
    nro_control,
    code_master,
    code_house,
    sentido,
    tipo_embarque,
    puerto_origen,
    puerto_destino,
    agente,
    consignatario,
    notify,
    bultos,
    peso,
    volumen,
    itemsIngreso,
    itemsEgreso,
    profit,
    itemsTotalesProveedores,
    ruc,
    totalIngreso,
    totalIngresoOp,
    totalEgreso,
    totalEgresoOp,
    exp,
    totalIgvEgresos,
    totalIgvEgresosOp,
    totalTotalEgresos,
    totalTotalEgresosOp,
    totalIgvIngresos,
    totalIgvIngresosOp,
    totalTotalIngresos,
    totalTotalIngresosOp,
    gananciapr,
    igvpr,
    subtotalpr,
    gananciaop,
    igvop,
    subtotalop,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-instructivo.ejs"),
    {
      nro_control,
      code_master,
      code_house,
      sentido,
      tipo_embarque,
      puerto_origen,
      puerto_destino,
      agente,
      consignatario,
      notify,
      bultos,
      peso,
      volumen,
      itemsIngreso,
      itemsEgreso,
      profit,
      itemsTotalesProveedores,
      ruc,
      totalIngreso,
      totalIngresoOp,
      totalEgreso,
      totalEgresoOp,
      exp,
      totalIgvEgresos,
      totalIgvEgresosOp,
      totalTotalEgresos,
      totalTotalEgresosOp,
      totalIgvIngresos,
      totalIgvIngresosOp,
      totalTotalIngresos,
      totalTotalIngresosOp,
      gananciapr,
      igvpr,
      subtotalpr,
      gananciaop,
      igvop,
      subtotalop,
    },
    async (err: any, html: any) => {
      if (err) {
        return res.send(err);
      }

      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });

      const outputPath = path.join("files", "INSTRUCTIVO.pdf");
      await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
        margin: {
          top: "10mm",
          bottom: "10mm",
          left: "10mm",
          right: "10mm",
        },
      });

      await browser.close();

      res.download("/INSTRUCTIVO.pdf");
      res.send({
        msg: "File created successfully",
        path: "INSTRUCTIVO.pdf", // sin slash adelante como pediste
      });
    }
  );
};

export const pdfSolicitud = async (req: Request, res: Response) => {
  const {
    nameProveedor,
    nameConsignatario,
    totalPagar,
    expediente,
    fecha,
    totalProveedores,
    comentarios,
    codigo_pago,
    codigo_master,
    cuentas,
    operador,
    conceptos,
    selected,
    totalSelected,
    number,
    url_logo,
  } = req.body;

  let browser = null;
  try {
    const safeName = nameProveedor.replace(/[^\w\d]/g, "_");
    const fileName = `SOLICITUD_EXPEDIENTE_${expediente}_${safeName}_${number}.pdf`;
    const outputPath = path.join(__dirname, "../../files", fileName);

    const htmlContent = await ejs.renderFile(
      path.join(__dirname, "../views/", "pdf-solicitud.ejs"),
      {
        nameProveedor,
        nameConsignatario,
        totalPagar,
        expediente,
        fecha,
        totalProveedores,
        comentarios,
        codigo_pago,
        codigo_master,
        cuentas,
        operador,
        conceptos,
        selected,
        totalSelected,
        number,
        url_logo,
      }
    );

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      ...(global.esProduccion && { executablePath: "/usr/bin/google-chrome" }),
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    fs.writeFileSync(outputPath, pdfBuffer);

    // 🔁 RESPUESTA COMPATIBLE CON TU FRONTEND
    return res.send({
      msg: "File created successfully",
      path: `files/${fileName}`, // esto es lo que usas en window.open()
    });
  } catch (error) {
    console.error("Error al generar PDF con Puppeteer:", error);
    return res.status(500).send("Error al generar el PDF");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
export const createdPDF = async (req: Request, res: Response) => {
  const fechaYHora = new Date();
  let {
    id_branch,
    id_operativo,
    status_op,
    status_admin,
    sentido,
    desde,
    hasta,
  } = req.body;

  await pool.query(
    "SELECT * FROM function_reporte_file($1,$2,$3,$4,$5,$6,$7);",
    [
      id_branch ? id_branch : null,
      id_operativo ? id_operativo : null,
      status_op ? status_op : null,
      status_admin ? status_admin : null,
      sentido ? sentido : null,
      desde ? desde : null,
      hasta ? hasta : null,
    ],
    async (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        const operadoresInfo = {};

        if (rows.length > 0) {
          rows.forEach((etiqueta) => {
            const operador = etiqueta.operador;
            if (!operadoresInfo[operador]) {
              operadoresInfo[operador] = {
                operador: operador,
                totalAbiertas: 0,
                totalCerradas: 0,
                totalFiles: 0,
              };
            }

            if (etiqueta.statuslock === 0) {
              operadoresInfo[operador].totalAbiertas++;
            } else if (etiqueta.statuslock === 1) {
              operadoresInfo[operador].totalCerradas++;
            }
          });

          let fecha = moment().format("DD-MMM-YYYY HH:mm:ss");
          let totalAbiertas = rows.filter((v) => v.statuslock == 0).length;
          let totalCerradas = rows.filter((v) => v.statuslock == 1).length;
          let totalLlegadas = rows.filter((v) => v.orden == 1).length;
          let totalPorLLegar = rows.filter((v) => v.orden == 2).length;
          let totalOtras = rows.filter((v) => v.orden == 3).length;
          let totalFile = rows.length;
          let branch = rows[0].branch;
          let operadoresArray = Object.values(operadoresInfo);
          let list = rows;

          if (req.body.status_op) {
            status_op = req.body.status_op == 0 ? "Abiertos" : "Cerrados";
          }
          if (req.body.status_admin) {
            status_admin = req.body.status_admin == 0 ? "Abiertos" : "Cerrados";
          }
          if (req.body.sentido) {
            sentido = rows[0].modality;
          }
          if (req.body.desde) {
            desde = req.body.desde;
          }
          if (req.body.hasta) {
            hasta = req.body.hasta;
          }

          ejs.renderFile(
            path.join(__dirname, "../views/", "report-template.ejs"),
            {
              fecha,
              totalFile,
              branch,
              status_op,
              status_admin,
              sentido,
              desde,
              hasta,
              operadoresArray,
              list,
              totalAbiertas,
              totalCerradas,
              totalLlegadas,
              totalPorLLegar,
              totalOtras,
            },
            async (err: any, html: any) => {
              if (err) {
                console.log(err);
                return;
              }

              const browser = await puppeteer.launch({ headless: "new" });
              const page = await browser.newPage();
              await page.setContent(html, { waitUntil: "networkidle0" });

              const outputPath = path.join("files", "REPORT_CONTROL_FILE.pdf");
              await page.pdf({
                path: outputPath,
                format: "A4",
                printBackground: true,
                landscape: true,
                margin: {
                  top: "10mm",
                  bottom: "10mm",
                  left: "10mm",
                  right: "10mm",
                },
              });

              await browser.close();

              res.download("/REPORT_CONTROL_FILE.pdf");
              res.send({
                estadoflag: true,
                msg: "File created successfully",
                path: path.join("/REPORT_CONTROL_FILE.pdf"),
              });
            }
          );
        } else {
          res.send({
            estadoflag: false,
            msg: "File created successfully",
            path: path.join("/REPORT_CONTROL_FILE.pdf"),
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getReportFileDetails = async (req: Request, res: Response) => {
  const { id_branch, desde, hasta } = req.query;
  // se a movido la función existe una copia llamada totales_pagados_orders_old revisarla en caso se quiera revetir
  // "SELECT * FROM totales_pagados_orders($1,$2)",

  await pool.query(
    "SELECT * FROM function_report_filedetallado($1,$2,$3)",
    [id_branch, desde, hasta],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
            estadoflag: rows[0].estadoflag,
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

export const pdfFD = async (req: Request, res: Response) => {
  const { id_branch, desde, hasta } = req.body;
  const fechaYHora = new Date();

  await pool.query(
    "SELECT * FROM function_report_filedetallado($1,$2,$3)",
    [id_branch, desde, hasta],
    async (err, response, fields) => {
      if (!err) {
        let data = response.rows;
        let totalExp = data.length;

        let gananciaPr = data.reduce((total, item) => {
          return (
            parseFloat(total) +
            (parseFloat(item.ingresos_pr) - parseFloat(item.egresos_pr))
          );
        }, 0);

        let gananciaOp = data.reduce((total, item) => {
          return (
            parseFloat(total) +
            (parseFloat(item.ingresos_op) - parseFloat(item.egresos_op))
          );
        }, 0);

        let cobrado = data.reduce((total, item) => {
          return parseFloat(total) + parseFloat(item.ingesos_pagado);
        }, 0);

        let porCobrar = data.reduce((total, item) => {
          return (
            parseFloat(total) +
            (parseFloat(
              item.ingresos_op != 0 ? item.ingresos_op : item.ingresos_pr
            ) -
              parseFloat(item.ingesos_pagado))
          );
        }, 0);

        let porPagar = data.reduce((total, item) => {
          return (
            parseFloat(total) +
            (parseFloat(
              item.egresos_op != 0 ? item.egresos_op : item.egresos_pr
            ) -
              parseFloat(item.egresos_pagado))
          );
        }, 0);

        let fecha = moment().format("YYYY_MM_DD");
        let fechaYHoraStr = moment().format("YYYY-MMM-DD HH:mm:ss");

        ejs.renderFile(
          path.join(__dirname, "../views/", "pdf-fileDetails.ejs"),
          {
            data,
            totalExp,
            gananciaPr,
            gananciaOp,
            cobrado,
            porCobrar,
            porPagar,
            desde,
            hasta,
            fechaYHora: fechaYHoraStr,
          },
          async (err: any, html: any) => {
            if (err) {
              res.send(err);
            } else {
              const browser = await puppeteer.launch({ headless: "new" });
              const page = await browser.newPage();
              await page.setContent(html, { waitUntil: "networkidle0" });

              const outputPath = `files/REPORTE_FILES_DETALLADO_${fecha}.pdf`;
              await page.pdf({
                path: outputPath,
                format: "A4",
                printBackground: true,
                landscape: true,
                margin: {
                  top: "15mm",
                  bottom: "15mm",
                  left: "10mm",
                  right: "10mm",
                },
              });

              await browser.close();

              res.download(`/REPORTE_FILES_DETALLADO_${fecha}.pdf`);
              res.send({
                msg: "File created successfully",
                path: path.join(`/REPORTE_FILES_DETALLADO_${fecha}.pdf`),
              });
            }
          }
        );
      }
    }
  );
};

export const constRexportCXPExcel = async (req: Request, res: Response) => {
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });

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
  let cabProveedor = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#a8aee5",
    },
    alignment: {
      vertical: "center",
    },
  });
  let cabLlegada = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#fbc3c3",
    },
  });
  let cabNoLlegada = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#c3fbef",
    },
  });
  let cabGeneral = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#e9e9e9",
    },
  });
  let cabDetalle = wb.createStyle({
    width: "auto",
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#fff1cf",
    },
  });
  let cabProveedorDetalle = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#ffccab",
    },
  });
  var wt = wb.addWorksheet("Totales");
  var wo = wb.addWorksheet("Operativa");
  var wa = wb.addWorksheet("Administrativa");
  wo.cell(1, 1, 1, 11, true)
    .string("REPORTE DE CUENTAS POR PAGAR")
    .style(cabTitle);
  let fila = 2;

  let header = await obtenerHeaderCXP(req.query);
  let rows = await getReporteCXP(req.query);
  let rows2 = await getDebsToPayAdmin(req.query);

  wo.cell(fila, 1).string("Filtro").style(cabDetalle);

  fila++;
  if (header[0].proveedor) {
    wo.cell(fila, 1).string("Proveedor");
    wo.cell(fila, 2).string(header[0].proveedor);
    fila++;
  }
  if (header[0].desde) {
    wo.cell(fila, 1).string("Desde");
    wo.cell(fila, 2).string(header[0].desde);
    fila++;
  }
  if (header[0].hasta) {
    wo.cell(fila, 1).string("Hasta");
    wo.cell(fila, 2).string(header[0].hasta);
    fila++;
  }
  if (header[0].llegada) {
    wo.cell(fila, 1).string("Llegada");
    wo.cell(fila, 2).string(header[0].llegada);
    fila++;
  }
  if (header[0].nro_expediente) {
    wo.cell(fila, 1).string("Nro Expediente");
    wo.cell(fila, 2).string(header[0].nro_expediente);
    fila++;
  }
  if (header[0].ingreso) {
    wo.cell(fila, 1).string("Gasto");
    wo.cell(fila, 2).string(header[0].ingreso);
    fila++;
  }
  if (header[0].gasto) {
    wo.cell(fila, 1).string("Sub Gasto");
    wo.cell(fila, 2).string(header[0].subgasto);
    fila++;
  }
  // console.log(header);
  wo.row(fila).filter({
    firstColumn: 1,
    lastColumn: 11,
  });

  wo.cell(fila, 1).string("Proveedor").style(cabDetalle);
  wo.cell(fila, 2).string("Correlativo").style(cabDetalle);
  wo.cell(fila, 3).string("Expediente").style(cabDetalle);
  wo.cell(fila, 4).string("Cliente").style(cabDetalle);
  wo.cell(fila, 5).string("Factura").style(cabDetalle);
  wo.cell(fila, 6).string("Fecha Disponibilidad").style(cabDetalle);
  wo.cell(fila, 7).string("Moneda").style(cabDetalle);
  wo.cell(fila, 8).string("Total Pagar").style(cabDetalle);
  wo.cell(fila, 9).string("Estatus").style(cabDetalle);
  wo.cell(fila, 10).string("Pagado Cliente").style(cabDetalle);
  fila++;

  if (Array.isArray(rows)) {
    rows.forEach((element) => {
      element.details.forEach((element2) => {
        wo.cell(fila, 1).string(
          element.nameproveedor ? element.nameproveedor : ""
        );
        wo.cell(fila, 2).string(
          element2.code_correlativo ? element2.code_correlativo + "" : ""
        );
        wo.cell(fila, 3).string(
          element2.nro_master ? element2.nro_master + "" : ""
        );
        wo.cell(fila, 4).string(
          element2.nameconsigner ? element2.nameconsigner : ""
        );
        wo.cell(fila, 5).string(
          element2.expedientes ? element2.expedientes : ""
        );
        wo.cell(fila, 6).date(
          element2.fecha_disponibilidad ? element2.fecha_disponibilidad : ""
        );
        wo.cell(fila, 7).string(element2.symbol ? element2.symbol : "");
        wo.cell(fila, 8).number(
          element2.total_pagar ? element2.total_pagar : ""
        );
        wo.cell(fila, 9).string(
          element2.llegada == 1 ? "LLEGADA" : "NO LLEGADA"
        );
        wo.cell(fila, 10).string(element2.pagado == 1 ? "SI" : "NO");
        fila++;
      });
    });
  }

  wa.cell(1, 1, 1, 9, true)
    .string("REPORTE DE CUENTAS POR PAGAR ADMINISTRATIVAS")
    .style(cabTitle);
  let filaA = 2;
  wa.cell(filaA, 1).string("Filtro").style(cabDetalle);
  filaA++;

  if (header[0].proveedor) {
    wa.cell(filaA, 1).string("Proveedor");
    wa.cell(filaA, 2).string(header[0].proveedor);
    filaA++;
  }
  if (header[0].desde) {
    wa.cell(filaA, 1).string("Desde");
    wa.cell(filaA, 2).string(header[0].desde);
    filaA++;
  }
  if (header[0].hasta) {
    wa.cell(filaA, 1).string("Hasta");
    wa.cell(filaA, 2).string(header[0].hasta);
    filaA++;
  }
  if (header[0].llegada) {
    wa.cell(filaA, 1).string("Llegada");
    wa.cell(filaA, 2).string(header[0].llegada);
    filaA++;
  }
  if (header[0].nro_expediente) {
    wa.cell(filaA, 1).string("Nro Expediente");
    wa.cell(filaA, 2).string(header[0].nro_expediente);
    filaA++;
  }
  if (header[0].ingreso) {
    wa.cell(filaA, 1).string("Gasto");
    wa.cell(filaA, 2).string(header[0].ingreso);
    filaA++;
  }
  if (header[0].gasto) {
    wa.cell(filaA, 1).string("Sub Gasto");
    wa.cell(filaA, 2).string(header[0].subgasto);
    filaA++;
  }

  wa.cell(filaA, 1).string("Proveedor").style(cabDetalle);
  wa.cell(filaA, 2).string("N° Factura").style(cabDetalle);
  wa.cell(filaA, 3).string("Fecha").style(cabDetalle);
  wa.cell(filaA, 4).string("Moneda").style(cabDetalle);
  wa.cell(filaA, 5).string("Monto").style(cabDetalle);
  wa.cell(filaA, 6).string("Moneda").style(cabDetalle);
  wa.cell(filaA, 7)
    .string(req.query.nombre_impuesto ? req.query.nombre_impuesto : "IGV")
    .style(cabDetalle);
  wa.cell(filaA, 8).string("Moneda").style(cabDetalle);
  wa.cell(filaA, 9).string("Total").style(cabDetalle);
  filaA++;
  if (Array.isArray(rows2)) {
    rows2.forEach((element) => {
      element.details.forEach((element2) => {
        wa.cell(filaA, 1).string(element.nameconsigner);
        wa.cell(filaA, 2).string(element2.nro_factura);
        wa.cell(filaA, 3).date(element2.fecha);
        wa.cell(filaA, 4).string(element2.namecoins);
        wa.cell(filaA, 5).number(element2.monto);
        wa.cell(filaA, 6).string(element2.namecoins);
        wa.cell(filaA, 7).number(element2.igv);
        wa.cell(filaA, 8).string(element2.namecoins);
        wa.cell(filaA, 9).number(element2.total);
        filaA++;
      });
    });
  }

  let totalOp = calcularTotalesOp(rows, req.query.moneda);
  let totalAdmin = calcularTotalesAdm(rows2, req.query.moneda);

  wt.cell(1, 1, 1, 9, true).string("REPORTE TOTALES").style(cabTitle);
  wt.cell(2, 1, 2, 4, true).string("TOTAL OPERATIVO").style(cabLlegada);
  wt.cell(2, 6, 2, 9, true).string("TOTAL ADMINISTRATIVO").style(cabLlegada);
  wt.cell(3, 1).string("Operativo").style(cabNoLlegada);
  wt.cell(3, 2).string("Llegadas").style(cabNoLlegada);
  wt.cell(3, 3).string("No llegadas").style(cabNoLlegada);
  wt.cell(3, 4).string("Total").style(cabNoLlegada);
  wt.cell(3, 6).string("Administrativo").style(cabNoLlegada);
  wt.cell(3, 7).string("Monto").style(cabNoLlegada);
  wt.cell(3, 8).string(req.query.nombre_impuesto).style(cabNoLlegada);
  wt.cell(3, 9).string("Total").style(cabNoLlegada);
  wt.cell(4, 1).string(totalOp[0].moneda);
  wt.cell(4, 2).string(parseFloat(totalOp[0].llegada).toFixed(2));
  wt.cell(4, 3).string(parseFloat(totalOp[0].no_llegada).toFixed(2));
  wt.cell(4, 4).string(parseFloat(totalOp[0].total).toFixed(2));
  wt.cell(5, 1).string(totalOp[1].moneda);
  wt.cell(5, 2).string(parseFloat(totalOp[1].llegada).toFixed(2));
  wt.cell(5, 3).string(parseFloat(totalOp[1].no_llegada).toFixed(2));
  wt.cell(5, 4).string(parseFloat(totalOp[1].total).toFixed(2));
  wt.cell(4, 6).string(totalAdmin[0].moneda);
  wt.cell(4, 7).string(parseFloat(totalAdmin[0].monto).toFixed(2));
  wt.cell(4, 8).string(parseFloat(totalAdmin[0].igv).toFixed(2));
  wt.cell(4, 9).string(parseFloat(totalAdmin[0].total).toFixed(2));
  wt.cell(5, 6).string(totalAdmin[1].moneda);
  wt.cell(5, 7).string(parseFloat(totalAdmin[1].monto).toFixed(2));
  wt.cell(5, 8).string(parseFloat(totalAdmin[1].igv).toFixed(2));
  wt.cell(5, 9).string(parseFloat(totalAdmin[1].total).toFixed(2));

  let pathexcel = path.join(`${__dirname}../../../uploads`, "Reportexls.xlsx");
  wb.write(pathexcel, function (err, stats) {
    if (err) {
      console.log(err);
    } else {
      res.download(pathexcel);
    }
  });
};

export const constReporteCXCExcel = async (req: Request, res: Response) => {
  var fechaActual = new Date();
  var year = fechaActual.getFullYear(); // Obtiene el año actual (ejemplo: 2023)
  var month = fechaActual.getMonth() + 1; // Obtiene el mes actual (0-11, por lo que se le suma 1)
  var day = fechaActual.getDate(); // Obtiene el día actual (1-31)

  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });

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

  let cabLlegada = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#fbc3c3",
    },
    alignment: {
      vertical: "center",
      horizontal: "center",
    },
  });
  let cabNoLlegada = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#c3fbef",
    },
    alignment: {
      vertical: "center",
      horizontal: "center",
    },
  });

  let detail = wb.createStyle({
    alignment: {
      vertical: "center",
      horizontal: "center",
    },
  });

  let cabDetalle = wb.createStyle({
    width: "auto",
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#fff1cf",
    },
    alignment: {
      vertical: "center",
      horizontal: "center",
    },
  });
  let cabDetalleDetails = wb.createStyle({
    width: "auto",
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#fff1cf",
    },
    alignment: {
      wrapText: true, // Habilitar el ajuste de texto
      vertical: "center",
      horizontal: "center",
    },
  });

  /** AGREGANDO HOJAS */
  var wt = wb.addWorksheet("Totales");

  var wo = wb.addWorksheet("Reporte Detallado");
  wo.cell(1, 1, 1, 11, true)
    .string("REPORTE DE CUENTAS POR COBRAR")
    .style(cabTitle);
  let fila = 2;

  let nombre_impuesto = req.query.nombre_impuesto;
  let header = await obtenerHeaderCXC(req.query);
  let rows = await getReporteCXC(req.query);
  let rows2 = await getReporteCXCAdmin(req.query);

  wo.cell(fila, 1).string("Filtro").style(cabDetalle);
  fila++;
  if (header[0].cliente) {
    wo.cell(fila, 1).string("Cliente");
    wo.cell(fila, 2).string(header[0].cliente);
    fila++;
  }
  if (header[0].desde) {
    wo.cell(fila, 1).string("Desde");
    wo.cell(fila, 2).string(header[0].desde);
    fila++;
  }
  if (header[0].hasta) {
    wo.cell(fila, 1).string("Hasta");
    wo.cell(fila, 2).string(header[0].hasta);
    fila++;
  }
  if (header[0].llegada) {
    wo.cell(fila, 1).string("Llegada");
    wo.cell(fila, 2).string(header[0].llegada);
    fila++;
  }
  if (header[0].nro_expediente) {
    wo.cell(fila, 1).string("Nro Expediente");
    wo.cell(fila, 2).string(header[0].nro_expediente);
    fila++;
  }
  if (header[0].ingreso) {
    wo.cell(fila, 1).string("Ingreso");
    wo.cell(fila, 2).string(header[0].ingreso);
    fila++;
  }
  if (header[0].subingreso) {
    wo.cell(fila, 1).string("Sub Ingreso");
    wo.cell(fila, 2).string(header[0].subingreso);
    fila++;
  }
  // console.log(header);
  wo.row(fila).filter({
    firstColumn: 1,
    lastColumn: 11,
  });

  wo.cell(fila, 1).string("Tipo").style(cabDetalle);
  wo.cell(fila, 2).string("Expediente").style(cabDetalle);
  wo.cell(fila, 3).string("Cliente").style(cabDetalle);
  wo.cell(fila, 4).string("Fecha de Llegada").style(cabDetalle);
  wo.cell(fila, 5).string("Factura").style(cabDetalle);
  wo.cell(fila, 6).string("Moneda").style(cabDetalle);
  wo.cell(fila, 7).string("Total Pagar").style(cabDetalle);
  wo.cell(fila, 8).string("Llegada").style(cabDetalle);
  wo.cell(fila, 9).string("Fecha de Vencimiento").style(cabDetalle);
  wo.cell(fila, 10).string("Días de atraso").style(cabDetalle);
  wo.cell(fila, 11).string("Estatus").style(cabDetalle);

  wo.column(1).setWidth(15);
  wo.column(2).setWidth(15);
  wo.column(3).setWidth(37);
  wo.column(4).setWidth(20);
  wo.column(5).setWidth(12);
  wo.column(9).setWidth(25);
  wo.column(11).setWidth(15);

  fila++;

  if (Array.isArray(rows) && rows.length > 0) {
    /** ------- REPORTE OPERATIVO ---------- */
    if (Array.isArray(rows)) {
      rows.forEach((element) => {
        element.details.forEach((element2) => {
          wo.cell(fila, 1).string("OPERATIVO").style(detail);
          wo.cell(fila, 2).string(element2.nro_master).style(detail);
          wo.cell(fila, 3).string(element2.nameconsigner).style(detail);
          if (element2.fecha_disponibilidad) {
            wo.cell(fila, 4).date(element2.fecha_disponibilidad).style(detail);
          } else {
            wo.cell(fila, 4).string("").style(detail);
          }
          wo.cell(fila, 5)
            .string(element2.nro_factura ? element2.nro_factura : "N/F")
            .style(detail);
          wo.cell(fila, 6).string(element2.symbol).style(detail);
          wo.cell(fila, 7).number(element2.total_pagar).style(detail);
          wo.cell(fila, 8)
            .string(element2.llegada == 1 ? "LLEGADA" : "NO LLEGADA")
            .style(detail);
          wo.cell(fila, 9).date(element2.fechadevencimiento).style(detail);
          wo.cell(fila, 10)
            .number(element2.diasatraso ? element2.diasatraso : 0)
            .style(detail);
          wo.cell(fila, 11).string(element2.estatus).style(detail);
          fila++;
        });
      });
      /*   */
    }
  }
  if (Array.isArray(rows2) && rows2.length > 0) {
    if (Array.isArray(rows2)) {
      rows2.forEach((element) => {
        element.details.forEach((element2) => {
          wo.cell(fila, 1).string("ADMINISTRATIVO").style(detail);
          wo.cell(fila, 2).string("").style(detail);
          wo.cell(fila, 3)
            .string(element2.nameconsigner ? element2.nameconsigner : "")
            .style(detail);
          wo.cell(fila, 4)
            .date(element2.fecha ? element2.fecha : "")
            .style(detail);
          wo.cell(fila, 5)
            .string(element2.concepto ? element2.concepto : "")
            .style(detail);
          wo.cell(fila, 6)
            .string(element2.symbol ? element2.symbol : "")
            .style(detail);
          wo.cell(fila, 7)
            .number(element2.monto ? element2.monto : "")
            .style(detail);
          wo.cell(fila, 8)
            .string(element2.llegada == 1 ? "LLEGADA" : "NO LLEGADA")
            .style(detail);
          wo.cell(fila, 9)
            .date(element2.fechavencimiento ? element2.fechavencimiento : "")
            .style(detail);
          wo.cell(fila, 10)
            .number(element2.diasatraso ? element2.diasatraso : 0)
            .style(detail);
          wo.cell(fila, 11)
            .string(element2.estatus ? element2.estatus : "")
            .style(detail);

          fila++;
        });
      });
    }
  }

  if (!!req.query.id_cliente) {
    let resumen = resumenCXC(rows, rows2);

    wo.cell(fila + 1, 3, fila + 1, 5, true)
      .string("RESUMEN:")
      .style(cabTitle);
    wo.cell(fila + 2, 3)
      .string("TOTAL VENCIDO")
      .style(cabDetalleDetails);
    wo.cell(fila + 3, 3)
      .string("TOTAL PRÓXIMA A VENCER LOS PRÓXIMOS 7 DÍAS")
      .style(cabDetalleDetails);
    wo.cell(fila + 4, 3)
      .string("TOTAL NO VENCIDO")
      .style(cabDetalleDetails);
    wo.cell(fila + 5, 3)
      .string(`SALDO P4NDIENTE AL ${day}/${month}/${year}`)
      .style(cabDetalleDetails);
    // -------------------------------------------------
    wo.cell(fila + 2, 4)
      .string(resumen.moneda)
      .style(cabNoLlegada);
    wo.cell(fila + 3, 4)
      .string(resumen.moneda)
      .style(cabNoLlegada);
    wo.cell(fila + 4, 4)
      .string(resumen.moneda)
      .style(cabNoLlegada);
    wo.cell(fila + 5, 4)
      .string(resumen.moneda)
      .style(cabNoLlegada);
    // // ---------------------------------------
    wo.cell(fila + 2, 5)
      .number(resumen.vencido)
      .style(cabNoLlegada);
    wo.cell(fila + 3, 5)
      .number(resumen.porvencer)
      .style(cabNoLlegada);
    wo.cell(fila + 4, 5)
      .number(resumen.novencido)
      .style(cabNoLlegada);
    wo.cell(fila + 5, 5)
      .number(resumen.total)
      .style(cabNoLlegada);
  }

  /** ------- REPORTE TOTAL ---------- */
  let totalOp = calcularTotalesOpCxC(rows, req.query.moneda);
  let totalAdmin = calcularTotalesAdmCxC(rows2, req.query.moneda);
  wt.cell(1, 1, 1, 9, true).string("RESUMEN").style(cabTitle);
  wt.cell(2, 1, 2, 4, true).string("RESUMEN OPERATIVO").style(cabLlegada);
  wt.cell(2, 6, 2, 9, true).string("RESUMEN ADMINISTRATIVO").style(cabLlegada);
  wt.cell(3, 1).string("Operativo").style(cabNoLlegada);
  wt.cell(3, 2).string("Llegadas").style(cabNoLlegada);
  wt.cell(3, 3).string("No llegadas").style(cabNoLlegada);
  wt.cell(3, 4).string("Total").style(cabNoLlegada);
  wt.cell(3, 6).string("Administrativo").style(cabNoLlegada);
  wt.cell(3, 7).string("Monto").style(cabNoLlegada);
  wt.cell(3, 8).string(req.query.nombre_impuesto).style(cabNoLlegada);
  wt.cell(3, 9).string("Total").style(cabNoLlegada);
  wt.cell(4, 1).string(totalOp[0].moneda);
  wt.cell(4, 2).string(parseFloat(totalOp[0].llegada).toFixed(2));
  wt.cell(4, 3).string(parseFloat(totalOp[0].no_llegada).toFixed(2));
  wt.cell(4, 4).string(parseFloat(totalOp[0].total).toFixed(2));
  wt.cell(5, 1).string(totalOp[1].moneda);
  wt.cell(5, 2).string(parseFloat(totalOp[1].llegada).toFixed(2));
  wt.cell(5, 3).string(parseFloat(totalOp[1].no_llegada).toFixed(2));
  wt.cell(5, 4).string(parseFloat(totalOp[1].total).toFixed(2));
  wt.cell(4, 6).string(totalAdmin[0].moneda);
  wt.cell(4, 7).string(parseFloat(totalAdmin[0].monto).toFixed(2));
  wt.cell(4, 8).string(parseFloat(totalAdmin[0].igv).toFixed(2));
  wt.cell(4, 9).string(parseFloat(totalAdmin[0].total).toFixed(2));
  wt.cell(5, 6).string(totalAdmin[1].moneda);
  wt.cell(5, 7).string(parseFloat(totalAdmin[1].monto).toFixed(2));
  wt.cell(5, 8).string(parseFloat(totalAdmin[1].igv).toFixed(2));
  wt.cell(5, 9).string(parseFloat(totalAdmin[1].total).toFixed(2));
  // -------------------------------------------
  let pathexcel = path.join(`${__dirname}../../../uploads`, "Reportexls.xlsx");
  wb.write(pathexcel, function (err, stats) {
    if (err) {
      console.log(err);
    } else {
      res.download(pathexcel);
    }
  });
};

export const getPdfInstructivoDetallado = async (
  req: Request,
  res: Response
) => {
  const path = require("path");
  const ejs = require("ejs");
  const puppeteer = require("puppeteer");

  const {
    bultos,
    exp,
    gananciaop,
    gananciapr,
    itemEgresos,
    itemHouses,
    itemTotalHouse,
    itemsTotalesProveedores,
    peso,
    puerto_destino,
    puerto_origen,
    tipo_embarque,
    volumen,
    sentido,
    totalEgreso,
    totalIgvEgresos,
    totalTotalEgresos,
    totalEgresoOp,
    totalIgvEgresosOp,
    totalTotalEgresosOp,
  } = req.body;

  try {
    ejs.renderFile(
      path.join(__dirname, "../views/", "pdf-instructivoDetallado.ejs"),
      {
        exp,
        gananciapr,
        gananciaop,
        sentido,
        tipo_embarque,
        puerto_origen,
        puerto_destino,
        bultos,
        peso,
        volumen,
        itemEgresos,
        itemHouses,
        itemTotalHouse,
        itemsTotalesProveedores,
        totalEgreso,
        totalIgvEgresos,
        totalTotalEgresos,
        totalEgresoOp,
        totalIgvEgresosOp,
        totalTotalEgresosOp,
      },
      async (err: any, html: string) => {
        if (err) {
          res.send(err);
        } else {
          const browser = await puppeteer.launch({ headless: "new" });
          const page = await browser.newPage();
          await page.setContent(html, { waitUntil: "networkidle0" });

          const outputPath = "files/INSTRUCTIVO_DETALLADO.pdf";
          await page.pdf({
            path: outputPath,
            format: "A4",
            printBackground: true,
            margin: {
              top: "10mm",
              bottom: "10mm",
              left: "10mm",
              right: "10mm",
            },
          });

          await browser.close();

          res.download("INSTRUCTIVO_DETALLADO.pdf");
          res.send({
            msg: "File created successfully",
            path: path.join("INSTRUCTIVO_DETALLADO.pdf"),
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al generar PDF");
  }
};

// ----------------------------------------
function calcularTotalesOp(data, monExt) {
  let totalOperativo = [];
  let totalNoLlegadaDolares = 0;
  let totalLlegadaDolares = 0;
  let totalDolares = 0;

  let totalLlegadaSoles = 0;
  let totalNoLlegadaSoles = 0;
  let totalSoles = 0;
  data.forEach((element) => {
    element.details.forEach((element2) => {
      if (element2.symbol == "USD") {
        if (element2.llegada == 0) {
          totalNoLlegadaDolares += parseFloat(element2.total_pagar);
          totalDolares += parseFloat(element2.total_pagar);
        }
        if (element2.llegada == 1) {
          totalLlegadaDolares += parseFloat(element2.total_pagar);
          totalDolares += parseFloat(element2.total_pagar);
        }
      } else {
        if (element2.llegada == 0) {
          totalNoLlegadaSoles += parseFloat(element2.total_pagar);
          totalSoles += parseFloat(element2.total_pagar);
        }
        if (element2.llegada == 1) {
          totalLlegadaSoles += parseFloat(element2.total_pagar);
          totalSoles += parseFloat(element2.total_pagar);
        }
      }
    });
  });
  totalOperativo.push(
    {
      moneda: "USD",
      llegada: totalLlegadaDolares,
      no_llegada: totalNoLlegadaDolares,
      total: totalDolares,
    },
    {
      moneda: monExt,
      llegada: totalLlegadaSoles,
      no_llegada: totalNoLlegadaSoles,
      total: totalSoles,
    }
  );
  return totalOperativo;
}

function calcularTotalesAdm(data, monExt) {
  let totalAdministrativo = [];
  let totalMontoDolares = 0;
  let IgvDolares = 0;
  let totalDolares = 0;

  let totalMontoSoles = 0;
  let IgvSoles = 0;
  let totalSoles = 0;
  console.log(data);
  if (Array.isArray(data) && data.length > 0) {
    // if (data[0].estadoflag == true) {
    data.forEach((element) => {
      element.details.forEach((element2) => {
        if (element2.symbol == "USD") {
          totalMontoDolares += parseFloat(element2.monto);
          IgvDolares += parseFloat(element2.igv);
          totalDolares += parseFloat(element2.total);
        } else {
          totalMontoSoles += parseFloat(element2.monto);
          IgvSoles += parseFloat(element2.igv);
          totalSoles += parseFloat(element2.total);
        }
      });
    });
  }
  totalAdministrativo.push(
    {
      moneda: "USD",
      monto: totalMontoDolares,
      igv: IgvDolares,
      total: totalDolares,
    },
    {
      moneda: monExt,
      monto: totalMontoSoles,
      igv: IgvSoles,
      total: totalSoles,
    }
  );
  return totalAdministrativo;
}
function calcularTotalesOpCxC(data, monExt) {
  let totalOperativo = [];
  let totalNoLlegadaDolares = 0;
  let totalLlegadaDolares = 0;
  let totalDolares = 0;

  let totalLlegadaSoles = 0;
  let totalNoLlegadaSoles = 0;
  let totalSoles = 0;
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((element) => {
      element.details.forEach((element2) => {
        if (element2.symbol == "USD") {
          if (element2.llegada == 0) {
            totalNoLlegadaDolares += parseFloat(element2.total_pagar);
            totalDolares += parseFloat(element2.total_pagar);
          }
          if (element2.llegada == 1) {
            totalLlegadaDolares += parseFloat(element2.total_pagar);
            totalDolares += parseFloat(element2.total_pagar);
          }
        } else {
          if (element2.llegada == 0) {
            totalNoLlegadaSoles += parseFloat(element2.total_pagar);
            totalSoles += parseFloat(element2.total_pagar);
          }
          if (element2.llegada == 1) {
            totalLlegadaSoles += parseFloat(element2.total_pagar);
            totalSoles += parseFloat(element2.total_pagar);
          }
        }
      });
    });
  }
  totalOperativo.push(
    {
      moneda: "USD",
      llegada: totalLlegadaDolares,
      no_llegada: totalNoLlegadaDolares,
      total: totalDolares,
    },
    {
      moneda: monExt,
      llegada: totalLlegadaSoles,
      no_llegada: totalNoLlegadaSoles,
      total: totalSoles,
    }
  );

  return totalOperativo;
}
function calcularTotalesAdmCxC(data, monExt) {
  let totalAdministrativo = [];
  let totalMontoDolares = 0;
  let IgvDolares = 0;
  let totalDolares = 0;

  let totalMontoSoles = 0;
  let IgvSoles = 0;
  let totalSoles = 0;
  data.forEach((element) => {
    element.details.forEach((element2) => {
      if (element2.symbol == "USD") {
        totalMontoDolares += parseFloat(element2.total_pagar);
        IgvDolares += parseFloat(element2.igv);
        totalDolares +=
          parseFloat(element2.total_pagar) + parseFloat(element2.igv);
      } else {
        totalMontoSoles += parseFloat(element2.total_pagar);
        IgvSoles += parseFloat(element2.igv);
        totalSoles +=
          parseFloat(element2.total_pagar) + parseFloat(element2.igv);
      }
    });
  });
  totalAdministrativo.push(
    {
      moneda: "USD",
      monto: totalMontoDolares,
      igv: IgvDolares,
      total: totalDolares,
    },
    {
      moneda: monExt,
      monto: totalMontoSoles,
      igv: IgvSoles,
      total: totalSoles,
    }
  );

  return totalAdministrativo;
}

function getReporteCXC(data) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM debsclient_reportecxc($1,$2,$3,$4,$5,$6);",
      [
        data.id_branch ? data.id_branch : null,
        data.id_cliente ? data.id_cliente : null,
        data.llegadaflag ? data.llegadaflag : null,
        data.fechadesde ? data.fechadesde : null,
        data.fechahasta ? data.fechahasta : null,
        data.nro_expediente ? data.nro_expediente : null,
      ],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          if (!!rows[0].estadoflag) {
            resolve(rows);
          } else {
            rows = [];
            resolve(rows);
          }
        } else {
          rows = [];
          resolve(rows);
        }
      }
    );
  });
}
function getReporteCXCAdmin(data) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM TABLE_INVOICEADMINCXC_reporteadmincxc($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        data.id_branch ? data.id_branch : null,
        data.id_cliente ? data.id_cliente : null,
        data.desde ? data.desde : null,
        data.hasta ? data.hasta : null,
        data.llegada ? data.llegada : null,
        data.nro_expediente ? data.nro_expediente : null,
        data.id_ingreso ? data.id_ingreso : null,
        data.id_subingreso ? data.id_subingreso : null,
      ],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          if (!!rows[0].estadoflag) {
            resolve(rows);
          } else {
            rows = [];
            resolve(rows);
          }
        } else {
          rows = [];
          resolve(rows);
        }
      }
    );
  });
}
function resumenCXC(rows, rows2) {
  let res = {
    vencido: 0,
    porvencer: 0,
    novencido: 0,
    total: 0,
    moneda: "USD",
  };

  rows.forEach((element) => {
    element.details.forEach((detail) => {
      res.total += parseFloat(detail.total_pagar);
      if (detail.diasatraso > 0) {
        res.vencido += parseFloat(detail.total_pagar);
      } else if (detail.diasatraso < 0 && detail.diasatraso > -7) {
        res.porvencer += parseFloat(detail.total_pagar);
      } else {
        res.novencido += parseFloat(detail.total_pagar);
      }
    });
  });
  rows2.forEach((element) => {
    element.details.forEach((detail) => {
      res.total += parseFloat(detail.montodolar);

      if (detail.diasatraso > 0) {
        res.vencido += parseFloat(detail.montodolar);
      } else if (element.diasatraso < 0 && element.diasatraso > -7) {
        res.porvencer += parseFloat(element.montodolar);
      } else if (!element.diasatraso) {
        res.novencido += parseFloat(element.montodolar);
      }
    });
  });

  return res;
}

export const exportarPDFCXP = async (req: Request, res: Response) => {
  const { tipo_reporte: formato } = req.query;
  const ejs = require("ejs");
  const puppeteer = require("puppeteer");
  const path = require("path");
  const moment = require("moment");

  let title = "REPORTE DE CUENTAS POR PAGAR";
  let fechaEmision = moment().format("DD-MM-YYYY");
  let dataset = [];
  let rowsOp = await getReporteCXP(req.query);
  let rowsAdmin = await getDebsToPayAdmin(req.query);
  let header = await obtenerHeaderCXP(req.query);

  let filtro = [];

  if (header[0].proveedor)
    filtro.push({ nombre: "Cliente", descripcion: header[0].proveedor });
  if (header[0].desde)
    filtro.push({ nombre: "Desde", descripcion: header[0].desde });
  if (header[0].hasta)
    filtro.push({ nombre: "Hasta", descripcion: header[0].hasta });
  if (header[0].llegada)
    filtro.push({ nombre: "Llegada", descripcion: header[0].llegada });
  if (header[0].nro_expediente)
    filtro.push({
      nombre: "Nro Expediente",
      descripcion: header[0].nro_expediente,
    });
  if (header[0].gasto)
    filtro.push({ nombre: "Ingreso", descripcion: header[0].gasto });
  if (header[0].subgasto)
    filtro.push({ nombre: "Sub Ingreso", descripcion: header[0].subgasto });

  let totalvencidoObj_default = {
    "+60": null,
    "+45": null,
    "+30": null,
    "+15": null,
    "+7": null,
    "+0": null,
  };
  let totalxvencerObj_default = {
    "+60": null,
    "-60": null,
    "-45": null,
    "-30": null,
    "-15": null,
    "-7": null,
  };

  let totalvencidoObj = { ...totalvencidoObj_default };
  let totalxvencerObj = { ...totalxvencerObj_default };

  if (Array.isArray(rowsOp)) {
    if (rowsOp.length > 0) {
      rowsOp.forEach((element) => {
        let detalles = element.details;
        if (detalles.length > 0) {
          detalles.forEach((detalle) => {
            dataset.push({
              id_proveedor: element.id,
              proveedor: element.nameproveedor,
              nameconsigner: detalle.nameconsigner,
              correlativo: detalle.code_correlativo,
              nro_master: detalle.nro_master,
              expediente: detalle.expedientes,
              fecha_disponibilidad: detalle.fecha_disponibilidad
                ? moment(detalle.fecha_disponibilidad).format("DD/MM/YYYY")
                : "",
              symbol: detalle.symbol,
              total_pagar: detalle.total_pagar,
              llegada: detalle.llegada == 1 ? "SI" : "NO",
              pagado: detalle.pagado == 1 ? "SI" : "NO",
              esoperativo: true,
              esadministrativo: false,
              fechavencimiento: detalle.fecha_vencimiento
                ? moment(detalle.fecha_vencimiento).format("DD/MM/YYYY")
                : "",
              diasatraso: detalle.dias_atraso || 0,
              estatus: detalle.estatus || "",
              dias_credito: detalle.dias_credito || 0,
              dias_vencidos: detalle.dias_vencidos || 0,
            });
          });
        }
      });
    }
  }

  if (Array.isArray(rowsAdmin)) {
    if (rowsAdmin.length > 0) {
      rowsAdmin.forEach((element) => {
        let detalles = element.details;
        if (detalles.length > 0) {
          detalles.forEach((detalle) => {
            dataset.push({
              id_proveedor: element.id_proveedor,
              proveedor: element.nameconsigner,
              nameconsigner: detalle.nameconsigner,
              correlativo: "",
              nro_master: "",
              expediente: detalle.nro_factura,
              fecha_disponibilidad: detalle.created_at
                ? moment(detalle.created_at).format("DD/MM/YYYY")
                : "",
              symbol: detalle.symbol,
              total_pagar: detalle.monto,
              llegada: "SI",
              pagado: "NO",
              esoperativo: false,
              esadministrativo: true,
              fechavencimiento: detalle.fecha_vencimiento
                ? moment(detalle.fecha_vencimiento).format("DD/MM/YYYY")
                : "",
              diasatraso: detalle.dias_atraso || 0,
              estatus: detalle.estatus || "",
              dias_credito: detalle.dias_credito || 0,
              dias_vencidos: detalle.dias_vencidos || 0,
            });
          });
        }
      });
    }
  }

  dataset.filter((v) => {
    const { dias_vencidos, total_pagar: monto, estatus } = v;
    if (estatus.toUpperCase() == "VENCIDO") {
      switch (true) {
        case dias_vencidos > 60:
          totalvencidoObj["+60"] = totalvencidoObj["+60"] || 0;
          totalvencidoObj["+60"] += monto;
          break;
        case dias_vencidos <= 60 && dias_vencidos > 45:
          totalvencidoObj["+45"] = totalvencidoObj["+45"] || 0;
          totalvencidoObj["+45"] += monto;
          break;
        case dias_vencidos <= 45 && dias_vencidos > 30:
          totalvencidoObj["+30"] = totalvencidoObj["+30"] || 0;
          totalvencidoObj["+30"] += monto;
          break;
        case dias_vencidos <= 30 && dias_vencidos > 15:
          totalvencidoObj["+15"] = totalvencidoObj["+15"] || 0;
          totalvencidoObj["+15"] += monto;
          break;
        case dias_vencidos <= 15 && dias_vencidos > 7:
          totalvencidoObj["+7"] = totalvencidoObj["+7"] || 0;
          totalvencidoObj["+7"] += monto;
          break;
        case dias_vencidos <= 7 && dias_vencidos > 0:
          totalvencidoObj["+0"] = totalvencidoObj["+0"] || 0;
          totalvencidoObj["+0"] += monto;
          break;
      }
    } else if (estatus.toUpperCase() == "POR VENCER") {
      switch (true) {
        case dias_vencidos <= -60:
          totalxvencerObj["+60"] = totalxvencerObj["+60"] || 0;
          totalxvencerObj["+60"] += monto;
          break;
        case dias_vencidos > -60 && dias_vencidos <= -45:
          totalxvencerObj["-60"] = totalxvencerObj["-60"] || 0;
          totalxvencerObj["-60"] += monto;
          break;
        case dias_vencidos > -45 && dias_vencidos <= -30:
          totalxvencerObj["-45"] = totalxvencerObj["-45"] || 0;
          totalxvencerObj["-45"] += monto;
          break;
        case dias_vencidos > -30 && dias_vencidos <= -15:
          totalxvencerObj["-30"] = totalxvencerObj["-30"] || 0;
          totalxvencerObj["-30"] += monto;
          break;
        case dias_vencidos > -15 && dias_vencidos <= -7:
          totalxvencerObj["-15"] = totalxvencerObj["-15"] || 0;
          totalxvencerObj["-15"] += monto;
          break;
        case dias_vencidos > -7:
          totalxvencerObj["-7"] = totalxvencerObj["-7"] || 0;
          totalxvencerObj["-7"] += monto;
          break;
      }
    }
  });

  let totalvencido_array = Object.entries(totalvencidoObj).map(([k, v]) => [
    k,
    v ? v.toFixed(2) : null,
  ]);
  let totalxvencer_array = Object.entries(totalxvencerObj).map(([k, v]) => [
    k,
    v ? v.toFixed(2) : null,
  ]);
  let totalvencido = Object.values(totalvencidoObj)
    .reduce((s, v) => s + (v || 0), 0)
    .toFixed(2);
  let totalxvencer = Object.values(totalxvencerObj)
    .reduce((s, v) => s + (v || 0), 0)
    .toFixed(2);

  ejs.renderFile(
    path.join(__dirname, "../views/", "reporteCXP.ejs"),
    {
      title,
      formato,
      fechaEmision,
      data: dataset,
      totalvencido_array,
      totalxvencer_array,
      totalvencido,
      totalxvencer,
      filtro,
    },
    async (err, html) => {
      if (err) {
        res.send(err);
      } else {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        const buffer = await page.pdf({
          format: "A4",
          printBackground: true,
          landscape: true,
          margin: {
            top: "10mm",
            right: "10mm",
            bottom: "10mm",
            left: "10mm",
          },
        });

        await browser.close();
        res.setHeader("Content-Type", "application/pdf");
        res.status(200).send(buffer);
      }
    }
  );
};

function getReporteCXP(data) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM controlgastos_egresos_reportecxp($1,$2,$3,$4,$5,$6)",
      [
        data.id_branch ? data.id_branch : null,
        data.id_proveedor ? data.id_proveedor : null,
        data.llegada ? data.llegada : null,
        data.desde ? data.desde : null,
        data.hasta ? data.hasta : null,
        data.nro_operacion ? data.nro_operacion : null,
      ],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          if (!!rows[0].estadoflag) {
            resolve(rows);
          } else {
            rows = [];
            resolve(rows);
          }
        } else {
          rows = [];
          resolve(rows);
        }
      }
    );
  });
}
function getDebsToPayAdmin(data) {
  return new Promise((resolve, reject) => {
    pool.query(
      "select * from Table_InvoiceAdmin_reporte_cxp($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        data.id_branch ? data.id_branch : null,
        data.id_proveedor ? data.id_proveedor : null,
        data.llegada ? data.llegada : null,
        data.desde ? data.desde : null,
        data.hasta ? data.hasta : null,
        data.nro_expediente ? data.nro_expediente : null,
        data.id_gasto ? data.id_gasto : null,
        data.id_subgasto ? data.id_subgasto : null,
      ],
      (err, response) => {
        let rows = response.rows;
        if (!err) {
          if (!!rows[0].estadoflag) {
            resolve(rows);
          } else {
            rows = [];
            resolve(rows);
          }
        } else {
          rows = [];
          resolve(rows);
        }
      }
    );
  });
}

export const exportarPDFCXC = async (req: Request, res: Response) => {
  const { tipo_reporte: formato } = req.query;
  const ejs = require("ejs");
  const puppeteer = require("puppeteer");
  const path = require("path");
  const moment = require("moment");

  let title = "REPORTE DE CUENTAS POR COBRAR";
  let fechaEmision = moment().format("DD-MM-YYYY");
  let dataset = [];
  let header = await obtenerHeaderCXC(req.query);
  let rowsOp = await getReporteCXC(req.query);
  let rowsAdmin = await getReporteCXCAdmin(req.query);

  let filtro = [];

  if (header[0].cliente)
    filtro.push({ nombre: "Cliente", descripcion: header[0].cliente });
  if (header[0].desde)
    filtro.push({ nombre: "Desde", descripcion: header[0].desde });
  if (header[0].hasta)
    filtro.push({ nombre: "Hasta", descripcion: header[0].hasta });
  if (header[0].llegada)
    filtro.push({ nombre: "Llegada", descripcion: header[0].llegada });
  if (header[0].nro_expediente)
    filtro.push({
      nombre: "Nro Expediente",
      descripcion: header[0].nro_expediente,
    });
  if (header[0].ingreso)
    filtro.push({ nombre: "Ingreso", descripcion: header[0].ingreso });
  if (header[0].subingreso)
    filtro.push({ nombre: "Sub Ingreso", descripcion: header[0].subingreso });

  let totalvencidoObj_default = {
    "+60": null,
    "+45": null,
    "+30": null,
    "+15": null,
    "+7": null,
    "+0": null,
  };
  let totalxvencerObj_default = {
    "+60": null,
    "-60": null,
    "-45": null,
    "-30": null,
    "-15": null,
    "-7": null,
  };

  let totalvencidoObj = { ...totalvencidoObj_default };
  let totalxvencerObj = { ...totalxvencerObj_default };

  if (Array.isArray(rowsOp)) {
    rowsOp.forEach((element) => {
      element.details.forEach((detalle) => {
        dataset.push({
          fechavencimiento: detalle.fechadevencimiento
            ? moment(detalle.fechadevencimiento).format("DD/MM/YYYY")
            : "",
          esoperativo: true,
          esadministrativo: false,
          proveedor: detalle.nameconsigner,
          expediente: detalle.nro_master,
          id_consigner: detalle.id_consigner || 0,
          nameconsigner: detalle.nameconsigner,
          llegada: detalle.llegada == 1 ? "LLEGADA" : "NO LLEGADA",
          fecha_disponibilidad: detalle.fecha_disponibilidad
            ? moment(detalle.fecha_disponibilidad).format("DD/MM/YYYY")
            : "",
          factura: detalle.nro_factura || "N/F",
          symbol: detalle.symbol,
          total_pagar: detalle.total_pagar,
          diasatraso: detalle.diasatraso || 0,
          dias_credito: detalle.dias_credito || 0,
          dias_vencidos: detalle.dias_vencidos || 0,
          estatus: detalle.estatus || "",
        });
      });
    });
  }

  if (Array.isArray(rowsAdmin)) {
    rowsAdmin.forEach((element) => {
      element.details.forEach((detalle) => {
        dataset.push({
          fechavencimiento: detalle.fechavencimiento
            ? moment(detalle.fechavencimiento).format("DD/MM/YYYY")
            : "",
          esoperativo: false,
          esadministrativo: true,
          proveedor: detalle.nameconsigner,
          expediente: "",
          id_consigner: detalle.id_consigner || 0,
          nameconsigner: detalle.nameconsigner,
          llegada: detalle.llegada == 1 ? "LLEGADA" : "NO LLEGADA",
          fecha_disponibilidad: detalle.fecha
            ? moment(detalle.fecha).format("DD/MM/YYYY")
            : "",
          factura: detalle.concepto || "N/F",
          symbol: detalle.symbol,
          total_pagar: detalle.total_pagar,
          diasatraso: detalle.diasatraso || 0,
          dias_credito: detalle.dias_credito || 0,
          dias_vencidos: detalle.dias_vencidos || 0,
          estatus: detalle.estatus || "",
        });
      });
    });
  }

  dataset.filter((v) => {
    const { dias_vencidos, total_pagar: monto, estatus } = v;

    if (estatus.toUpperCase() == "VENCIDO") {
      if (dias_vencidos > 60)
        totalvencidoObj["+60"] = (totalvencidoObj["+60"] || 0) + monto;
      else if (dias_vencidos > 45)
        totalvencidoObj["+45"] = (totalvencidoObj["+45"] || 0) + monto;
      else if (dias_vencidos > 30)
        totalvencidoObj["+30"] = (totalvencidoObj["+30"] || 0) + monto;
      else if (dias_vencidos > 15)
        totalvencidoObj["+15"] = (totalvencidoObj["+15"] || 0) + monto;
      else if (dias_vencidos > 7)
        totalvencidoObj["+7"] = (totalvencidoObj["+7"] || 0) + monto;
      else if (dias_vencidos > 0)
        totalvencidoObj["+0"] = (totalvencidoObj["+0"] || 0) + monto;
    } else if (estatus.toUpperCase() == "POR VENCER") {
      if (dias_vencidos <= -60)
        totalxvencerObj["+60"] = (totalxvencerObj["+60"] || 0) + monto;
      else if (dias_vencidos <= -45)
        totalxvencerObj["-60"] = (totalxvencerObj["-60"] || 0) + monto;
      else if (dias_vencidos <= -30)
        totalxvencerObj["-45"] = (totalxvencerObj["-45"] || 0) + monto;
      else if (dias_vencidos <= -15)
        totalxvencerObj["-30"] = (totalxvencerObj["-30"] || 0) + monto;
      else if (dias_vencidos <= -7)
        totalxvencerObj["-15"] = (totalxvencerObj["-15"] || 0) + monto;
      else totalxvencerObj["-7"] = (totalxvencerObj["-7"] || 0) + monto;
    }
  });

  let totalvencido_array = Object.entries(totalvencidoObj).map(([k, v]) => [
    k,
    v ? v.toFixed(2) : null,
  ]);
  let totalxvencer_array = Object.entries(totalxvencerObj).map(([k, v]) => [
    k,
    v ? v.toFixed(2) : null,
  ]);
  let totalvencido = Object.values(totalvencidoObj)
    .reduce((s, v) => s + (v || 0), 0)
    .toFixed(2);
  let totalxvencer = Object.values(totalxvencerObj)
    .reduce((s, v) => s + (v || 0), 0)
    .toFixed(2);

  ejs.renderFile(
    path.join(__dirname, "../views/", "reporteCXC.ejs"),
    {
      filtro,
      title,
      formato,
      fechaEmision,
      data: dataset,
      totalvencido_array,
      totalxvencer_array,
      totalvencido,
      totalxvencer,
    },
    async (err, html) => {
      if (err) {
        res.send(err);
      } else {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        const buffer = await page.pdf({
          format: "A4",
          printBackground: true,
          landscape: true,
          margin: {
            top: "10mm",
            right: "10mm",
            bottom: "10mm",
            left: "10mm",
          },
        });

        await browser.close();
        res.setHeader("Content-Type", "application/pdf");
        res.status(200).send(buffer);
      }
    }
  );
};

// function_consolidado
export const ExportarConsolidadoCargaMasiva = async (
  req: Request,
  res: Response
) => {
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });

  let cabTitle = wb.createStyle({
    wrapText: true,
    font: {
      // color: "#FFE699",
      bold: true,
    },
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#FFE699",
    },
    alignment: {
      wrapText: true,
      vertical: "center",
      horizontal: "center",
    },
  });
  let cabTitle2 = wb.createStyle({
    wrapText: true,
    font: {
      // color: "#FFE699",
      bold: true,
    },
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#FFE699",
    },
    alignment: {
      wrapText: true,
      // vertical: "center",
      horizontal: "center",
    },
  });
  let cabDetalle = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#FFF2CC",
    },
    alignment: {
      vertical: "center",
      horizontal: "center",
    },
  });

  await pool.query(
    "SELECT * FROM function_consolidado_cargamasiva($1)",
    [req.query.id_mastercontrol],
    (err, response, fields) => {
      if (!err) {
        let views = [
          {
            state: "frozen",
            xSplit: 4,
            ySplit: 0,
          },
        ];
        let rows = response.rows;
        let nro_cuotas = rows[0].nro_cuotas;
        let cuotas = rows[0].cuotas;

        var wt = wb.addWorksheet("RESUMEN IMPORTADOR", {
          views: [{ state: "frozen", xSplit: 4, ySplit: 1 }],
        });
        for (let index = 0; index < nro_cuotas; index++) {
          wt.cell(1, 10 + index)
            .number(cuotas[index].porcentaje / 100)
            .style({
              numberFormat: "0.00%", // Establecer el formato de porcentaje
              font: {
                bold: true,
              },
            });
        }

        // ---------------------------------
        wt.cell(2, 8)
          .string("Totales")
          .style({
            font: {
              bold: true,
            },
          });
        wt.cell(2, 9)
          .formula(`=SUM(I3:I${rows.length + 4})`)
          .style({
            font: {
              bold: true,
            },
          });
        for (let index = 0; index < nro_cuotas; index++) {
          let col = getColumnLetter(10 + index);

          wt.cell(2, 10 + index)
            .formula(`=SUM(${col}3:${col}${rows.length + 4})`)
            .style({
              font: {
                bold: true,
              },
            });
        }

        // ---------------------------------

        let i = 1;
        wt.cell(3, 1).string("#").style(cabTitle);
        wt.cell(3, 2).string("NOMBRE DEL CLIENTE").style(cabTitle2);
        wt.cell(3, 3).string("DOCUMENTO").style(cabTitle);
        wt.cell(3, 4).string("TIPO DE CLIENTE (SENIOR/JUNIOR)").style(cabTitle);
        wt.cell(3, 5).string("DEPARTAMENTO").style(cabTitle);
        wt.cell(3, 6).string("DIRECCION DE ENTREGA").style(cabTitle);
        wt.cell(3, 7).string("NOMBRE PARA FACTURAR").style(cabTitle);
        wt.cell(3, 8).string("CANTIDAD SOLICITADA").style(cabTitle);
        wt.cell(3, 9).string("MONTO TOTAL").style(cabTitle);
        for (let index = 0; index < nro_cuotas; index++) {
          wt.cell(3, 10 + index)
            .string(`PAGO ${index + 1}`)
            .style(cabTitle);
          i++;
        }
        wt.cell(3, 9 + i)
          .string("TOTAL PAGO (FORMULA)")
          .style(cabTitle);
        wt.cell(3, 10 + i)
          .string("% PAGADO (FORMULA)")
          .style(cabTitle);
        wt.cell(3, 11 + i)
          .string("ESTADO (FORMULA)")
          .style(cabTitle);

        wt.column(1).setWidth(5);
        wt.column(2).setWidth(30);
        wt.column(3).setWidth(15);
        wt.column(4).setWidth(18);
        wt.column(5).setWidth(18);
        wt.column(6).setWidth(15);
        wt.column(7).setWidth(15);
        wt.column(8).setWidth(15);
        wt.column(9).setWidth(15);
        for (let index = 0; index < nro_cuotas; index++) {
          wt.column(10 + index).setWidth(15);
        }
        wt.column(9 + i).setWidth(15);
        wt.column(10 + i).setWidth(15);
        wt.column(11 + i).setWidth(15);

        // ------------------

        // ------------------

        let fila = 4;
        rows.forEach((element, index) => {
          wt.cell(fila, 1)
            .number(index + 1)
            .style(cabDetalle);
          wt.cell(fila, 2).string(element.namelong).style(cabDetalle);
          wt.cell(fila, 3).string(element.document).style(cabDetalle);
          wt.cell(fila, 4).string("").style(cabDetalle);
          wt.cell(fila, 8).number(
            element.cantidad ? parseInt(element.cantidad) : 0
          );
          wt.cell(fila, 9).number(
            element.total ? parseFloat(element.total) : parseFloat("0")
          );
          for (let index = 0; index < nro_cuotas; index++) {
            let col = getColumnLetter(10 + index);
            wt.cell(fila, 10 + index).formula(`=${col}1*I${fila}`);
          }
          // wt.cell(fila, 11).formula(`=K1*I${fila}`);
          // wt.cell(fila, 12).formula(`=L1*I${fila}`);

          fila++;
        });

        let pathexcel = path.join(
          `${__dirname}../../../uploads`,
          "Reportexls.xlsx"
        );
        wb.write(pathexcel, function (err, stats) {
          if (err) {
            console.log(err);
          } else {
            res.download(pathexcel);
          }
        });
      }
    }
  );
};

function getColumnLetter(columnNumber) {
  const A_CODE = 65; // El código ASCII de la letra 'A'
  const ALPHABET_LENGTH = 26; // El número de letras en el alfabeto

  let dividend = columnNumber;
  let columnName = "";

  while (dividend > 0) {
    const modulo = (dividend - 1) % ALPHABET_LENGTH;
    columnName = String.fromCharCode(A_CODE + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / ALPHABET_LENGTH);
  }

  return columnName;
}

export const exportListQuote = async (req: Request, res: Response) => {
  const ejs = require("ejs");
  const puppeteer = require("puppeteer");
  const path = require("path");
  const { id_branch, filtro } = req.body;
  req.setTimeout(0);

  await pool.query(
    "select * from TABLE_QUOTE_list($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      id_branch || null,
      filtro.id_marketing || null,
      filtro.id_status || null,
      filtro.id_entities || null,
      filtro.id_modality || null,
      filtro.id_shipment || null,
      filtro.id_incoterm || null,
      filtro.fechainicio || null,
      filtro.fechafin || null,
      filtro.estado || null,
    ],
    async (err, response) => {
      if (!err) {
        const rows = response.rows;
        const sucursal = rows[0]?.trade_name_sucursal || "";
        const countByStatus: any = {};

        rows.forEach((item) => {
          const status = item.status;
          if (!countByStatus[status]) {
            countByStatus[status] = { status, total: 0 };
          }
          countByStatus[status].total++;
        });

        const v_activos = [1, 2, 3, 4, 5, 6, 8, 9, 10, 14, 7];
        const v_inactivos = [15, 11, 13, 12];

        const countActivos = rows.filter(
          (item) =>
            v_activos.includes(item.status_code) &&
            item.aprobadoflag == false &&
            item.statusmain == 1
        ).length;

        const countInactivos = rows.filter(
          (item) =>
            (v_inactivos.includes(item.status_code) && item.statusmain == 1) ||
            (v_activos.includes(item.status_code) &&
              item.aprobadoflag &&
              item.statusmain == 1)
        ).length;

        const countEliminados = rows.filter((v) => v.statusmain == 0).length;

        const countByStatusArray = Object.values(countByStatus);
        const countByActivosArray = [
          { name: "Activo", total: countActivos },
          { name: "Inactivo", total: countInactivos },
          { name: "Eliminado", total: countEliminados },
        ];

        ejs.renderFile(
          path.join(__dirname, "../views/", "reporteListQuote.ejs"),
          { sucursal, countByStatusArray, countByActivosArray, rows },
          async (err: any, html: any) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error al renderizar el HTML");
            } else {
              const browser = await puppeteer.launch({ headless: "new" });
              const page = await browser.newPage();
              await page.setContent(html, { waitUntil: "networkidle0" });

              const buffer = await page.pdf({
                format: "A4",
                landscape: true,
                printBackground: true,
                margin: {
                  top: "10mm",
                  right: "10mm",
                  bottom: "10mm",
                  left: "10mm",
                },
              });

              await browser.close();
              res.setHeader("Content-Type", "application/pdf");
              res.status(200).send(buffer);
            }
          }
        );
      } else {
        res.status(500).send("Error al ejecutar la consulta");
      }
    }
  );
};

export const exportListQuoteEXCEL = async (req: Request, res: Response) => {
  let wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });
  let { id_branch, filtro } = req.body;
  const fechaYHora = new Date();
  req.setTimeout(0);

  await pool.query(
    "select * from TABLE_QUOTE_list($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      id_branch ? id_branch : null,
      filtro.id_marketing ? filtro.id_marketing : null,
      filtro.id_status ? filtro.id_status : null,
      filtro.id_entities ? filtro.id_entities : null,
      filtro.id_modality ? filtro.id_modality : null,
      filtro.id_shipment ? filtro.id_shipment : null,
      filtro.id_incoterm ? filtro.id_incoterm : null,
      filtro.fechainicio ? filtro.fechainicio : null,
      filtro.fechafin ? filtro.fechafin : null,
      filtro.estado ? filtro.estado : null,
    ],
    async (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        let cabDetalle = wb.createStyle({
          width: "auto",
          fill: {
            type: "pattern",
            patternType: "solid",
            fgColor: "#fff1cf",
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        });
        var wt = wb.addWorksheet(`Quote_${rows[0].trade_name_sucursal}`, {
          views: [{ state: "frozen", xSplit: 4, ySplit: 1 }],
        });

        wt.column(1).setWidth(17);
        wt.column(2).setWidth(18);
        wt.column(3).setWidth(10);
        wt.column(4).setWidth(50);
        wt.column(5).setWidth(16);
        wt.column(6).setWidth(12);
        wt.column(7).setWidth(15);
        wt.column(8).setWidth(8);
        wt.column(9).setWidth(20);
        wt.column(10).setWidth(20);
        wt.column(11).setWidth(18);
        wt.column(12).setWidth(12);

        wt.cell(1, 1).string("FECHA").style(cabDetalle);
        wt.cell(1, 2).string("ESTATUS").style(cabDetalle);
        wt.cell(1, 3).string("CÓD").style(cabDetalle);
        wt.cell(1, 4).string("CLIENTE").style(cabDetalle);
        wt.cell(1, 5).string("TELÉFONO").style(cabDetalle);
        wt.cell(1, 6).string("SENTIDO").style(cabDetalle);
        wt.cell(1, 7).string("TIPO CARGA").style(cabDetalle);
        wt.cell(1, 8).string("CCI").style(cabDetalle);
        wt.cell(1, 9).string("ORIGEN").style(cabDetalle);
        wt.cell(1, 10).string("DESTINO").style(cabDetalle);
        wt.cell(1, 11).string("VENDEDOR").style(cabDetalle);
        wt.cell(1, 12).string("ESTATUS").style(cabDetalle);
        let index = 2;
        wt.row(1).filter({
          firstColumn: 1,
          lastColumn: 12,
        });

        rows.forEach((element) => {
          wt.cell(index, 1).string(element.created);
          wt.cell(index, 2).string(element.status);
          wt.cell(index, 3).string(element.codigo);
          wt.cell(index, 4).string(element.nombres);
          wt.cell(index, 5).string(element.telefono);
          wt.cell(index, 6).string(element.sentido);
          wt.cell(index, 7).string(element.tipo_de_carga);
          wt.cell(index, 8).string(element.incoterms);
          wt.cell(index, 9).string(element.origen);
          wt.cell(index, 10).string(element.destino);
          wt.cell(index, 11).string(element.ejecutivo_ventas);
          wt.cell(index, 12).string(
            element.statusmain == 1 ? "Activo" : "Inactivo"
          );
          index++;
        });

        let pathexcel = path.join(
          `${__dirname}../../../uploads`,
          "Reportexls.xlsx"
        );
        wb.write(pathexcel, function (err, stats) {
          if (err) {
            console.log(err);
          } else {
            res.download(pathexcel);
          }
        });
      }
    }
  );
};

export const exportarListProveedor = async (req: Request, res: Response) => {
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });
  const {
    id_branch,
    correlativo,
    bussiness_name,
    id_document,
    id_pais,
    id_state,
    status,
    id_tipoproveedor,
  } = req.body;

  await pool.query(
    "SELECT * FROM function_table_entities_listproveedor($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      id_branch ? id_branch : null,
      correlativo ? correlativo : null,
      bussiness_name ? bussiness_name : null,
      id_document ? id_document : null,
      id_pais ? id_pais : null,
      id_state ? id_state : null,
      status ? status : null,
      id_tipoproveedor ? id_tipoproveedor : null,
    ],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        let cabDetalle = wb.createStyle({
          width: "auto",
          fill: {
            type: "pattern",
            patternType: "solid",
            fgColor: "#fff1cf",
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        });

        var wt = wb.addWorksheet(`Listado Proveedor`, {
          views: [{ state: "frozen", xSplit: 4, ySplit: 1 }],
        });

        wt.cell(1, 1).string("Cat").style(cabDetalle);
        wt.cell(1, 2).string("Correlativo").style(cabDetalle);
        wt.cell(1, 3).string("Documento").style(cabDetalle);
        wt.cell(1, 4)
          .string("Nombre Comercial/ Razón Social")
          .style(cabDetalle);
        wt.cell(1, 5).string("Tipo Proveedor").style(cabDetalle);
        wt.cell(1, 6).string("Ubigeo").style(cabDetalle);
        wt.cell(1, 7).string("Dirección").style(cabDetalle);
        wt.cell(1, 8).string("Estado").style(cabDetalle);

        let index = 2;
        wt.row(1).filter({
          firstColumn: 1,
          lastColumn: 8,
        });

        rows.forEach((element) => {
          wt.cell(index, 1).string("PROV");
          wt.cell(index, 2).string(element.correlativo);
          wt.cell(index, 3).string(
            (element.acronym_document ? element.acronym_document : "") +
              "-" +
              (element.document ? element.document : "")
          );
          wt.cell(index, 4).string(
            element.nombrecompleto ? element.nombrecompleto : ""
          );
          wt.cell(index, 5).string(
            element.tipo_proveedor ? element.tipo_proveedor : ""
          );
          wt.cell(index, 6).string(
            (element.pais ? element.pais : "") +
              "-" +
              (element.city ? element.city : "")
          );
          wt.cell(index, 7).string(element.address ? element.address : "");
          wt.cell(index, 8).string(element.estado ? element.estado : "");
          index++;
        });

        let pathexcel = path.join(
          `${__dirname}../../../uploads`,
          "Reportexls.xlsx"
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
export const exportarListCliente = async (req: Request, res: Response) => {
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });
  const {
    id_branch,
    correlativo,
    names,
    surname,
    second_surname,
    id_document,
    id_pais,
    id_state,
    status,
    id_tipoproveedor,
  } = req.body;

  await pool.query(
    "SELECT * FROM function_table_entities_listcliente($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      id_branch ? id_branch : null,
      correlativo ? correlativo : null,
      names ? names : null,
      surname ? surname : null,
      second_surname ? second_surname : null,
      id_document ? id_document : null,
      id_pais ? id_pais : null,
      id_state ? id_state : null,
      status ? status : null,
      id_tipoproveedor ? id_tipoproveedor : null,
    ],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        let cabDetalle = wb.createStyle({
          width: "auto",
          fill: {
            type: "pattern",
            patternType: "solid",
            fgColor: "#fff1cf",
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        });

        var wt = wb.addWorksheet(`Listado Proveedor`, {
          views: [{ state: "frozen", xSplit: 4, ySplit: 1 }],
        });

        wt.cell(1, 1).string("Cat").style(cabDetalle);
        wt.cell(1, 2).string("Correlativo").style(cabDetalle);
        wt.cell(1, 3).string("Documento").style(cabDetalle);
        wt.cell(1, 4).string("Ap. Paterno").style(cabDetalle);
        wt.cell(1, 5).string("Ap. Materno").style(cabDetalle);
        wt.cell(1, 6).string("Nombres").style(cabDetalle);
        wt.cell(1, 7).string("Ubigeo").style(cabDetalle);
        wt.cell(1, 8).string("Dirección").style(cabDetalle);
        wt.cell(1, 9).string("Estado").style(cabDetalle);

        let index = 2;
        wt.row(1).filter({
          firstColumn: 1,
          lastColumn: 8,
        });

        rows.forEach((element) => {
          wt.cell(index, 1).string("CLI");
          wt.cell(index, 2).string(element.correlativo);
          wt.cell(index, 3).string(element.documento);
          wt.cell(index, 4).string(element.surname);
          wt.cell(index, 5).string(element.second_surname);
          wt.cell(index, 6).string(element.names);
          wt.cell(index, 7).string(
            (element.pais ? element.pais : "") +
              "-" +
              (element.city ? element.city : "")
          );
          wt.cell(index, 8).string(element.address ? element.address : "");
          wt.cell(index, 9).string(element.estado ? element.estado : "");
          index++;
        });

        let pathexcel = path.join(
          `${__dirname}../../../uploads`,
          "Reportexls.xlsx"
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

export const exportListComentariosPredefinidos = async (
  req: Request,
  res: Response
) => {
  let { id_branch } = req.body;

  let wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });

  req.setTimeout(0);

  await pool.query(
    "SELECT * FROM table_comentarios_predefinidos_listar($1,NULL,NULL,NULL);",
    [id_branch ? id_branch : null],
    async (err, response, fields) => {
      if (!err) {
        const { rows } = response;

        let cabDetalle = wb.createStyle({
          width: "auto",
          fill: {
            type: "pattern",
            patternType: "solid",
            fgColor: "#343a40",
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
          font: {
            bold: true,
            color: "#FFFFFF",
          },
        });
        var wt = wb.addWorksheet(`LISTADO`, {
          views: [{ state: "frozen", xSplit: 4, ySplit: 1 }],
        });

        wt.column(1).setWidth(20);
        wt.column(2).setWidth(100);
        wt.column(3).setWidth(25);
        wt.column(4).setWidth(30);
        wt.column(5).setWidth(30);

        wt.cell(1, 1).string("CÓDIGO").style(cabDetalle);
        wt.cell(1, 2).string("COMENTARIO").style(cabDetalle);
        wt.cell(1, 3).string("ESTADO").style(cabDetalle);
        wt.cell(1, 4).string("CREACIÓN").style(cabDetalle);
        wt.cell(1, 5).string("ÚLTIMA ACTUALIZACIÓN").style(cabDetalle);

        let index = 2;
        wt.row(1).filter({
          firstColumn: 1,
          lastColumn: 5,
        });

        rows.forEach((item) => {
          wt.cell(index, 1).string(item.code);
          wt.cell(index, 2).string(item.comentario);
          wt.cell(index, 3).string(item.status == 1 ? "Activo" : "Inactivo");
          wt.cell(index, 4).string(item.created_at);
          wt.cell(index, 5).string(item.updated_at);

          index++;
        });

        let pathexcel = path.join(
          `${__dirname}../../../uploads`,
          "Reportexls.xlsx"
        );

        wb.write(pathexcel, function (err, stats) {
          if (err) {
            console.log(err);
          } else {
            res.download(pathexcel);
          }
        });
      }
    }
  );
};

async function obtenerHeaderCXC(data) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM filtro_invoiceadmincxc_reporteadmincxc($1,$2,$3,$4,$5,$6,$7);",
      [
        data.id_cliente ? data.id_cliente : null,
        data.fechadesde ? data.fechadesde : null,
        data.fechahasta ? data.fechahasta : null,
        data.llegadaflag ? data.llegadaflag : null,
        data.nro_expediente ? data.nro_expediente : null,
        data.id_ingreso ? data.id_ingreso : null,
        data.id_subingreso ? data.id_subingreso : null,
      ],
      (err, response) => {
        if (!err) {
          let rowsHeader = response.rows;
          if (!err) {
            resolve(rowsHeader);
          } else {
            rowsHeader = [];
            resolve(rowsHeader);
          }
        } else {
          console.log(err);
        }
      }
    );
  });
}
async function obtenerHeaderCXP(data) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM filtro_invoiceadmin_reporte_cxp($1,$2,$3,$4,$5,$6,$7);",
      [
        data.id_proveedor ? data.id_proveedor : null,
        data.desde ? data.desde : null,
        data.hasta ? data.hasta : null,
        data.llegada ? data.llegada : null,
        data.nro_expediente ? data.nro_expediente : null,
        data.id_gasto ? data.id_gasto : null,
        data.id_subgasto ? data.id_subgasto : null,
      ],
      (err, response) => {
        if (!err) {
          let rowsHeader = response.rows;
          if (!err) {
            resolve(rowsHeader);
          } else {
            rowsHeader = [];
            resolve(rowsHeader);
          }
        } else {
          console.log(err);
        }
      }
    );
  });
}
