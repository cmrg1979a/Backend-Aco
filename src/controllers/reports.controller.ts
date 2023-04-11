import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
// const ExcelJS = require("exceljs/dist/es5");
var xl = require("excel4node");

import path from "path";

export const getControlFileAll = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM reportFile_list();",
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
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();

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
      totalEgresoOp,
      totalEgreso,
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
    (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          page_size: "A4",
          orientation: "portrait",
          header: {
            height: "1mm",
          },
          footer: {
            height: "2mm",
          },
        };

        pdf
          .create(data, options)
          .toFile("files/INSTRUCTIVO.pdf", function (err: any, data: any) {
            if (err) {
              res.send(err);
            } else {
              res.download("/INSTRUCTIVO.pdf");
              res.send({
                msg: "File created successfully",
                path: path.join("/INSTRUCTIVO.pdf"),
              });
            }
          });
      }
    }
  );
};

export const pdfSolicitud = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();

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
  } = req.body;

  ejs.renderFile(
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
    },
    (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          page_size: "A4",
          orientation: "portrait",
          header: {
            height: "1mm",
          },
          footer: {
            height: "2mm",
          },
        };

        pdf
          .create(data, options)
          .toFile(
            "files/SOLICITUD_EXPEDIENTE_" +
              expediente +
              "_" +
              nameProveedor +
              "_" +
              number +
              ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download(
                  "/SOLICITUD_EXPEDIENTE_" +
                    expediente +
                    "_" +
                    nameProveedor +
                    "_" +
                    number +
                    ".pdf"
                );
                res.send({
                  msg: "File created successfully",
                  path: path.join(
                    "/SOLICITUD_EXPEDIENTE_" +
                      expediente +
                      "_" +
                      nameProveedor +
                      "_" +
                      number +
                      ".pdf"
                  ),
                });
              }
            }
          );
      }
    }
  );
};

