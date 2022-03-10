import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getControlFileAll = async (req: Request, res: Response) => {
  const conn = await connect();
  conn.query("SELECT * FROM view_reportFile", (err, rows, fields) => {
    if (!err) {
      let datanew = JSON.parse(JSON.stringify(rows));
      let dataServiceList;
      new Promise<void>((resolver, rechazar) => {
        datanew.map((item: any) => {
          conn.query(
            "SELECT * FROM view_houseService where id_house = ? order by id desc",
            [item.id],
            (err, rows, fields) => {
              dataServiceList = JSON.parse(JSON.stringify(rows));
              if (item.id_modality == 1) {
                dataServiceList.sort((a: any, b: any) => {
                  if (a.id < b.id) {
                    return -1;
                  }
                  if (a.id > b.id) {
                    return 1;
                  }
                  return 0;
                });
              } else {
                dataServiceList.sort((a: any, b: any) => {
                  if (a.id < b.id) {
                    return -1;
                  }
                  if (a.id > b.id) {
                    return 1;
                  }
                  return 0;
                });
              }
              let dataTes = [];
              let dataPre = [];
              dataTes.push(dataServiceList);
              dataPre.push({
                dataHouse: item,
                dataService: dataTes,
              });
              req.app.locals.itemsHouse.push(dataPre[0]);
            }
          );
        });
        req.app.locals.itemsHouse = [];
        resolver();
        console.log(resolver);
      }).then(() => {
        setTimeout(() => {
          res.json({
            status: 200,
            statusBol: true,
            data: req.app.locals.itemsHouse,
          });
        }, 1000);
        req.app.locals.itemsHouse = [];
      });
    } else {
      console.log(err);
    }
  });
};

export const getControlFileAllMaster = async (req: Request, res: Response) => {
  const conn = await connect();
  conn.query("SELECT * FROM view_reportFileMaster", (err, rows, fields) => {
    if (!err) {
      let datanew = JSON.parse(JSON.stringify(rows));
      let dataServiceList;
      new Promise<void>((resolver, rechazar) => {
        datanew.map((item: any) => {
          conn.query(
            "SELECT * FROM view_houseService where id_house = ? order by id desc",
            [item.id],
            (err, rows, fields) => {
              dataServiceList = JSON.parse(JSON.stringify(rows));
              let dataTes = [];
              let dataPre = [];
              dataTes.push(dataServiceList);
              dataPre.push({
                dataHouse: item,
                dataService: dataTes,
              });
              req.app.locals.itemsHouse.push(dataPre[0]);
            }
          );
        });
        req.app.locals.itemsHouse = [];
        resolver();
        console.log(resolver);
      }).then(() => {
        setTimeout(() => {
          res.json({
            status: 200,
            statusBol: true,
            data: req.app.locals.itemsHouse,
          });
        }, 1000);
        req.app.locals.itemsHouse = [];
      });
    } else {
      console.log(err);
    }
  });
};

