import { Request, response, Response } from "express";
import { convertToObject } from "typescript";
// import { connect } from "../routes/database";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const setSPaymentPro = async (req: Request, res: Response) => {
  const dataObj = req.body;
  const conceptos = dataObj.conceptos;
  await pool.query(
    "select * from Table_SPaymentPro_insertar($1,$2,$3,$4,$5,$6,$7)",
    [
      dataObj.id_house,
      dataObj.id_proveedor,
      dataObj.monto,
      dataObj.id_correlativo,
      dataObj.id_master,
      conceptos.map(function (item) {
        return item.id;
      }),
      dataObj.status,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            number: rows[0].number,
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

export const putSPaymentPro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, fecha_sol } = req.body;
  let fecha_solicitud;
  if (fecha_sol != "") {
    fecha_solicitud = fecha_sol;
  } else {
    fecha_solicitud = "";
  }
  await pool.query(
    "UPDATE Table_SPaymentPro set fecha_sol = $1, status = $2 where id = $3",
    [fecha_solicitud, status, id],
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

export const getSPaymentPro = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_SPAYMENTPRO_listar($1,$2,$3,$4);",
    [
      req.query.id_branch,
      req.query.id_master,
      req.query.id_proveedor,
      req.query.id_correlativo,
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

export const getListInvoice = async (req: Request, res: Response) => {
  const { id_branch, id_house, id_proveedor } = req.body;
  await pool.query(
    "SELECT * FROM  TABLE_INVOICE_listar($1,$2,$3,null);",
    [id_branch, id_house, id_proveedor],
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

export const getListInvoiceExp = async (req: Request, res: Response) => {
  const { id_branch, id_house } = req.body;
  await pool.query(
    "SELECT * FROM  TABLE_INVOICE_listar($1,$2,null,2);",
    [id_branch, id_house],
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

export const delInvoice = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query(
    "UPDATE Table_Invoice set status = 0 where id = $1",
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

export const delDebsClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query(
    "UPDATE Table_DebsClient set status = 0 where id = $1",
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

export const getRequestPayment = async (req: Request, res: Response) => {
  // " select v.* from view_requestPayment($1) v",
  await pool.query(
    " select v.* from function_solicitudes_pago($1) v",
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

export const getRequestPaymentConceptos = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  await pool.query(
    "SELECT * FROM SPaymentPro_Conceptos_listar($1)",
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
            data: rows,
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

export const getDebsToPayAdmin = async (req: Request, res: Response) => {
  pool.query(
    "select * from Table_InvoiceAdmin_reporte_cxp($1,$2,$3,$4,$5,$6)",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.id_proveedor ? req.query.id_proveedor : null,
      req.query.llegada ? req.query.llegada : null,
      req.query.desde ? req.query.desde : null,
      req.query.hasta ? req.query.hasta : null,
      req.query.nro_expediente ? req.query.nro_expediente : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
            data: rows,
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

export const getDebsToPay = async (req: Request, res: Response) => {
  await pool.query(
    "select * from  view_reportDebsToPay(null,$1)",
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

export const getReportAccounts = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM ReportAccounts($1,null,null);",
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
export const getReportAccountsFilter = async (req: Request, res: Response) => {
  const { date_begin, date_end } = req.body;
  await pool.query(
    "SELECT * FROM ReportAccounts($1,$2,$3);",
    [req.body.id_branch, date_begin, date_end],
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

export const getDebsClient = async (req: Request, res: Response) => {
  const { id_house } = req.params;
  const { id_branch } = req.body;

  await pool.query(
    " SELECT * FROM  TABLE_DEBSCLIENT_list($1,$2)",
    [id_branch, id_house],
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

export const getDebsClientList = async (req: Request, res: Response) => {
  const { id_branch, id_house } = req.params;
  await pool.query(
    " SELECT * FROM  TABLE_DEBSCLIENT_list($1,null)",
    [id_branch],
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

export const setSPaymentConceptos = async (req: Request, res: Response) => {
  const dataObj = req.body;

  dataObj.conceptos.map((item: any) => {
    pool.query(
      "INSERT INTO Table_SPaymentPro (id_sPayment, id_egreso, status) values ($1,$2,$3)",
      [dataObj.id_sPayment, item.id_egreso, item.status],
      (err, rows, fields) => {
        if (!err) {
        } else {
          res.json({
            status: 200,
            statusBol: true,
          });
        }
      }
    );
  });
  res.json({
    status: 200,
    statusBol: true,
    data: {
      msg: "Registro completo",
    },
  });
};

export const setSPaymentFile = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "INSERT INTO Table_PaymentFile (fecha_operacion, nro_operacion, id_banks, id_coins, monto, id_path, status, id_request) values ($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      dataObj.fecha_operacion,
      dataObj.nro_operacion,
      dataObj.id_banks,
      dataObj.id_coins,
      dataObj.monto,
      dataObj.id_path,
      dataObj.status,
      dataObj.id_request,
    ],
    (err, rows, fields) => {
      if (!err) {
        var datar = JSON.parse(JSON.stringify(rows));
        pool.query(
          "UPDATE Table_SPaymentPro set status = $1 where id = $2",
          [3, dataObj.id_request],
          (err, rowss, fields) => {
            if (!err) {
            } else {
              console.log(err);
            }
          }
        );
        dataObj.itemsSPaymentConceptos.map((item: any) => {
          pool.query(
            "UPDATE ControlGastos_Egresos set pagado = $1, fecha_pago = $2, id_comprobante = $3 where id = $4",
            [1, dataObj.fecha_operacion, datar.insertId, item.id_egreso],
            (err, rowss, fields) => {
              

              if (!err) {
              } else {
                console.log(err);
              }
            }
          );
        });
        pool.query(
          "UPDATE ControlGastos_Egresos set pagado = $1, fecha_pago = $2, id_comprobante = $3 where id_proveedor = $4 AND id_orders = $5",
          [
            1,
            dataObj.fecha_operacion,
            datar.insertId,
            dataObj.id_proveedor,
            dataObj.id_orders,
          ],
          (err, rowss, fields) => {
            if (!err) {
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
      setTimeout(() => {}, 10000);
    }
  );

  res.json({
    status: 200,
    statusBol: true,
    data: {
      msg: "Registro completo",
    },
  });
};

export const setInvoice = async (req: Request, res: Response) => {
  const dataObj = req.body;

  pool.query(
    "INSERT INTO Table_Invoice (id_house, id_proveedor, id_path, type_pago, number, date, status,id_correlativo,id_master) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      dataObj.id_house,
      dataObj.id_proveedor,
      dataObj.id_path,
      dataObj.type_pago,
      dataObj.number,
      dataObj.date,
      dataObj.status,
      dataObj.id_correlativo,
      dataObj.id_master,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: err,
          },
        });
      }
    }
  );
};

export const setDebsClient = async (req: Request, res: Response) => {
  const dataObj = req.body;

  pool.query(
    "select * from function_debscliente_insert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
    [
      dataObj.id_house,
      dataObj.date,
      dataObj.number,
      dataObj.id_banks,
      dataObj.monto,
      dataObj.comentario_usuario,
      dataObj.id_path,
      dataObj.id_cuenta_pic,
      dataObj.tipocambio,
      dataObj.id_moneda_destino,
      dataObj.monto_destino,
      dataObj.nro_operacion,
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

export const setCheckDebsClient = async (req: Request, res: Response) => {
  const dataObj = req.body;

  pool.query(
    "select * from Table_DebsClient_aceptarpago($1,$2,$3,$4,$5,$6)",
    [
      dataObj.comentario_admin,
      dataObj.checkComision == true ? 1 : 0,
      dataObj.comision,
      dataObj.status,
      dataObj.nro_operacion,
      dataObj.id,
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

export const pdfcxp = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();

  const {
    itemsCpp,
    total_pagar,
    total_pagado,
    total_restante,
    total_pagar_llegada,
    total_pagado_llegada,
    total_restante_llegada,
    total_pagar_no_llegada,
    total_pagado_no_llegada,
    total_restante_no_llegada,
    fecha,
    dateRange,
    status,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-cxp.ejs"),
    {
      itemsCpp,
      total_pagar,
      total_pagado,
      total_restante,
      total_pagar_llegada,
      total_pagado_llegada,
      total_restante_llegada,
      total_pagar_no_llegada,
      total_pagado_no_llegada,
      total_restante_no_llegada,
      fecha,
      dateRange,
      status,
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
            "files/REPORTE_DE_CUENTAS_POR_PAGAR_FECHA_" + fecha + ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download(
                  "/REPORTE_DE_CUENTAS_POR_PAGAR_FECHA_" + fecha + ".pdf"
                );
                res.send({
                  msg: "File created successfully",
                  path: path.join(
                    "/REPORTE_DE_CUENTAS_POR_PAGAR_FECHA_" + fecha + ".pdf"
                  ),
                });
              }
            }
          );
      }
    }
  );
};

export const pdfcxc = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();

  const {
    itemsCpp,
    total_pagar,
    total_pagado,
    total_restante,
    total_pagar_llegada,
    total_pagado_llegada,
    total_restante_llegada,
    total_pagar_no_llegada,
    total_pagado_no_llegada,
    total_restante_no_llegada,
    fecha,
    dateRange,
    status,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-cxc.ejs"),
    {
      itemsCpp,
      total_pagar,
      total_pagado,
      total_restante,
      total_pagar_llegada,
      total_pagado_llegada,
      total_restante_llegada,
      total_pagar_no_llegada,
      total_pagado_no_llegada,
      total_restante_no_llegada,
      fecha,
      dateRange,
      status,
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
            "files/REPORTE_DE_CUENTAS_POR_COBRAR_FECHA_" + fecha + ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download(
                  "/REPORTE_DE_CUENTAS_POR_COBRAR_FECHA_" + fecha + ".pdf"
                );
                res.send({
                  msg: "File created successfully",
                  path: path.join(
                    "/REPORTE_DE_CUENTAS_POR_COBRAR_FECHA_" + fecha + ".pdf"
                  ),
                });
              }
            }
          );
      }
    }
  );
};

export const pdfcxpD = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();

  const {
    itemsCpp,
    total_pagar,
    total_pagado,
    total_restante,
    total_pagar_llegada,
    total_pagado_llegada,
    total_restante_llegada,
    total_pagar_no_llegada,
    total_pagado_no_llegada,
    total_restante_no_llegada,
    fecha,
    dateRange,
    status,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-cxpD.ejs"),
    {
      itemsCpp,
      total_pagar,
      total_pagado,
      total_restante,
      total_pagar_llegada,
      total_pagado_llegada,
      total_restante_llegada,
      total_pagar_no_llegada,
      total_pagado_no_llegada,
      total_restante_no_llegada,
      fecha,
      dateRange,
      status,
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
            "files/REPORTE_DETALLADO_DE_CUENTAS_POR_PAGAR_FECHA_" +
              fecha +
              ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download(
                  "/REPORTE_DETALLADO_DE_CUENTAS_POR_PAGAR_FECHA_" +
                    fecha +
                    ".pdf"
                );
                res.send({
                  msg: "File created successfully",
                  path: path.join(
                    "/REPORTE_DETALLADO_DE_CUENTAS_POR_PAGAR_FECHA_" +
                      fecha +
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

export const pdfcxcD = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();

  const {
    itemsCpp,
    total_pagar,
    total_pagado,
    total_restante,
    total_pagar_llegada,
    total_pagado_llegada,
    total_restante_llegada,
    total_pagar_no_llegada,
    total_pagado_no_llegada,
    total_restante_no_llegada,
    fecha,
    dateRange,
    status,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-cxcD.ejs"),
    {
      itemsCpp,
      total_pagar,
      total_pagado,
      total_restante,
      total_pagar_llegada,
      total_pagado_llegada,
      total_restante_llegada,
      total_pagar_no_llegada,
      total_pagado_no_llegada,
      total_restante_no_llegada,
      fecha,
      dateRange,
      status,
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
            "files/REPORTE_DETALLADO_DE_CUENTAS_POR_COBRAR_FECHA_" +
              fecha +
              ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download(
                  "/REPORTE_DETALLADO_DE_CUENTAS_POR_COBRAR_FECHA_" +
                    fecha +
                    ".pdf"
                );
                res.send({
                  msg: "File created successfully",
                  path: path.join(
                    "/REPORTE_DETALLADO_DE_CUENTAS_POR_COBRAR_FECHA_" +
                      fecha +
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

export const getReporteCXP = async (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM controlgastos_egresos_reportecxp($1,$2,$3,$4,$5,$6)",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.id_proveedor ? req.query.id_proveedor : null,
      req.query.llegada ? req.query.llegada : null,
      req.query.desde ? req.query.desde : null,
      req.query.hasta ? req.query.hasta : null,
      req.query.nro_expediente ? req.query.nro_expediente : null,
    ],
    (errs, response, fields) => {
      if (!errs) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
            data: rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
          });
        }
      } else {
        console.log(errs);
      }
    }
  );
};

export const getReporteCXC = async (req: Request, res: Response) => {
  await pool.query(
    "select * from  debsclient_reportecxc($1,$2,$3,$4,$5,$6);",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.id_cliente ? req.query.id_cliente : null,
      req.query.llegadaflag ? req.query.llegadaflag : null,
      req.query.fechadesde ? req.query.fechadesde : null,
      req.query.fechahasta ? req.query.fechahasta : null,
      req.query.nro_expediente ? req.query.nro_expediente : null,
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

export const getReporteCXCAdmin = async (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM TABLE_INVOICEADMINCXC_reporteadmincxc($1,$2,$3,$4,$5,$6)",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.id_cliente ? req.query.id_cliente : null,
      req.query.desde ? req.query.desde : null,
      req.query.hasta ? req.query.hasta : null,
      req.query.llegada ? req.query.llegada : null,
      req.query.nro_expediente ? req.query.nro_expediente : null,
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

// export const getReporteCXPEXCEL = async (req: Request, res: Response) => {
//   conn.query(
//     `SELECT DISTINCT * from view_control_pago_detalles_excel WHERE Monto >0;`,
//     (err, rows, fields) => {
//       if (!err) {
//         res.json({
//           status: 200,
//           statusBol: true,
//           data: rows,
//         });
//       } else {
//         console.log(err);
//       }
//     }
//   );
// };

export const listPagoControlGastoXProveedor = async (
  req: Request,
  res: Response
) => {
  let id = req.params.id;
  // "select * from view_list_pago_control_gasto_x_proveedor($1);",
  pool.query(
    "select * from function_bancos_listxproveedor(null,$1);",
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

export const updateDebsClient = async (req: Request, res: Response) => {
  const dataObj = req.body;

  pool.query(
    "select * from function_debscliente_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
    [
      dataObj.id ? dataObj.id : null,
      dataObj.date ? dataObj.date : null,
      dataObj.number ? dataObj.number : null,
      dataObj.id_banks ? dataObj.id_banks : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.comentario_usuario ? dataObj.comentario_usuario : null,
      dataObj.id_path ? dataObj.id_path : null,
      dataObj.id_cuenta_pic ? dataObj.id_cuenta_pic : null,
      dataObj.tipocambio ? dataObj.tipocambio : null,
      dataObj.id_moneda_destino ? dataObj.id_moneda_destino : null,
      dataObj.monto_destino ? dataObj.monto_destino : null,
      dataObj.nro_operacion ? dataObj.nro_operacion : null,
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
export const eliminarSpaymentpro = async (req: Request, res: Response) => {
  pool.query(
    "select * from function_eliminar_spaymentpro($1)",
    [req.body.id ? req.body.id : null],

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