export const createdPDF = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();
  
  const {
    idsentido,
    fecha_ini,
    fecha_fin,
    idOperador,
    idStatus,
    idStatusAdm,
    totalExpedientesMaster,
    totalExpedientesHouse,
    totalIA,
    totalEA,
    totalIM,
    totalEM,
    totalLL,
    totalPL,
    totalSS,
    totalPS,
    totales,
    sentidoletra,
    statusLetra,
  } = req.body;

  await pool.query(
    "SELECT * FROM reportFile_list2(null,$1,$2,$3,$4,$5);",
    [
      idOperador ? idOperador : null,
      idStatus ? idStatus : null,
      idStatusAdm ? idStatusAdm : null,
      fecha_ini ? fecha_ini : null,
      fecha_fin ? fecha_fin : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        // console.log(JSON.stringify(rows.datahouse));
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;
        let itemsHouse = [];
        rows.forEach((element) => {
          itemsHouse.push({
            dataHouse: element.datahouse,
            dataService: element.dataservice ? element.dataservice : [],
          });
        });
        // console.log(itemsHouse)
        ejs.renderFile(
          path.join(__dirname, "../views/", "report-template.ejs"),

          {
            items: itemsHouse,
            fecha_ini,
            fecha_fin,
            totalExpedientesMaster,
            totalExpedientesHouse,
            totalIA,
            totalEA,
            totalIM,
            totalEM,
            totalLL,
            totalPL,
            totalSS,
            totalPS,
            totales,
            fechaYHora,
            sentidoletra,
            statusLetra,
          },

          (err: any, data: any) => {
            if (err) {
              // res.send(err);
              console.log(err);
            } else {
              let options = {
                page_size: "A4",
                orientation: "landscape",
                header: {
                  height: "10mm",
                },
                footer: {
                  height: "10mm",
                },
              };

              pdf
                .create(data, options)
                .toFile(
                  "files/REPORT_CONTROL_FILE.pdf",
                  function (err: any, data: any) {
                    if (err) {
                      res.send(err);
                    } else {
                      res.download("/REPORT_CONTROL_FILE.pdf");
                      res.send({
                        msg: "File created successfully",
                        path: path.join("/REPORT_CONTROL_FILE.pdf"),
                      });
                    }
                  }
                );
            }
          }
        );
        //   new Promise<void>((resolver, rechazar) => {
        //     datanew.map((item: any) => {
        //       // console.log();
        //       pool.query(
        //         "SELECT * FROM HOUSE_SERVICES_LISTArxhouse($1)",
        //         [item.datahouse[0].id],
        //         (err, response, fields) => {
        //           let rows2 = response.rows;

        //           dataServiceList = JSON.parse(JSON.stringify(rows2));

        //           if (item.id_modality == 1) {
        //             dataServiceList.sort((a: any, b: any) => {
        //               if (a.id < b.id) {
        //                 return -1;
        //               }
        //               if (a.id > b.id) {
        //                 return 1;
        //               }
        //               return 0;
        //             });
        //           } else {
        //             dataServiceList.sort((a: any, b: any) => {
        //               if (a.id < b.id) {
        //                 return -1;
        //               }
        //               if (a.id > b.id) {
        //                 return 1;
        //               }
        //               return 0;
        //             });
        //           }
        //           let dataTes = [];
        //           let dataPre = [];
        //           dataTes.push(dataServiceList);
        //           dataPre.push({
        //             dataHouse: item.datahouse,
        //             dataService: dataTes,
        //           });

        //           req.app.locals.itemsHouse.push(dataPre[0]);
        //         }
        //         );
        //       });
        //       req.app.locals.itemsHouse = [];
        //       console.log(req.app.locals.itemsHouse)
        //     resolver();
        //   }).then(() => {
        //     setTimeout(() => {
        //       req.app.locals.itemsHouse.sort((a: any, b: any) => {
        //         if (
        //           a.dataHouse.fecha_disponibilidad <
        //           b.dataHouse.fecha_disponibilidad
        //         ) {
        //           return -1;
        //         }
        //         if (
        //           a.dataHouse.fecha_disponibilidad >
        //           b.dataHouse.fecha_disponibilidad
        //         ) {
        //           return 1;
        //         }
        //         return 0;
        //       });
        //       ejs.renderFile(
        //         path.join(__dirname, "../views/", "report-template.ejs"),

        //         {
        //           items: req.app.locals.itemsHouse,
        //           fecha_ini,
        //           fecha_fin,
        //           totalExpedientesMaster,
        //           totalExpedientesHouse,
        //           totalIA,
        //           totalEA,
        //           totalIM,
        //           totalEM,
        //           totalLL,
        //           totalPL,
        //           totalSS,
        //           totalPS,
        //           totales,
        //           fechaYHora,
        //           sentidoletra,
        //           statusLetra,
        //         },

        //         (err: any, data: any) => {
        //           if (err) {
        //             res.send(err);
        //           } else {
        //             let options = {
        //               page_size: "A4",
        //               orientation: "landscape",
        //               header: {
        //                 height: "10mm",
        //               },
        //               footer: {
        //                 height: "10mm",
        //               },
        //             };

        //             pdf
        //               .create(data, options)
        //               .toFile(
        //                 "files/REPORT_CONTROL_FILE.pdf",
        //                 function (err: any, data: any) {
        //                   if (err) {
        //                     res.send(err);
        //                   } else {
        //                     res.download("/REPORT_CONTROL_FILE.pdf");
        //                     res.send({
        //                       msg: "File created successfully",
        //                       path: path.join("/REPORT_CONTROL_FILE.pdf"),
        //                     });
        //                   }
        //                 }
        //               );
        //           }
        //         }
        //       );
        //     }, 10000);
        //   });
        // } else {
        //   console.log(err);
      }
    }
  );

  // var query = "";
  // query =
  //   "SELECT * FROM view_reportFile vr WHERE vr.id_modality LIKE ? and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? ";

  // if (fecha_ini != "") {
  //   query =
  //     "SELECT * FROM view_reportFile vr WHERE  vr.id_modality LIKE ?  and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? AND fecha_disponibilidad >= ? or fecha_disponibilidad = '0000-00-00'";
  // }

  // if (fecha_fin != "") {
  //   query =
  //     "SELECT * FROM view_reportFile vr WHERE vr.id_modality LIKE ? and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? and fecha_disponibilidad <= ? or fecha_disponibilidad = '0000-00-00'";
  // }

  // if (fecha_ini != "" && fecha_fin != "") {
  //   query =
  //     "SELECT * FROM view_reportFile vr WHERE vr.id_modality LIKE ? and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? AND fecha_disponibilidad >= ? and fecha_disponibilidad <= ? or fecha_disponibilidad = '0000-00-00'";
  // }
  // SELECT * FROM HOUSE_SERVICES_LISTArxhouse($1)
  // conn.query(
  //   query,
  //   [idsentido, idOperador, idStatus, idStatusAdm, fecha_ini, fecha_fin],
  //   (err, rows, fields) => {
  //     if (!err) {
  //       let datanew = JSON.parse(JSON.stringify(rows));
  //       let dataServiceList;
  //       new Promise<void>((resolver, rechazar) => {
  //         datanew.map((item: any) => {
  //           conn.query(
  //             "SELECT * FROM view_houseService where id_house = ? order by id desc",
  //             [item.id],
  //             (err, rows, fields) => {
  //               dataServiceList = JSON.parse(JSON.stringify(rows));
  //               if (item.id_modality == 1) {
  //                 dataServiceList.sort((a: any, b: any) => {
  //                   if (a.id < b.id) {
  //                     return -1;
  //                   }
  //                   if (a.id > b.id) {
  //                     return 1;
  //                   }
  //                   return 0;
  //                 });
  //               } else {
  //                 dataServiceList.sort((a: any, b: any) => {
  //                   if (a.id < b.id) {
  //                     return -1;
  //                   }
  //                   if (a.id > b.id) {
  //                     return 1;
  //                   }
  //                   return 0;
  //                 });
  //               }
  //               let dataTes = [];
  //               let dataPre = [];
  //               dataTes.push(dataServiceList);
  //               dataPre.push({
  //                 dataHouse: item,
  //                 dataService: dataTes,
  //               });
  //               req.app.locals.itemsHouse.push(dataPre[0]);
  //             }
  //           );
  //         });
  //         req.app.locals.itemsHouse = [];
  //         resolver();
  //         console.log(resolver);
  //       }).then(() => {
  //         setTimeout(() => {
  //           //var data = JSON.parse(JSON.stringify(req.app.locals.itemsHoused));
  //           req.app.locals.itemsHouse.sort((a: any, b: any) => {
  //             if (
  //               a.dataHouse.fecha_disponibilidad <
  //               b.dataHouse.fecha_disponibilidad
  //             ) {
  //               return -1;
  //             }
  //             if (
  //               a.dataHouse.fecha_disponibilidad >
  //               b.dataHouse.fecha_disponibilidad
  //             ) {
  //               return 1;
  //             }
  //             return 0;
  //           });
  //           ejs.renderFile(
  //             path.join(__dirname, "../views/", "report-template.ejs"),

  //             {
  //               items: req.app.locals.itemsHouse,
  //               fecha_ini,
  //               fecha_fin,
  //               totalExpedientesMaster,
  //               totalExpedientesHouse,
  //               totalIA,
  //               totalEA,
  //               totalIM,
  //               totalEM,
  //               totalLL,
  //               totalPL,
  //               totalSS,
  //               totalPS,
  //               totales,
  //               fechaYHora,
  //               sentidoletra,
  //               statusLetra,
  //             },

  //             (err: any, data: any) => {
  //               if (err) {
  //                 res.send(err);
  //               } else {
  //                 let options = {
  //                   page_size: "A4",
  //                   orientation: "landscape",
  //                   header: {
  //                     height: "10mm",
  //                   },
  //                   footer: {
  //                     height: "10mm",
  //                   },
  //                 };

  //                 pdf
  //                   .create(data, options)
  //                   .toFile(
  //                     "files/REPORT_CONTROL_FILE.pdf",
  //                     function (err: any, data: any) {
  //                       if (err) {
  //                         res.send(err);
  //                       } else {
  //                         res.download("/REPORT_CONTROL_FILE.pdf");
  //                         res.send({
  //                           msg: "File created successfully",
  //                           path: path.join("/REPORT_CONTROL_FILE.pdf"),
  //                         });
  //                       }
  //                     }
  //                   );
  //               }
  //             }
  //           );
  //         }, 10000);
  //       });
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // );
};