export const getControlFileAllFilter = async (req: Request, res: Response) => {
  const conn = await connect();
  const { idsentido, idOperador, idStatus, idStatusAdm, fecha_ini, fecha_fin } =
    req.body;

  var query = "";
  query =
    "SELECT * FROM view_reportFile vr WHERE vr.id_modality LIKE ? and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ?";

  if (fecha_ini != "") {
    query =
      "SELECT * FROM view_reportFile vr WHERE  vr.id_modality LIKE ?  and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? AND fecha_disponibilidad >= ? or fecha_disponibilidad = '0000-00-00' ";
  }

  if (fecha_fin != "") {
    query =
      "SELECT * FROM view_reportFile vr WHERE vr.id_modality LIKE ? and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? and fecha_disponibilidad <= ? or fecha_disponibilidad = '0000-00-00'";
  }

  if (fecha_ini != "" && fecha_fin != "") {
    query =
      "SELECT * FROM view_reportFile vr WHERE vr.id_modality LIKE ? and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? AND fecha_disponibilidad >= ? and fecha_disponibilidad <= ? or fecha_disponibilidad = '0000-00-00'";
  }

  conn.query(
    query,
    [idsentido, idOperador, idStatus, idStatusAdm, fecha_ini, fecha_fin],
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              "SELECT * FROM view_houseService where id_house = ? order by id desc",
              [item.id],
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));
                if (item.id_modality == 1) {
                  dataServiceList.sort((a: any, b: any) => {
                    if (a.id < b.id) {
                      return -1;
                    }
                    if (a.id > b.id) {
                      return 1;
                    }
                    return 0;
                  });
                } else {
                  dataServiceList.sort((a: any, b: any) => {
                    if (a.id < b.id) {
                      return -1;
                    }
                    if (a.id > b.id) {
                      return 1;
                    }
                    return 0;
                  });
                }

                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  dataHouse: item,
                  dataService: dataTes,
                });
                req.app.locals.itemsHouse.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsHouse = [];
          resolver();
          console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsHouse,
            });
          }, 1000);
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getTotales = async (req: Request, res: Response) => {
  const conn = await connect();
  const { idsentido, idOperador, idStatus, idStatusAdm, fecha_ini, fecha_fin } =
    req.body;

  var query = "";
  query = `SELECT vm.id_operador, vl.nameLong, (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 1) AS cerradas, 
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 0) AS abiertas,
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador) AS total FROM view_masterList vm
  LEFT OUTER JOIN view_entitie_list vl
  ON vl.id = vm.id_operador
  WHERE vm.id_modality LIKE '${idsentido}' and vm.id_operador LIKE '${idOperador}' and vm.statusLock LIKE '${idStatus}' and vm.statusLockAdm LIKE '${idStatusAdm}' 
  GROUP BY vm.id_operador`;

  if (fecha_ini != "") {
    query = `SELECT vm.id_operador, vl.nameLong, (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 1 and fecha_disponibilidad >= '${fecha_ini}') AS cerradas, 
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 0 and fecha_disponibilidad >= '${fecha_ini}') AS abiertas,
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador and fecha_disponibilidad >= '${fecha_ini}') AS total FROM view_masterList vm
  LEFT OUTER JOIN view_entitie_list vl
  ON vl.id = vm.id_operador
  WHERE vm.id_modality LIKE '${idsentido}' and vm.id_operador LIKE '${idOperador}' and vm.statusLock LIKE '${idStatus}' and vm.statusLockAdm LIKE '${idStatusAdm}' AND fecha_disponibilidad >= '${fecha_ini}'
  GROUP BY vm.id_operador`;
  }

  if (fecha_fin != "") {
    query = `SELECT vm.id_operador, vl.nameLong, (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 1 and fecha_disponibilidad <= '${fecha_fin}') AS cerradas, 
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 0 and fecha_disponibilidad <= '${fecha_fin}') AS abiertas,
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador and fecha_disponibilidad <= '${fecha_fin}') AS total FROM view_masterList vm
  LEFT OUTER JOIN view_entitie_list vl
  ON vl.id = vm.id_operador
  WHERE vm.id_modality LIKE '${idsentido}' and vm.id_operador LIKE '${idOperador}' and vm.statusLock LIKE '${idStatus}' and vm.statusLockAdm LIKE '${idStatusAdm}' and fecha_disponibilidad <= '${fecha_fin}'
  GROUP BY vm.id_operador`;
  }

  if (fecha_ini != "" && fecha_fin != "") {
    query = `SELECT vm.id_operador, vl.nameLong, (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 1 AND fecha_disponibilidad >= '${fecha_ini}' and fecha_disponibilidad <= '${fecha_fin}') AS cerradas, 
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 0 AND fecha_disponibilidad >= '${fecha_ini}' and fecha_disponibilidad <= '${fecha_fin}') AS abiertas,
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND fecha_disponibilidad >= '${fecha_ini}' and fecha_disponibilidad <= '${fecha_fin}') AS total FROM view_masterList vm
  LEFT OUTER JOIN view_entitie_list vl
  ON vl.id = vm.id_operador
  WHERE vm.id_modality LIKE '${idsentido}' and vm.id_operador LIKE '${idOperador}' and vm.statusLock LIKE '${idStatus}' and vm.statusLockAdm LIKE '${idStatusAdm}' AND fecha_disponibilidad >= '${fecha_ini}' and fecha_disponibilidad <= '${fecha_fin}'
  GROUP BY vm.id_operador`;
  }

  conn.query(
    query,

    (err, rows, fields) => {
      if (!err) {
        let data = JSON.parse(JSON.stringify(rows));

        res.json({
          status: 200,
          statusBol: true,
          data: data,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getTotalesAll = async (req: Request, res: Response) => {
  const conn = await connect();
  const { idsentido, fecha_ini, fecha_fin } = req.body;

  var query = "";
  query = `SELECT vm.id_operador, vl.nameLong, (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 1) AS cerradas, 
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador AND statusLock LIKE 0) AS abiertas,
  (SELECT COUNT(statusLock) FROM view_masterList WHERE id_operador = vm.id_operador) AS total FROM view_masterList vm
  LEFT OUTER JOIN view_entitie_list vl
  ON vl.id = vm.id_operador
  GROUP BY vm.id_operador`;

  conn.query(query, [idsentido, fecha_ini, fecha_fin], (err, rows, fields) => {
    if (!err) {
      let data = JSON.parse(JSON.stringify(rows));

      res.json({
        status: 200,
        statusBol: true,
        data: data,
      });
    } else {
      console.log(err);
    }
  });
};

export const getControlFileAllFilterMaster = async (
  req: Request,
  res: Response
) => {
  const conn = await connect();
  const { idsentido, fecha_ini, fecha_fin } = req.body;

  var query = "";
  query = "SELECT * FROM view_reportFileMaster vr WHERE vr.id_modality LIKE ?";

  if (fecha_ini != "") {
    query =
      "SELECT * FROM view_reportFileMaster vr WHERE  vr.id_modality LIKE ? AND fecha_disponibilidad >= ? ";
  }

  if (fecha_fin != "") {
    query =
      "SELECT * FROM view_reportFileMaster vr WHERE vr.id_modality LIKE ? and fecha_disponibilidad <= ?";
  }

  if (fecha_ini != "" && fecha_fin != "") {
    query =
      "SELECT * FROM view_reportFileMaster vr WHERE vr.id_modality LIKE ? AND fecha_disponibilidad >= ? and fecha_disponibilidad <= ?";
  }

  conn.query(query, [idsentido, fecha_ini, fecha_fin], (err, rows, fields) => {
    if (!err) {
      let datanew = JSON.parse(JSON.stringify(rows));
      let dataServiceList;
      new Promise<void>((resolver, rechazar) => {
        datanew.map((item: any) => {
          conn.query(
            "SELECT * FROM view_houseService where id_house = ? order by id desc",
            [item.id],
            (err, rows, fields) => {
              dataServiceList = JSON.parse(JSON.stringify(rows));
              let dataTes = [];
              let dataPre = [];
              dataTes.push(dataServiceList);
              dataPre.push({
                dataHouse: item,
                dataService: dataTes,
              });
              req.app.locals.itemsHouse.push(dataPre[0]);
            }
          );
        });
        req.app.locals.itemsHouse = [];
        resolver();
        console.log(resolver);
      }).then(() => {
        setTimeout(() => {
          res.json({
            status: 200,
            statusBol: true,
            data: req.app.locals.itemsHouse,
          });
        }, 1000);
      });
    } else {
      console.log(err);
    }
  });
};

export const pdfInstructivo = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();
  const conn = await connect();
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
  const conn = await connect();
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
  const conn = await connect();
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
  } = req.body;

  var sentidoletra;
  if (idsentido === "%1%") {
    sentidoletra = "Importación";
  } else if (idsentido === "%2%") {
    sentidoletra = "Exportación";
  } else if (idsentido === "%%") {
    sentidoletra = "Todos";
  }

  var statusLetra;
  if (idStatus === "%0%") {
    statusLetra = "Abierto";
  } else if (idStatus === "%1%") {
    statusLetra = "Cerrado";
  } else if (idStatus === "%%") {
    statusLetra = "Todos";
  }

  var query = "";
  query =
    "SELECT * FROM view_reportFile vr WHERE vr.id_modality LIKE ? and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? ";

  if (fecha_ini != "") {
    query =
      "SELECT * FROM view_reportFile vr WHERE  vr.id_modality LIKE ?  and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? AND fecha_disponibilidad >= ? or fecha_disponibilidad = '0000-00-00'";
  }

  if (fecha_fin != "") {
    query =
      "SELECT * FROM view_reportFile vr WHERE vr.id_modality LIKE ? and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? and fecha_disponibilidad <= ? or fecha_disponibilidad = '0000-00-00'";
  }

  if (fecha_ini != "" && fecha_fin != "") {
    query =
      "SELECT * FROM view_reportFile vr WHERE vr.id_modality LIKE ? and vr.id_operador like ? and vr.statusLock like ? and vr.statusLockAdm like ? AND fecha_disponibilidad >= ? and fecha_disponibilidad <= ? or fecha_disponibilidad = '0000-00-00'";
  }

  conn.query(
    query,
    [idsentido, idOperador, idStatus, idStatusAdm, fecha_ini, fecha_fin],
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              "SELECT * FROM view_houseService where id_house = ? order by id desc",
              [item.id],
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));
                if (item.id_modality == 1) {
                  dataServiceList.sort((a: any, b: any) => {
                    if (a.id < b.id) {
                      return -1;
                    }
                    if (a.id > b.id) {
                      return 1;
                    }
                    return 0;
                  });
                } else {
                  dataServiceList.sort((a: any, b: any) => {
                    if (a.id < b.id) {
                      return -1;
                    }
                    if (a.id > b.id) {
                      return 1;
                    }
                    return 0;
                  });
                }
                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  dataHouse: item,
                  dataService: dataTes,
                });
                req.app.locals.itemsHouse.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsHouse = [];
          resolver();
          console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            //var data = JSON.parse(JSON.stringify(req.app.locals.itemsHoused));
            req.app.locals.itemsHouse.sort((a: any, b: any) => {
              if (
                a.dataHouse.fecha_disponibilidad <
                b.dataHouse.fecha_disponibilidad
              ) {
                return -1;
              }
              if (
                a.dataHouse.fecha_disponibilidad >
                b.dataHouse.fecha_disponibilidad
              ) {
                return 1;
              }
              return 0;
            });
            console.log(totales);
            ejs.renderFile(
              path.join(__dirname, "../views/", "report-template.ejs"),

              {
                items: req.app.locals.itemsHouse,
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
                  res.send(err);
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
          }, 1000);
        });
      } else {
        console.log(err);
      }
    }
  );
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


export const getReportFileDetails = async (
  req: Request,
  res: Response
) => {
  const conn = await connect();
  const { dateDesde, dateHasta } = req.body

  await conn.query(
    `SELECT vhl.*, vt.total_abonado, ROUND((vhl.montoIngreso - if(vt.total_abonado is null,0,vt.total_abonado)),2) as porCobrar, ve.monto as montoEgreso, (vhl.montoIngreso - ve.monto) as ganancia_global, ROUND((ve.monto - if(vp.montoPagado is null,0,vp.montoPagado)),2) as porPagar FROM view_houseListAll vhl left outer join view_tAbonado vt on vhl.id = vt.id_house left outer join view_totalesEgresos ve on vhl.id = ve.id_house left outer join view_totalesPagados vp on vhl.id = vp.id_house where vhl.fecha_disponibilidad >= '${dateDesde}' and vhl.fecha_disponibilidad <= '${dateHasta}' `,
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;

        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              `SELECT ce.*, (SELECT vtp.total_pr FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) AS total_pr , (SELECT vtp.total_op FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) AS total_op, (SELECT SUM(total_op) FROM view_costosEgresos vce WHERE vce.pagado = 1 AND vce.id_orders = ce.id_orders AND vce.id_proveedor  = ce.id_proveedor) AS total_pagado, (SELECT vtp.docs FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) AS docs, (SELECT vtp.solicitudes FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) AS solicitudes, ((SELECT vtp.total_p FROM view_totalesProveedor vtp WHERE vtp.id_orders = ce.id_orders AND vtp.id_proveedor = ce.id_proveedor) - IF(((SELECT SUM(total_p) FROM view_costosEgresos vce WHERE vce.pagado = 1 AND vce.id_orders = ce.id_orders AND vce.id_proveedor  = ce.id_proveedor)) IS NULL, 0, ((SELECT SUM(total_p) FROM view_costosEgresos vce WHERE vce.pagado = 1 AND vce.id_orders = ce.id_orders AND vce.id_proveedor  = ce.id_proveedor)))) as restante, (SELECT vli.type_pago FROM view_listInvoice vli WHERE vli.id_house = ce.id_house AND vli.id_proveedor = ce.id_proveedor LIMIT 1) AS type_pago FROM view_costosEgresos ce where ce.id_house = ${item.id} GROUP BY ce.id_orders, id_proveedor `,
              [item.id],
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));
                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  value: item.value,
                  conteo: item.conteo,
                  id_modality: item.id_modality,
                  nro_master: item.nro_master,
                  id_shipment: item.id_shipment,
                  statusLock: item.statusLock,
                  dateLock: item.dateLock,
                  statusLockLetra: item.statusLockLetra,
                  statusLockAdm: item.statusLockAdm,
                  dateLockAdm: item.dateLockAdm,
                  statusLockLetraAdm: item.statusLockLetraAdm,
                  ganancia_pricing: item.ganancia_pricing,
                  ganancia_operaciones: item.ganancia_operaciones,
                  fecha_eta: item.fecha_eta,
                  fecha_etd: item.fecha_etd,
                  fecha_disponibilidad: item.fecha_disponibilidad,
                  fecha_disponibilidad_letra: item.fecha_disponibilidad_letra,
                  id_operador: item.id_operador,
                  id_incoterms: item.id_incoterms,
                  id_port_begin: item.id_port_begin,
                  id_port_end: item.id_port_end,
                  id: item.id,
                  id_master: item.id_master,
                  nro_house: item.nro_house,
                  code_house: item.code_house,
                  id_cot: item.id_cot,
                  id_agent: item.id_agent,
                  id_consigner: item.id_consigner,
                  id_notify: item.id_notify,
                  id_aerolinea: item.id_aerolinea,
                  nro_hbl: item.nro_hbl,
                  id_motonave: item.id_motonave,
                  nameOperador: item.nameOperador,
                  id_coloader: item.id_coloader,
                  id_naviera: item.id_naviera,
                  nro_viaje: item.nro_viaje,
                  bultos: item.bultos,
                  peso: item.peso,
                  volumen: item.volumen,
                  id_conditions: item.id_conditions,
                  id_moneda: item.id_moneda,
                  monto: item.monto,
                  cant_pagado: item.cant_pagado,
                  cant_pagar: item.cant_pagar,
                  pagadode: item.pagadode,
                  porcentaje_pagado: item.porcentaje_pagado,
                  status: item.status,
                  created_at: item.created_at,
                  updated_at: item.updated_at,
                  nameShipment: item.nameShipment,
                  nameAgent: item.nameAgent,
                  nameConsigner: item.nameConsigner,
                  documentLong: item.documentLong,
                  nameNotify: item.nameNotify,
                  code_master: item.code_master,
                  namePortBegin: item.namePortBegin,
                  namePortEnd: item.namePortEnd,
                  nameModality: item.nameModality,
                  montoIngreso: item.montoIngreso,
                  total_abonado: item.total_abonado,
                  porCobrar: item.porCobrar,
                  total_p: item.total_p,
                  type_total: item.type_total,
                  porPagar: item.porPagar,
                  ganancia_global: item.ganancia_global,
                  dataEgresos: dataTes[0],
                });

                req.app.locals.itemsHouse.push(dataPre[0]);
                req.app.locals.itemsHouse.sort((a: any, b: any) => {
                  if (a.fecha_disponibilidad > b.fecha_disponibilidad) {
                    return -1;
                  }
                  if (a.fecha_disponibilidad < b.fecha_disponibilidad) {
                    return 1;
                  }
                  return 0;
                });
              }
            );
          });
          req.app.locals.itemsHouse = [];
          resolver();
          console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsHouse,
            });
          }, 5000);
        });
      } else {
        console.log(err);
      }
    }
  );
};





export const pdfFD = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();
  const conn = await connect();
  const {
    itemsDetails,
    fecha, expedientes,
    ganancia,
    cobrado,
    porCobrar,
    porPagar,
    dateDesde,
    dateHasta,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-fileDetails.ejs"),
    {
      itemsDetails,
      fecha,
      expedientes,
      ganancia,
      cobrado,
      porCobrar,
      porPagar,
      fechaYHora,
      dateDesde,
      dateHasta
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
                res.download(
                  "/REPORTE_FILES_DETALLADO_" + fecha + ".pdf"
                );
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
};