export const test = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  let students = [
    { name: "Joy", email: "joy@example.com", city: "New York", country: "USA" },
    {
      name: "John",
      email: "John@example.com",
      city: "San Francisco",
      country: "USA",
    },
    {
      name: "Clark",
      email: "Clark@example.com",
      city: "Seattle",
      country: "USA",
    },
    {
      name: "Watson",
      email: "Watson@example.com",
      city: "Boston",
      country: "USA",
    },
    {
      name: "Tony",
      email: "Tony@example.com",
      city: "Los Angels",
      country: "USA",
    },
  ];

  ejs.renderFile(
    path.join(__dirname, "../views/", "report-template.ejs"),
    { students: students },
    (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          page_size: "A4",
          orientation: "landscape",
          header: {
            height: "20mm",
          },
          footer: {
            height: "20mm",
          },
          footerTemplate: "<h1>{{totalPages}} </h1>",
        };
        pdf
          .create(data, options)
          .toFile("report.pdf", function (err: any, data: any) {
            if (err) {
              res.send(err);
            } else {
              res.send("File created successfully");
            }
          });
      }
    }
  );
};

export const getReportFileDetails = async (req: Request, res: Response) => {
  const { dateDesde, dateHasta } = req.body;
  // se a movido la función existe una copia llamada totales_pagados_orders_old revisarla en caso se quiera revetir
  await pool.query(
    "SELECT * FROM totales_pagados_orders($1,$2)",
    [dateDesde, dateHasta],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
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

// export const getReportFileDetails = async (req: Request, res: Response) => {
//   const { dateDesde, dateHasta } = req.body;

//   await conn.query(
//     `SELECT vhl.*, vt.total_abonado, ROUND((vhl.montoIngreso - if(vt.total_abonado is null,0,vt.total_abonado)),2) as porCobrar, ve.monto as montoEgreso, (vhl.montoIngreso - ve.monto) as ganancia_global, ROUND((ve.monto - if(vp.montoPagado is null,0,vp.montoPagado)),2) as porPagar FROM view_houseListAll vhl left outer join view_tAbonado vt on vhl.id = vt.id_house left outer join view_totalesEgresos ve on vhl.id = ve.id_house left outer join view_totalesPagados vp on vhl.id = vp.id_house where vhl.fecha_disponibilidad >= '${dateDesde}' and vhl.fecha_disponibilidad <= '${dateHasta}' `,
//     (err, rows, fields) => {
//       if (!err) {
//         let datanew = JSON.parse(JSON.stringify(rows));
//         let dataServiceList;

//         new Promise<void>((resolver, rechazar) => {
//           datanew.map((item: any) => {
//             conn.query(
//               `SELECT ce.*, (SELECT vtp.total_pr FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) AS total_pr , (SELECT vtp.total_op FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) AS total_op, (SELECT SUM(total_op) FROM view_costosEgresos vce WHERE vce.pagado = 1 AND vce.id_orders = ce.id_orders AND vce.id_proveedor  = ce.id_proveedor) AS total_pagado, (SELECT vtp.docs FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) AS docs, (SELECT vtp.solicitudes FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) AS solicitudes, ((SELECT vtp.total_p FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) - IF(((SELECT SUM(total_p) FROM view_costosEgresos vce WHERE vce.pagado = 1 AND vce.id_orders = ce.id_orders AND vce.id_proveedor  = ce.id_proveedor)) IS NULL, 0, ((SELECT SUM(total_p) FROM view_costosEgresos vce WHERE vce.pagado = 1 AND vce.id_orders = ce.id_orders AND vce.id_proveedor  = ce.id_proveedor)))) as restante, (SELECT vli.type_pago FROM view_listInvoice vli WHERE vli.id_house = ce.id_house AND vli.id_proveedor = ce.id_proveedor LIMIT 1) AS type_pago FROM view_costosEgresos ce where ce.id_house = ${item.id} GROUP BY ce.id_orders, id_proveedor `,
//               [item.id],
//               (err, rows, fields) => {
//                 dataServiceList = JSON.parse(JSON.stringify(rows));
//                 let dataTes = [];
//                 let dataPre = [];
//                 dataTes.push(dataServiceList);
//                 dataPre.push({
//                   value: item.value,
//                   conteo: item.conteo,
//                   id_modality: item.id_modality,
//                   nro_master: item.nro_master,
//                   id_shipment: item.id_shipment,
//                   statusLock: item.statusLock,
//                   dateLock: item.dateLock,
//                   statusLockLetra: item.statusLockLetra,
//                   statusLockAdm: item.statusLockAdm,
//                   dateLockAdm: item.dateLockAdm,
//                   statusLockLetraAdm: item.statusLockLetraAdm,
//                   ganancia_pricing: item.ganancia_pricing,
//                   ganancia_operaciones: item.ganancia_operaciones,
//                   fecha_eta: item.fecha_eta,
//                   fecha_etd: item.fecha_etd,
//                   fecha_disponibilidad: item.fecha_disponibilidad,
//                   fecha_disponibilidad_letra: item.fecha_disponibilidad_letra,
//                   id_operador: item.id_operador,
//                   id_incoterms: item.id_incoterms,
//                   id_port_begin: item.id_port_begin,
//                   id_port_end: item.id_port_end,
//                   id: item.id,
//                   id_master: item.id_master,
//                   nro_house: item.nro_house,
//                   code_house: item.code_house,
//                   id_cot: item.id_cot,
//                   id_agent: item.id_agent,
//                   id_consigner: item.id_consigner,
//                   id_notify: item.id_notify,
//                   id_aerolinea: item.id_aerolinea,
//                   nro_hbl: item.nro_hbl,
//                   id_motonave: item.id_motonave,
//                   nameOperador: item.nameOperador,
//                   id_coloader: item.id_coloader,
//                   id_naviera: item.id_naviera,
//                   nro_viaje: item.nro_viaje,
//                   bultos: item.bultos,
//                   peso: item.peso,
//                   volumen: item.volumen,
//                   id_conditions: item.id_conditions,
//                   id_moneda: item.id_moneda,
//                   monto: item.monto,
//                   cant_pagado: item.cant_pagado,
//                   cant_pagar: item.cant_pagar,
//                   pagadode: item.pagadode,
//                   porcentaje_pagado: item.porcentaje_pagado,
//                   status: item.status,
//                   created_at: item.created_at,
//                   updated_at: item.updated_at,
//                   nameShipment: item.nameShipment,
//                   nameAgent: item.nameAgent,
//                   nameConsigner: item.nameConsigner,
//                   documentLong: item.documentLong,
//                   nameNotify: item.nameNotify,
//                   code_master: item.code_master,
//                   namePortBegin: item.namePortBegin,
//                   namePortEnd: item.namePortEnd,
//                   nameModality: item.nameModality,
//                   montoIngreso: item.montoIngreso,
//                   total_abonado: item.total_abonado,
//                   porCobrar: item.porCobrar,
//                   total_p: item.total_p,
//                   type_total: item.type_total,
//                   porPagar: item.porPagar,
//                   ganancia_global: item.ganancia_global,
//                   dataEgresos: dataTes[0],
//                 });
//                 req.app.locals.itemsHouse.push(dataPre[0]);
//                 req.app.locals.itemsHouse.sort((a: any, b: any) => {
//                   if (a.fecha_disponibilidad > b.fecha_disponibilidad) {
//                     return -1;
//                   }
//                   if (a.fecha_disponibilidad < b.fecha_disponibilidad) {
//                     return 1;
//                   }
//                   return 0;
//                 });
//               }
//             );
//           });

//           req.app.locals.itemsHouse = [];
//           resolver();
//           console.log(resolver);
//         }).then(() => {
//           setTimeout(() => {
//             res.json({
//               status: 200,
//               statusBol: true,
//               data: req.app.locals.itemsHouse,
//             });

//           }, 50000);
//         });
//       } else {
//         console.log(err);
//       }
//     }
//   );
// };

export const pdfFD = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();

  const {
    itemsDetails,
    fecha,
    expedientes,
    ganancia,
    cobrado,
    porcobrar,
    porPagar,
    dateDesde,
    dateHasta,
  } = req.body;
  try {
    ejs.renderFile(
      path.join(__dirname, "../views/", "pdf-fileDetails.ejs"),
      // path.join(__dirname, "../views/", "pdf-fileDetails.ejs"),
      {
        itemsDetails,
        fecha,
        expedientes,
        ganancia,
        cobrado,
        porcobrar,
        porPagar,
        fechaYHora,
        dateDesde,
        dateHasta,
      },
      (err: any, data: any) => {
        if (err) {
          res.send(err);
        } else {
          let options = {
            page_size: "A4",
            orientation: "landscape",
            header: {
              height: "15mm",
            },
            footer: {
              height: "15mm",
            },
          };

          pdf
            .create(data, options)
            .toFile(
              "files/REPORTE_FILES_DETALLADO_" + fecha + ".pdf",
              function (err: any, data: any) {
                if (err) {
                  res.send(err);
                } else {
                  res.download("/REPORTE_FILES_DETALLADO_" + fecha + ".pdf");
                  res.send({
                    msg: "File created successfully",
                    path: path.join(
                      "/REPORTE_FILES_DETALLADO_" + fecha + ".pdf"
                    ),
                  });
                }
              }
            );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const constRexportCXPExcel = async (req: Request, res: Response) => {
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });
  await pool.query(
    "select * from controlgastos_egresos_reportecxp(1)",
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        new Promise<void>((resolver, rechazar) => {
          pool.query(
            "select * from Table_InvoiceAdmin_reporte_cxp(1)",
            (err, response, fields) => {
              if (!err) {
                let rows2 = response.rows;

                /**
                 * ESTILOS
                 */
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
                /** AGREGANDO HOJAS */
                var wt = wb.addWorksheet("TOTALES");
                var ws = wb.addWorksheet("Operativa");
                var wa = wb.addWorksheet("Administrativa");
                /** ANCHO COLUMNAS */
                ws.column(1).setWidth(60);
                ws.column(3).setWidth(60);
                ws.column(4).setWidth(40);
                ws.row(2).filter();
                // -------------------------
                wa.column(1).setWidth(60);
                wa.row(2).filter();
                /** ------- REPORTE OPERATIVO ---------- */
                /** ELIMINAR REPETIDOS */
                let data = [];
                rows.forEach((element) => {
                  let detalles = [];
                  let restante_llegada = 0.0;
                  let restante_no_llegada = 0.0;
                  let restante_pagar = 0.0;

                  element.details.forEach((element2) => {
                    if (
                      detalles.filter(
                        (v) =>
                          v.id_control == element2.id_control &&
                          v.id_house == element2.id_house &&
                          v.id_master == element2.id_master &&
                          v.id_orders == element2.id_orders &&
                          v.id_proveedor == element2.id_proveedor &&
                          v.total_pagar == element2.total_pagar &&
                          v.id_house == element2.id_house
                      ).length == 0
                    ) {
                      detalles.push(element2);
                      if (element2.llegada == 1) {
                        restante_llegada += parseFloat(element2.total_pagar);
                      }
                      if (element2.llegada == 0) {
                        restante_no_llegada += parseFloat(element2.total_pagar);
                      }
                      restante_pagar += parseFloat(element2.total_pagar);
                    }
                  });
                  element.details = detalles;
                  element.restante_llegada = restante_llegada;
                  element.restante_no_llegada = restante_no_llegada;
                  element.restante_pagar = restante_pagar;

                  data.push(element);
                });

                /** LLEANDO DE DATOS */

                ws.cell(1, 1, 1, 7, true)
                  .string("REPORTE DE CUENTAS POR PAGAR")
                  .style(cabTitle);
                let fila = 2;
                ws.cell(fila, 1).string("Proveedor").style(cabDetalle);
                ws.cell(fila, 2).string("Expediente").style(cabDetalle);
                ws.cell(fila, 3).string("Cliente").style(cabDetalle);
                ws.cell(fila, 4).string("Factura").style(cabDetalle);
                ws.cell(fila, 5)
                  .string("Fecha Disponibilidad")
                  .style(cabDetalle);
                ws.cell(fila, 6).string("Moneda").style(cabDetalle);
                ws.cell(fila, 7).string("Total Pagar").style(cabDetalle);
                ws.cell(fila, 8).string("Estatus").style(cabDetalle);
                ws.cell(fila, 9).string("Pagado Cliente").style(cabDetalle);
                fila++;

                data.forEach((element) => {
                  element.details.forEach((element2) => {
                    ws.cell(fila, 1).string(element.nameproveedor + "");
                    ws.cell(fila, 2).string(element2.nro_master + "");
                    element2.nameconsigner
                      ? ws.cell(fila, 3).string(element2.nameconsigner)
                      : ws.cell(fila, 3).string("");
                    ws.cell(fila, 4).string(element2.expedientes);
                    ws.cell(fila, 5).date(element2.fecha_disponibilidad);
                    ws.cell(fila, 6).string(element2.symbol);
                    ws.cell(fila, 7).number(element2.total_pagar);
                    ws.cell(fila, 8).string(
                      element2.llegada == 1 ? "LLEGADA" : "NO LLEGADA"
                    );
                    ws.cell(fila, 9).string(element2.pagado == 1 ? "SI" : "NO");
                    fila++;
                  });
                });
                /** ------- REPORTE ADMINISTRATIVO ---------- */
                wa.cell(1, 1, 1, 9, true)
                  .string("REPORTE DE CUENTAS POR PAGAR ADMINISTRATIVAS")
                  .style(cabTitle);
                let filaA = 2;

                wa.cell(filaA, 1).string("Proveedor").style(cabDetalle);
                wa.cell(filaA, 2).string("N° Factura").style(cabDetalle);
                wa.cell(filaA, 3).string("Fecha").style(cabDetalle);
                wa.cell(filaA, 4).string("Moneda").style(cabDetalle);
                wa.cell(filaA, 5).string("Monto").style(cabDetalle);
                wa.cell(filaA, 6).string("Moneda").style(cabDetalle);
                wa.cell(filaA, 7).string("IGV").style(cabDetalle);
                wa.cell(filaA, 8).string("Moneda").style(cabDetalle);
                wa.cell(filaA, 9).string("Total").style(cabDetalle);
                filaA++;
                rows2.forEach((element) => {
                  element.details.forEach((element2) => {
                    // console.log(element2);
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
                /** ------- REPORTE TOTAL ---------- */
                let totalOp = calcularTotalesOp(data);
                let totalAdmin = calcularTotalesAdm(rows2);

                wt.cell(1, 1, 1, 9, true)
                  .string("REPORTE TOTALES")
                  .style(cabTitle);
                wt.cell(2, 1, 2, 4, true)
                  .string("TOTAL OPERATIVO")
                  .style(cabLlegada);
                wt.cell(2, 6, 2, 9, true)
                  .string("TOTAL ADMINISTRATIVO")
                  .style(cabLlegada);
                wt.cell(3, 1).string("Operativo").style(cabNoLlegada);
                wt.cell(3, 2).string("Llegadas").style(cabNoLlegada);
                wt.cell(3, 3).string("No llegadas").style(cabNoLlegada);
                wt.cell(3, 4).string("Total").style(cabNoLlegada);
                wt.cell(3, 6).string("Administrativo").style(cabNoLlegada);
                wt.cell(3, 7).string("Monto").style(cabNoLlegada);
                wt.cell(3, 8).string("IGV").style(cabNoLlegada);
                wt.cell(3, 9).string("Total").style(cabNoLlegada);
                wt.cell(4, 1).string(totalOp[0].moneda);
                wt.cell(4, 2).string(parseFloat(totalOp[0].llegada).toFixed(2));
                wt.cell(4, 3).string(
                  parseFloat(totalOp[0].no_llegada).toFixed(2)
                );
                wt.cell(4, 4).string(parseFloat(totalOp[0].total).toFixed(2));
                wt.cell(5, 1).string(totalOp[1].moneda);
                wt.cell(5, 2).string(parseFloat(totalOp[1].llegada).toFixed(2));
                wt.cell(5, 3).string(
                  parseFloat(totalOp[1].no_llegada).toFixed(2)
                );
                wt.cell(5, 4).string(parseFloat(totalOp[1].total).toFixed(2));
                wt.cell(4, 6).string(totalAdmin[0].moneda);
                wt.cell(4, 7).string(
                  parseFloat(totalAdmin[0].monto).toFixed(2)
                );
                wt.cell(4, 8).string(parseFloat(totalAdmin[0].igv).toFixed(2));
                wt.cell(4, 9).string(
                  parseFloat(totalAdmin[0].total).toFixed(2)
                );
                wt.cell(5, 6).string(totalAdmin[1].moneda);
                wt.cell(5, 7).string(
                  parseFloat(totalAdmin[1].monto).toFixed(2)
                );
                wt.cell(5, 8).string(parseFloat(totalAdmin[1].igv).toFixed(2));
                wt.cell(5, 9).string(
                  parseFloat(totalAdmin[1].total).toFixed(2)
                );
                /* CREACION DE EXCEL*/
                let pathexcel = path.join(
                  // "C:\\laragon\\www\\api-backend-general-v1\\uploads",
                  // `${process.env.RUTA_FILE}/uploads`,
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
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const constReporteCXCExcel = async (req: Request, res: Response) => {
  var wb = new xl.Workbook({
    dateFormat: "dd/mm/yyyy",
    author: "PIC CARGO - IMPORTADORES",
  });
  await pool.query(
    "select * from DEBSCLIENT_reportecxc(1)",
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        new Promise<void>((resolver, rechazar) => {
          pool.query(
            "select * from TABLE_INVOICEADMINCXC_reporteadmincxc(1)",
            (err, response, fields) => {
              if (!err) {
                let rows2 = response.rows;

                /**
                 * ESTILOS
                 */
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
                /** AGREGANDO HOJAS */
                var wt = wb.addWorksheet("TOTALES");
                var ws = wb.addWorksheet("Operativa");
                var wa = wb.addWorksheet("Administrativa");

                /** LLEANDO DE DATOS */

                ws.cell(1, 1, 1, 6, true)
                  .string("REPORTE DE CUENTAS POR COBRAR")
                  .style(cabTitle);
                let fila = 2;

                ws.cell(fila, 1).string("Expediente").style(cabDetalle);
                ws.cell(fila, 2).string("Cliente").style(cabDetalle);
                ws.cell(fila, 3)
                  .string("Fecha Disponibilidad")
                  .style(cabDetalle);
                ws.cell(fila, 4).string("Moneda").style(cabDetalle);
                ws.cell(fila, 5).string("Total Pagar").style(cabDetalle);
                ws.cell(fila, 6).string("Estatus").style(cabDetalle);
                ws.row(fila).filter();
                ws.column(2).setWidth(60);
                fila++;

                rows.forEach((element) => {
                  element.details.forEach((element2) => {
                    ws.cell(fila, 1).string(element2.nro_master);
                    ws.cell(fila, 2).string(element2.nameconsigner);
                    if (element2.fecha_disponibilidad) {
                      ws.cell(fila, 3).date(element2.fecha_disponibilidad);
                    } else {
                      ws.cell(fila, 3).string("");
                    }
                    ws.cell(fila, 4).string(element2.symbol);
                    ws.cell(fila, 5).number(element2.total_pagar);
                    ws.cell(fila, 6).string(
                      element2.llegada == 1 ? "LLEGADA" : "NO LLEGADA"
                    );
                    fila++;
                  });
                });
                /** ------- REPORTE ADMINISTRATIVO ---------- */
                wa.cell(1, 1, 1, 7, true)
                  .string("REPORTE DE CUENTAS POR COBRAR ADMINISTRATIVAS")
                  .style(cabTitle);
                let filaA = 2;
                // wa.cell(filaA, 1, filaA, 3, true)
                //   .string("CLIENTE")
                //   .style(cabProveedor);
                // wa.cell(filaA, 4).string("TOTAL").style(cabProveedor);

                wa.cell(filaA, 1).string("Cliente").style(cabDetalle);
                wa.cell(filaA, 2).string("Fecha").style(cabDetalle);
                wa.cell(filaA, 3).string("Documento").style(cabDetalle);
                wa.cell(filaA, 4).string("Moneda").style(cabDetalle);
                wa.cell(filaA, 5).string("Monto Inicial").style(cabDetalle);
                wa.cell(filaA, 6).string("Moneda").style(cabDetalle);
                wa.cell(filaA, 7).string("Deuda Actual").style(cabDetalle);
                wa.row(filaA).filter();
                wa.column(1).setWidth(60);
                filaA++;

                rows2.forEach((element) => {
                  element.details.forEach((element2) => {
                    console.log(element2);
                    wa.cell(filaA, 1).string(element2.nameconsigner);
                    wa.cell(filaA, 2).date(element2.fecha);
                    wa.cell(filaA, 3).string(element2.concepto);
                    wa.cell(filaA, 4).string(element2.symbol);
                    wa.cell(filaA, 5).number(element2.monto);
                    wa.cell(filaA, 6).string(element2.symbol);
                    wa.cell(filaA, 7).number(element2.total_pagar);
                    filaA++;
                  });
                });
                /** ------- REPORTE TOTAL ---------- */

                let totalOp = calcularTotalesOpCxC(rows);
                let totalAdmin = calcularTotalesAdmCxC(rows2);
                wt.cell(1, 1, 1, 9, true)
                  .string("REPORTE TOTALES")
                  .style(cabTitle);
                wt.cell(2, 1, 2, 4, true)
                  .string("TOTAL OPERATIVO")
                  .style(cabLlegada);
                wt.cell(2, 6, 2, 9, true)
                  .string("TOTAL ADMINISTRATIVO")
                  .style(cabLlegada);
                wt.cell(3, 1).string("Operativo").style(cabNoLlegada);
                wt.cell(3, 2).string("Llegadas").style(cabNoLlegada);
                wt.cell(3, 3).string("No llegadas").style(cabNoLlegada);
                wt.cell(3, 4).string("Total").style(cabNoLlegada);
                wt.cell(3, 6).string("Administrativo").style(cabNoLlegada);
                wt.cell(3, 7).string("Monto").style(cabNoLlegada);
                wt.cell(3, 8).string("IGV").style(cabNoLlegada);
                wt.cell(3, 9).string("Total").style(cabNoLlegada);
                wt.cell(4, 1).string(totalOp[0].moneda);
                wt.cell(4, 2).string(parseFloat(totalOp[0].llegada).toFixed(2));
                wt.cell(4, 3).string(
                  parseFloat(totalOp[0].no_llegada).toFixed(2)
                );
                wt.cell(4, 4).string(parseFloat(totalOp[0].total).toFixed(2));
                wt.cell(5, 1).string(totalOp[1].moneda);
                wt.cell(5, 2).string(parseFloat(totalOp[1].llegada).toFixed(2));
                wt.cell(5, 3).string(
                  parseFloat(totalOp[1].no_llegada).toFixed(2)
                );
                wt.cell(5, 4).string(parseFloat(totalOp[1].total).toFixed(2));
                wt.cell(4, 6).string(totalAdmin[0].moneda);
                wt.cell(4, 7).string(
                  parseFloat(totalAdmin[0].monto).toFixed(2)
                );
                wt.cell(4, 8).string(parseFloat(totalAdmin[0].igv).toFixed(2));
                wt.cell(4, 9).string(
                  parseFloat(totalAdmin[0].total).toFixed(2)
                );
                wt.cell(5, 6).string(totalAdmin[1].moneda);
                wt.cell(5, 7).string(
                  parseFloat(totalAdmin[1].monto).toFixed(2)
                );
                wt.cell(5, 8).string(parseFloat(totalAdmin[1].igv).toFixed(2));
                wt.cell(5, 9).string(
                  parseFloat(totalAdmin[1].total).toFixed(2)
                );
                // -------------------------------------------
                let pathexcel = path.join(
                  // console.log(),
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
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getPdfInstructivoDetallado = async (
  req: Request,
  res: Response
) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");

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
      (err: any, data: any) => {
        if (err) {
          res.send(err);
        } else {
          let options = {
            page_size: "A4",
            orientation: "portrait",
            header: {
              height: "1mm",
            },
            footer: {
              height: "2mm",
            },
          };

          pdf
            .create(data, options)
            .toFile(
              "files/INSTRUCTIVO_DETALLADO.pdf",
              function (err: any, data: any) {
                if (err) {
                  res.send(err);
                } else {
                  res.download("INSTRUCTIVO_DETALLADO.pdf");
                  res.send({
                    msg: "File created successfully",
                    path: path.join("INSTRUCTIVO_DETALLADO.pdf"),
                  });
                }
              }
            );
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// ----------------------------------------
function calcularTotalesOp(data) {
  let totalOperativo = [];
  let totalNoLlegadaDolares = 0;
  let totalLlegadaDolares = 0;
  let totalDolares = 0;

  let totalLlegadaSoles = 0;
  let totalNoLlegadaSoles = 0;
  let totalSoles = 0;
  data.forEach((element) => {
    element.details.forEach((element2) => {
      switch (element2.symbol) {
        case "USD":
          if (element2.llegada == 0) {
            totalNoLlegadaDolares += parseFloat(element2.total_pagar);
            totalDolares += parseFloat(element2.total_pagar);
          }
          if (element2.llegada == 1) {
            totalLlegadaDolares += parseFloat(element2.total_pagar);
            totalDolares += parseFloat(element2.total_pagar);
          }
          break;
        case "S/.":
          if (element2.llegada == 0) {
            totalNoLlegadaSoles += parseFloat(element2.total_pagar);
            totalSoles += parseFloat(element2.total_pagar);
          }
          if (element2.llegada == 1) {
            totalLlegadaSoles += parseFloat(element2.total_pagar);
            totalSoles += parseFloat(element2.total_pagar);
          }
          break;

        default:
          break;
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
      moneda: "SOL",
      llegada: totalLlegadaSoles,
      no_llegada: totalNoLlegadaSoles,
      total: totalSoles,
    }
  );
  return totalOperativo;
}

function calcularTotalesAdm(data) {
  let totalAdministrativo = [];
  let totalMontoDolares = 0;
  let IgvDolares = 0;
  let totalDolares = 0;

  let totalMontoSoles = 0;
  let IgvSoles = 0;
  let totalSoles = 0;
  data.forEach((element) => {
    element.details.forEach((element2) => {
      switch (element2.symbol) {
        case "USD":
          totalMontoDolares += parseFloat(element2.monto);
          IgvDolares += parseFloat(element2.igv);
          totalDolares += parseFloat(element2.total);

          break;
        case "S/.":
          totalMontoSoles += parseFloat(element2.monto);
          IgvSoles += parseFloat(element2.igv);
          totalSoles += parseFloat(element2.total);

          break;

        default:
          break;
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
      moneda: "SOL",
      monto: totalMontoSoles,
      igv: IgvSoles,
      total: totalSoles,
    }
  );
  return totalAdministrativo;
}
function calcularTotalesOpCxC(data) {
  let totalOperativo = [];
  let totalNoLlegadaDolares = 0;
  let totalLlegadaDolares = 0;
  let totalDolares = 0;

  let totalLlegadaSoles = 0;
  let totalNoLlegadaSoles = 0;
  let totalSoles = 0;
  data.forEach((element) => {
    element.details.forEach((element2) => {
      switch (element2.symbol) {
        case "USD":
          if (element2.llegada == 0) {
            totalNoLlegadaDolares += parseFloat(element2.total_pagar);
            totalDolares += parseFloat(element2.total_pagar);
          }
          if (element2.llegada == 1) {
            totalLlegadaDolares += parseFloat(element2.total_pagar);
            totalDolares += parseFloat(element2.total_pagar);
          }
          break;
        case "S/.":
          if (element2.llegada == 0) {
            totalNoLlegadaSoles += parseFloat(element2.total_pagar);
            totalSoles += parseFloat(element2.total_pagar);
          }
          if (element2.llegada == 1) {
            totalLlegadaSoles += parseFloat(element2.total_pagar);
            totalSoles += parseFloat(element2.total_pagar);
          }
          break;

        default:
          break;
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
      moneda: "SOL",
      llegada: totalLlegadaSoles,
      no_llegada: totalNoLlegadaSoles,
      total: totalSoles,
    }
  );

  return totalOperativo;
}
function calcularTotalesAdmCxC(data) {
  let totalAdministrativo = [];
  let totalMontoDolares = 0;
  let IgvDolares = 0;
  let totalDolares = 0;

  let totalMontoSoles = 0;
  let IgvSoles = 0;
  let totalSoles = 0;
  data.forEach((element) => {
    element.details.forEach((element2) => {
      switch (element2.symbol) {
        case "USD":
          totalMontoDolares += parseFloat(element2.total_pagar);
          IgvDolares += parseFloat(element2.igv);
          totalDolares +=
            parseFloat(element2.total_pagar) + parseFloat(element2.igv);

          break;
        case "S/.":
          totalMontoSoles += parseFloat(element2.total_pagar);
          IgvSoles += parseFloat(element2.igv);
          totalSoles +=
            parseFloat(element2.total_pagar) + parseFloat(element2.igv);

          break;

        default:
          break;
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
      moneda: "SOL",
      monto: totalMontoSoles,
      igv: IgvSoles,
      total: totalSoles,
    }
  );

  return totalAdministrativo;
}
