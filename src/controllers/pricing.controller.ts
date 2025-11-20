import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import { getCollection } from "../routes/mongoDB";
import { Collection, InsertOneResult, UpdateResult } from "mongodb";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { io } from "../server";
import * as pg from "pg";
const { Pool } = pg;
import puppeteer from "puppeteer";
const pool = conexion();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
import moment from "moment";
import { QuoteNote } from "interface/quoteNote";
import axios from "axios";
moment.locale("es");

const fs = require("fs");

export const setQuote = async (req: Request, res: Response) => {
  const dataObj = req.body;
  let serviciocotizacion = dataObj.serviciocotizacion;
  let contenedores = dataObj.contenedores;
  let opcionCostos = dataObj.opcionCostos;

  // -------------------------- SERVICIOS
  let ID_BEGEND_s = serviciocotizacion.map((item: any) => {
    return item.idBegEnd;
  });
  let NAMESERVICE_s = serviciocotizacion.map((item: any) => {
    return item.nameservice;
  });
  let CODEGROUPSERVICES_s = serviciocotizacion.map((item: any) => {
    return item.codegroupservices;
  });
  let statusservices_s = serviciocotizacion.map((item: any) => {
    return item.status == true || item.status == 1 ? 1 : 0;
  });

  // ----------------------------- contenedores
  let id_containers_c = contenedores.map((item: any) => {
    return item.id_contenedor;
  });
  let quantity_c = contenedores.map((item: any) => {
    return item.cantidad;
  });

  await pool.query(
    "SELECT * FROM table_quote_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35)",
    [
      dataObj.id_marketing ? dataObj.id_marketing : null,
      dataObj.id_entitie ? dataObj.id_entitie : null,
      dataObj.idsentido ? dataObj.idsentido : null,
      dataObj.idtipocarga ? dataObj.idtipocarga : null,
      dataObj.idincoterms ? dataObj.idincoterms : null,
      dataObj.idorigen ? dataObj.idorigen : null,
      dataObj.iddestino ? dataObj.iddestino : null,
      dataObj.numerobultos ? dataObj.numerobultos : null,
      dataObj.peso ? dataObj.peso : null,
      dataObj.volumen ? dataObj.volumen : null,
      dataObj.quote ? dataObj.quote : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.statusquote ? dataObj.statusquote : 1,
      dataObj.idVendedor ? dataObj.idVendedor : null,
      dataObj.descripcionMercancia ? dataObj.descripcionMercancia : null,
      dataObj.idProvincia ? dataObj.idProvincia : null,
      dataObj.idDistrito ? dataObj.idDistrito : null,
      dataObj.fullflag ? (dataObj.fullflag == true ? 1 : 0) : null,
      dataObj.seguro ? dataObj.seguro : null,
      dataObj.proveedor ? dataObj.proveedor : null,
      dataObj.telefonoproveedor ? dataObj.telefonoproveedor : null,
      dataObj.direccionproveedor ? dataObj.direccionproveedor : null,

      dataObj.ganancia ? dataObj.ganancia : null,
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.idPricing ? dataObj.idPricing : null,

      // --------------------
      ID_BEGEND_s,
      NAMESERVICE_s,
      CODEGROUPSERVICES_s,
      statusservices_s,
      // -----------------------------
      id_containers_c,
      quantity_c,
      // ------------------------------
      dataObj.fullflag,
      dataObj.tiporeporte ? dataObj.tiporeporte : null,
      dataObj.id_percepcionaduana ? dataObj.id_percepcionaduana : null,
      JSON.stringify(opcionCostos),
    ],
    (err, response, fields) => {
      if (!err) {
        let id_branch = dataObj.id_branch;
        let rows = response.rows;
        io.to(id_branch).emit("nueva-operacion", {
          mensaje: "Cotización ingresada con el número " + rows[0].nro_quote,
          id_branch,
        });
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
          mensaje: rows[0].mensaje,
          insertId: rows[0].insertid,
          nro_quote: rows[0].nro_quote,
          msg: "Cotización ingresada con el número " + rows[0].nro_quote,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getQuoteStatus = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM QUOTE_STATUS_listar($1);",
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getQuoteList = async (req: Request, res: Response) => {
  let filtro = req.query;
  let stado = 1;

  switch (filtro.estado) {
    case "1":
    case "true":
      stado = 1;
      break;
    case "0":
    case "false":
      stado = 0;
      break;

    default:
      stado = null;
      break;
  }
  await pool.query(
    "select * from TABLE_QUOTE_list($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      filtro.id_branch ? filtro.id_branch : null,
      filtro.id_marketing ? filtro.id_marketing : null,
      filtro.id_status ? filtro.id_status : null,
      filtro.id_entities ? filtro.id_entities : null,
      filtro.id_modality ? filtro.id_modality : null,
      filtro.id_shipment ? filtro.id_shipment : null,
      filtro.id_incoterm ? filtro.id_incoterm : null,
      filtro.fechainicio ? filtro.fechainicio : null,
      filtro.fechafin ? filtro.fechafin : null,
      stado,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getQuoteId = async (req: Request, res: Response) => {
  const { id } = req.query;
  await pool.query(
    "select * from TABLE_QUOTE_VER($1);",
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const delQuote = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query(
    "UPDATE Table_Quote SET status = 0 WHERE id = $1",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const putQuote = async (req: Request, res: Response) => {
  const dataObj = req.body;

  const serviciocotizacion = dataObj.serviciocotizacion;
  const contenedores = dataObj.contenedores;

  let opcionCostos = dataObj.opcionCostos;
  // --------------------------
  let ID_BEGEND_s = serviciocotizacion.map((item: any) => {
    return item.id_begend ? item.id_begend : null;
  });
  let NAMESERVICE_s = serviciocotizacion.map((item: any) => {
    return item.nameservice ? item.nameservice : null;
  });
  let CODEGROUPSERVICES_s = serviciocotizacion.map((item: any) => {
    return item.codegroupservices ? item.codegroupservices : null;
  });
  // -----------------------------
  let id_containers_c = contenedores.map((item: any) => {
    return item.id_contenedor == undefined ? null : item.id_contenedor;
  });
  let quantity_c = contenedores.map((item: any) => {
    return item.cantidad ? item.cantidad : null;
  });
  // ----------------------------

  // ------------------------------

  let pid_s = serviciocotizacion.map((item: any) => {
    return item.id ? item.id : 0;
  });

  let pid_cc = contenedores.map((item: any) => {
    return item.id ? item.id : 0;
  });

  let pstatus_s = serviciocotizacion.map((item: any) => {
    return item.status == true || item.status == 1 ? 1 : 0;
  });

  let pid_contenedor = contenedores.map((item: any) => {
    return item.id_contenedor ? item.id_contenedor : null;
  });

  let pid = dataObj.id_quote;
  await pool.query(
    "SELECT * FROM table_quote_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36)",
    [
      dataObj.id_marketing ? dataObj.id_marketing : null,
      dataObj.id_entitie ? dataObj.id_entitie : null,
      dataObj.idsentido ? dataObj.idsentido : null,
      dataObj.idtipocarga ? dataObj.idtipocarga : null,
      dataObj.idincoterms ? dataObj.idincoterms : null,
      dataObj.idorigen ? dataObj.idorigen : null,
      dataObj.iddestino ? dataObj.iddestino : null,
      dataObj.numerobultos ? dataObj.numerobultos : null,
      dataObj.peso ? dataObj.peso : null,
      dataObj.volumen ? dataObj.volumen : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.statusquote ? dataObj.statusquote : null,
      dataObj.idVendedor ? dataObj.idVendedor : null,
      dataObj.descripcionMercancia ? dataObj.descripcionMercancia : null,
      dataObj.idProvincia ? dataObj.idProvincia : null,
      dataObj.idDistrito ? dataObj.idDistrito : null,
      dataObj.fullflag ? (dataObj.fullflag == true ? 1 : 0) : null,
      dataObj.seguro ? dataObj.seguro : null,
      dataObj.proveedor ? dataObj.proveedor : null,
      dataObj.telefonoproveedor ? dataObj.telefonoproveedor : null,
      dataObj.direccionproveedor ? dataObj.direccionproveedor : null,
      dataObj.idPricing ? dataObj.idPricing : null,
      // --------------------
      ID_BEGEND_s,
      NAMESERVICE_s,
      CODEGROUPSERVICES_s,
      // -----------------------------
      id_containers_c,
      quantity_c,
      // ------------------------------
      !!dataObj.fullflag ? 1 : 0,
      pid_s,
      pid_cc,
      pstatus_s,
      pid_contenedor,
      pid,
      dataObj.tiporeporte ? dataObj.tiporeporte : null,
      dataObj.id_percepcionaduana ? dataObj.id_percepcionaduana : null,
      JSON.stringify(opcionCostos),
    ],
    async (err, response, fields) => {
      if (!err) {
        // Actualizar campos adicionales si vienen en el body
        const { tiempo_transito, date_end, fecha_fin } = dataObj;
        const fechaFinToSet = fecha_fin || date_end || null;
        if (tiempo_transito || fechaFinToSet) {
          try {
            await pool.query(
              "UPDATE Table_Quote SET fecha_fin = COALESCE($1, fecha_fin), tiempo_transito = COALESCE($2, tiempo_transito) WHERE id = $3",
              [fechaFinToSet, tiempo_transito || null, pid]
            );
          } catch (e) {
            console.log("Warning: no se pudo actualizar fecha_fin/tiempo_transito:", e);
          }
        }

        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
          mensaje: rows[0].mensaje,
          insertId: rows[0].insertid,
          nro_quote: rows[0].nro_quote,
          msg: "Cotización ingresada con el número " + rows[0].nro_quote,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getReportsRangeDays = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_SERVICESBRANCH_QuoteReportRangeDays2($1);",
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const setCalls = async (req: Request, res: Response) => {
  const { id_quote, fecha, id_operador, comentario } = req.body;
  await pool.query(
    "select * from Quote_Calls_insertar($1,$2,$3,$4)",
    [id_quote, fecha, id_operador, comentario],

    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows.rows,
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: err,
        });
      }
    }
  );
};

export const updateCalls = async (req: Request, res: Response) => {
  const { fecha, id_operador, comentario, status } = req.body;
  const id = req.params.id;
  await pool.query(
    "UPDATE Quote_Calls set date = $1, id_pricing = $2, notes = $3, status = $4 where id = $5",
    [fecha, id_operador, comentario, status, id],
    (err, response, fields) => {
      if (!err) {
        // let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: "Actualización correcta",
          estadoflag: true,
          data: [],
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getCalls = async (req: Request, res: Response) => {
  const { id_branch, id_quote } = req.body;

  await pool.query(
    "select * from  QUOTE_CALLS_LISTAR($1, null,$2); ",
    [id_branch, id_quote],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getCallsId = async (req: Request, res: Response) => {
  const id = req.params.id;
  await pool.query(
    "select * from  QUOTE_CALLS_LISTAR($1, $2,null);",
    [req.body.id_branch, id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getQuoteCalls = async (req: Request, res: Response) => {
  const id = req.params.id;
  await pool.query(
    "select * from  QUOTE_CALLS_LISTAR($1, null,null);",
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getInstructivoId = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM view_QuoteInstructivoData($1);",
    [req.params.id_quote],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getMarketingList = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_MARKETING_LIST($1)",
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getModulesEntities = async (req: Request, res: Response) => {
  const { id_module, id_branch } = req.body;
  await pool.query(
    "SELECT * FROM ModulesEntities_list($1)",
    [id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const updateQuoteRecibidoEnviado = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_quote_actualizar_recibido_enviado($1,$2,$3,$4,$5,$6,$7)",
    [
      req.body.id,
      req.body.id_master_recibidocotizacion
        ? req.body.id_master_recibidocotizacion
        : null,
      req.body.id_master_enviadocliente
        ? req.body.id_master_enviadocliente
        : null,
      req.body.fecha_enviocliente ? req.body.fecha_enviocliente : null,
      req.body.id_status ? req.body.id_status : null,
      req.body.comentario,
      req.body.id_pricing,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ActualizarFolderOneDrive = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_quote_updatefolderonedrive($1,$2)",
    [req.body.id, req.body.url],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getListCalls = async (req: Request, res: Response) => {
  let {
    id_branch,
    id_estado,
    id_sentido,
    id_carga,
    id_icoterms,
    desde,
    hasta,
    estado,
  } = req.query;
  let stado = 1;

  switch (estado) {
    case "1":
    case "true":
      stado = 1;
      break;
    case "0":
    case "false":
      stado = 0;
      break;

    default:
      stado = null;
      break;
  }
  await pool.query(
    "select * from lista_llamadas2($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      id_branch ? id_branch : null,
      id_estado ? id_estado : null,
      id_sentido ? id_sentido : null,
      id_carga ? id_carga : null,
      id_icoterms ? id_icoterms : null,
      desde ? desde : null,
      hasta ? hasta : null,
      stado,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const quoteCargarNoAsignadosHouse = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_quote_cargar_noasignadoshouse($1)",
    [req.query.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          estado: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const quoteDataHouse = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_quote_data_house($1)",
    [req.query.id_quote],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const listadoCotizacionMercadeo = async (
  req: Request,
  res: Response
) => {
  let { filtro, id_branch } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM listado_cotizacion_mercadeo($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        id_branch ? id_branch : null,
        filtro.fechafin ? filtro.fechafin : null,
        filtro.fechainicio ? filtro.fechainicio : null,
        filtro.id_entities ? filtro.id_entities : null,
        filtro.id_incoterm ? filtro.id_incoterm : null,
        filtro.id_marketing ? filtro.id_marketing : null,
        filtro.id_modality ? filtro.id_modality : null,
        filtro.id_shipment ? filtro.id_shipment : null,
        filtro.id_status ? filtro.id_status : null,
        filtro.estado ? filtro.estado : null,
      ]
    );

    const rows = result.rows;

    if (!rows.length || !rows[0].estadoflag) {
      return res.send({
        estadoflag: false,
        msg: "No se encontraron registros",
      });
    }

    // Variables de datos
    const lstTotalPorDia = rows[0].lsttotaldia;
    const lstmarketing = rows;
    const sucursal = rows[0].trade_name_sucursal;

    // Conteo por estado
    const countByStatus: Record<string, number> = {};
    for (const item of rows) {
      const status = item.namemarketing;
      countByStatus[status] = (countByStatus[status] || 0) + 1;
    }

    const countByActivosArray = Object.entries(countByStatus).map(
      ([name, cantidad]) => ({ name, cantidad })
    );

    const fecha = moment().format("DD-MM-YYYY");

    // Renderizar EJS a HTML
    const htmlContent = await ejs.renderFile(
      path.join(__dirname, "../views/", "pdfQuoteMarketing.ejs"),
      {
        sucursal,
        countByActivosArray,
        lstmarketing,
        fecha,
      }
    );

    // Configurar Puppeteer
    let browser = null;
    if (process.env.NODE_ENV === "production") {
      browser = await puppeteer.launch({
        executablePath: "/usr/bin/google-chrome",
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    } else {
      browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generar PDF
    const pdfBuffer = await page.pdf({
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

    const fileName = `pdfQuoteMarketing_${id_branch || "all"}_${fecha}.pdf`;
    const filePath = path.join(__dirname, "../../files", fileName);
    fs.writeFileSync(filePath, pdfBuffer);

    await browser.close();

    // Enviar respuesta
    res.send({
      estadoflag: true,
      msg: "File created successfully",
      path: fileName,
    });
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).send({
      estadoflag: false,
      msg: "Error interno del servidor al generar el PDF.",
      error,
    });
  }
};

// export const quotePreviewTotales = async (req: Request, res: Response) => {
//   console.log("llegó m");
//   try {
//     let {
//       index,
//       TipoCostos,
//       isImport,
//       datosOrigen,
//       totalOrigen,
//       code,
//       iso,
//       id_branch,
//       business_name,
//       address,
//       tipo,
//       cliente,
//       slogancliente,
//       fechafin,
//       tiempoTransito,
//       origen,
//       destino,
//       impuesto,
//       flete,
//       almacen,
//       aduana,
//       local,
//       totalImpuesto,
//       incluye,
//       noincluye,
//       importante,
//       contenedor,
//       conceptos,
//       sentido,
//       embarque,
//       icoterm,
//       datosFlete,
//       datosLocales,
//       datosAduanas,
//       datosAlmacenes,
//       datosGastosTerceros,
//       totalImpuestosIGV,
//       totalFlete,
//       totalLocales,
//       totalAduanas,
//       totalAlmacenes,
//       totalGastosTercero,
//       totalServicios,
//       total,
//       iso_pais,
//       numerobultos,
//       peso,
//       volumen,
//       pais,
//       url_logo,
//       nameEmpresa,
//       esunica,
//       nombre_impuesto,
//     } = req.body;
//     let fecha = moment().format("DD-MM-YYYY");
//     console.log("llegó m2");
//     let servicios = getServicios({
//       flete: flete,
//       almacen: almacen,
//       aduana: aduana,
//       local: local,
//       contenedor: contenedor,
//       numerobultos: numerobultos,
//       peso: peso,
//       volumen: volumen,
//     });
//     console.log("llegó m3");
//     let lengthServ = servicios.length;
//     // let protocol = req.protocol; // 'http' o 'https'
//     // let host = req.get("host"); // El host (dominio o IP con puerto)
//     // let url = `${protocol}://${host}/uploads/`;
//     // let url_logo = `http://localhost:9200/uploads/1726792533981.png`;
//     console.log("llegó a");
//     ejs.renderFile(
//       path.join(__dirname, "../views/", "quoteDetallado.ejs"),
//       {
//         index,
//         TipoCostos,
//         isImport,
//         datosOrigen,
//         totalOrigen,
//         iso,
//         servicios,
//         lengthServ,
//         fecha,
//         code,
//         id_branch,
//         business_name,
//         address,
//         tipo,
//         cliente,
//         slogancliente,
//         fechafin,
//         tiempoTransito,
//         origen,
//         destino,
//         impuesto,
//         flete,
//         almacen,
//         aduana,
//         local,
//         totalImpuesto,
//         incluye,
//         noincluye,
//         importante,
//         contenedor,
//         conceptos,
//         sentido,
//         embarque,
//         icoterm,
//         datosFlete,
//         datosLocales,
//         datosAduanas,
//         datosAlmacenes,
//         datosGastosTerceros,
//         totalImpuestosIGV,
//         totalFlete,
//         totalLocales,
//         totalAduanas,
//         totalAlmacenes,
//         totalGastosTercero,
//         totalServicios,
//         total,
//         iso_pais,
//         pais,
//         url_logo,
//         nameEmpresa,
//         esunica,
//         nombre_impuesto,
//       },

//       (err: any, data: any) => {
//         console.log("llegó b");
//         if (err) {
//           // res.send(err);
//           console.log(err);
//         } else {
//           let options = {
//             page_size: "A4",
//             // header: {
//             //   height: "15mm",
//             // },
//           };

//           pdf
//             .create(data, options)
//             .toFile(
//               `files/COTIZACION_${id_branch}_${index}.pdf`,
//               function (err: any, data: any) {
//                 if (err) {
//                   res.send(err);
//                 } else {
//                   res.download(`/COTIZACION_${id_branch}_${index}.pdf`);
//                   res.send({
//                     estadoflag: true,
//                     msg: "File created successfully",
//                     path: path.join(`COTIZACION_${id_branch}_${index}.pdf`),
//                   });
//                 }
//               }
//             );
//         }
//       }
//     );
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const quotePreviewTotales = async (req: Request, res: Response) => {
  let {
    index,
    TipoCostos,
    isImport,
    datosOrigen,
    totalOrigen,
    code,
    iso,
    id_branch,
    business_name,
    address,
    tipo,
    cliente,
    slogancliente,
    fechafin,
    tiempoTransito,
    origen,
    destino,
    impuesto,
    flete,
    almacen,
    aduana,
    local,
    totalImpuesto,
    incluye,
    noincluye,
    importante,
    contenedor,
    conceptos,
    sentido,
    embarque,
    icoterm,
    datosFlete,
    datosLocales,
    datosAduanas,
    datosAlmacenes,
    datosGastosTerceros,
    totalImpuestosIGV,
    totalFlete,
    totalLocales,
    totalAduanas,
    totalAlmacenes,
    totalGastosTercero,
    totalServicios,
    total,
    iso_pais,
    numerobultos,
    peso,
    volumen,
    pais,
    url_logo, 
    nameEmpresa,
    esunica,
    nombre_impuesto,
    document,
    phone,
    amount, 
    date_end,
    tiempo_transito,
  } = req.body;

  let fecha = moment().format("DD-MM-YYYY");

  fechafin = fechafin || date_end;
  tiempoTransito = tiempoTransito || tiempo_transito;

  let servicios = getServicios({
    flete: flete,
    almacen: almacen,
    aduana: aduana,
    local: local,
    contenedor: contenedor,
    numerobultos: numerobultos,
    peso: peso,
    volumen: volumen,
  });
  let lengthServ = servicios.length;
  let browser = null;
  if (process.env.NODE_ENV === "production") {
    browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } else {
    // Intentar usar Chrome o Edge instalado en Windows para evitar descargas de Chromium
    const findChrome = () => {
      const candidates = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe` : undefined,
        // Fallback a Microsoft Edge si Chrome no existe
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      ].filter(Boolean);
      for (const p of candidates as string[]) {
        try { if (fs.existsSync(p)) return p; } catch {}
      }
      return null;
    };
    const chromePath = findChrome();
    const launchOptions: any = {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
    if (chromePath) launchOptions.executablePath = chromePath;
    browser = await puppeteer.launch(launchOptions);
  }

  try {
    // 1. Renderizar la plantilla EJS a HTML
    const htmlContent = await ejs.renderFile(
      path.join(__dirname, "../views/", "quoteDetallado.ejs"),
      {
        index,
        TipoCostos,
        isImport,
        datosOrigen,
        totalOrigen,
        iso,
        servicios,
        lengthServ,
        fecha,
        code,
        id_branch,
        business_name,
        address,
        tipo,
        cliente,
        slogancliente,
        fechafin,
        tiempoTransito,
        origen,
        destino,
        impuesto,
        flete,
        almacen,
        aduana,
        local,
        totalImpuesto,
        incluye,
        noincluye,
        importante,
        contenedor,
        numerobultos,
        conceptos,
        sentido,
        embarque,
        icoterm,
        datosFlete,
        datosLocales,
        datosAduanas,
        datosAlmacenes,
        datosGastosTerceros,
        totalImpuestosIGV,
        totalFlete,
        totalLocales,
        totalAduanas,
        totalAlmacenes,
        totalGastosTercero,
        totalServicios,
        total,
        iso_pais,
        pais,
        url_logo, // URL del logo
        nameEmpresa,
        esunica,
        nombre_impuesto,
        peso,
        volumen,
        document,
        phone,
        amount,
      }
    );

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "load" });

    const footerTemplate = `
      <div style="width:100%; font-family: Arial, Helvetica, sans-serif; color:#000; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
        <div style="background:#182e4b; height:3px; width:100%;"></div>
        <div style="padding:8px 16px; display:flex; justify-content:space-between; align-items:center; width:100%; background:#ffffff; font-size:12px; line-height:1.2;">
          <div style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">
            <span style="font-weight:700;">${business_name || nameEmpresa || ""}</span>
            <span style="opacity:0.85;"> • ${address || ""} • Tel: ${phone || ""}</span>
          </div>
          <div style="white-space:nowrap; font-weight:600;">
            Página <span class="pageNumber"></span> de <span class="totalPages"></span>
          </div>
        </div>
      </div>
    `;

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate,
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "30mm",
        left: "20mm",
      },
    });

    const fileName = `COTIZACION_${id_branch}_${index}.pdf`;
    // Guardar en projectRoot/files para coincidir con app.use('/files', express.static(path.join(__dirname, '../files')))
    const outDir = path.join(__dirname, "../../files");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const filePath = path.join(outDir, fileName);
    fs.writeFileSync(filePath, pdfBuffer);

    return res.send({
      estadoflag: true,
      msg: "File created successfully",
      path: `files/${fileName}`,
    });
  } catch (error) {
    console.error("Error al generar o enviar el PDF:", error);
    res
      .status(500)
      .send(["Error interno del servidor al generar el PDF.", error]);
  } finally {
    if (browser) {
      await browser.close(); // Siempre cierra el navegador de Puppeteer
    }
  }
};

export const aprobarCotizacion = async (req: Request, res: Response) => {
  try {
    let baseURL = "http://localhost:9200/";
    if (process.env.NODE_ENV === "production") {
      baseURL = "https://api.agentedecargaonline.com/";
    }
    let {
      id_quote,
      nuevoexpediente,
      id_exp,
      fecha_validez,
      totalIngreso,
      igvIngreso,
      valorIngreso,
      listCostosInstructivo,
      listVentasInstructivo,
      id_house,
      id_opcion,
      id_opcion_house,
    } = req.body;

    // Validar y normalizar arrays antes de filtrar
    const costosSafe = Array.isArray(listCostosInstructivo) ? listCostosInstructivo : [];
    const ventasSafe = Array.isArray(listVentasInstructivo) ? listVentasInstructivo : [];

    const costosFiltrados = costosSafe.filter((item) => item && item.id);
    const ventasFiltradas = ventasSafe.filter(
      (item) => item && item.descripcion && !/^(TOTAL|SubTotal)$/i.test(item.descripcion.trim())
    );

    await pool.query(
      "SELECT * FROM function_aprobar_cotizacion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);",
      [
        id_quote ? id_quote : null,
        nuevoexpediente ? nuevoexpediente : null,
        id_exp ? id_exp : null,
        fecha_validez ? fecha_validez : null,
        igvIngreso ? igvIngreso : null,
        valorIngreso ? valorIngreso : null,
        totalIngreso ? totalIngreso : 0,
        id_house == "" ? null : id_house,
        id_opcion == "" ? null : id_opcion,
        id_opcion_house == "" ? null : id_opcion_house,
        JSON.stringify(costosFiltrados),
        JSON.stringify(ventasFiltradas),
      ],

      async (err, response, fields) => {
        if (!err) {
          let rows = response.rows;
          
          // Limpiar en Mongo sin bloquear respuesta
          axios
            .put(`${baseURL}eliminar_quote_mongo`, { id: id_quote })
            .catch((e) => {
              console.log("Error eliminando quote de Mongo:", e?.message || e);
            });

          // Validar que rows tenga datos
          if (!rows || rows.length === 0) {
            return res.json({
              status: 200,
              statusBol: true,
              mensaje: "Cotización aprobada correctamente",
              estadoflag: true,
              data: [],
              token: renewTokenMiddleware(req),
            });
          }

          return res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
            estadoflag: rows[0].estadoflag,
            data: rows,
            token: renewTokenMiddleware(req),
          });
        } else {
          console.error("Error en function_aprobar_cotizacion:", err);
          return res.status(500).json({
            status: 500,
            statusBol: false,
            mensaje: "Error al aprobar la cotización",
            estadoflag: false,
            error: err?.message || String(err),
          });
        }
      }
    );
  } catch (error) {
    console.error("Error en aprobarCotizacion:", error);
    return res.status(500).json({
      status: 500,
      statusBol: false,
      mensaje: "Error interno al procesar la aprobación",
      estadoflag: false,
      error: error?.message || String(error),
    });
  }
};

export const generarInstructivoQuote = async (req: Request, res: Response) => {
  try {
    const {
      nro_propuesta,
      expediente,
      sentido,
      carga,
      incoterms,
      nombre,
      direccion,
      telefono,
      vendedor,
      proveedor,
      origen,
      destino,
      fiscal,
      ruc,
      listServiciosInstructivo,
      listIngresosInstructivo,
      listCostosInstructivo,
      sucursal,
      status,
      code_house,
      code_master,
      notas,
      containers,
      numerobultos,
      peso,
      volumen,
      totalIngresos,
      totalCostos,
      profit,
      listImpuestosInstructivo,
      tipoimportacionaduana,
      url_logo,
    } = req.body;

    // Validar campos requeridos
    if (!nro_propuesta) {
      return res.status(400).json({
        estadoflag: false,
        msg: "El campo 'nro_propuesta' es requerido",
        error: "Missing required field: nro_propuesta"
      });
    }

    if (!expediente) {
      return res.status(400).json({
        estadoflag: false,
        msg: "El campo 'expediente' es requerido",
        error: "Missing required field: expediente"
      });
    }

    let fecha = moment().format("ll");

    ejs.renderFile(
      path.join(__dirname, "../views/", "pdfQuoteInstructivo.ejs"),
      {
        nro_propuesta,
        totalIngresos: totalIngresos || 0,
        totalCostos: totalCostos || 0,
        profit: profit || 0,
        containers: containers || [],
        numerobultos: numerobultos || 0,
        peso: peso || 0,
        volumen: volumen || 0,
        status: status || "",
        notas: notas || "",
        code_house: code_house || "",
        code_master: code_master || "",
        sucursal: sucursal || "",
        fecha,
        expediente,
        sentido: sentido || "",
        carga: carga || "",
        incoterms: incoterms || "",
        nombre: nombre || "",
        direccion: direccion || "",
        telefono: telefono || "",
        vendedor: vendedor || "",
        proveedor: proveedor || "",
        origen: origen || "",
        destino: destino || "",
        fiscal: fiscal || "",
        ruc: ruc || "",
        listServiciosInstructivo: listServiciosInstructivo || [],
        listIngresosInstructivo: listIngresosInstructivo || [],
        listCostosInstructivo: listCostosInstructivo || [],
        listImpuestosInstructivo: listImpuestosInstructivo || [],
        tipoimportacionaduana: tipoimportacionaduana || "",
        url_logo: url_logo || "",
      },
      async (err: any, data: any) => {
        if (err) {
          console.error("Error renderizando EJS:", err);
          return res.status(500).json({
            estadoflag: false,
            msg: "Error al renderizar la plantilla PDF",
            error: err?.message || String(err)
          });
        }

        let browser = null;
        try {
          browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          });
          const page = await browser.newPage();

          await page.setContent(data, { waitUntil: "networkidle0" });

          const outputPath = path.join(
            __dirname,
            "../../files",
            `InstructivoQuote_${nro_propuesta}.pdf`
          );

          // Asegurar que existe el directorio
          const outDir = path.join(__dirname, "../../files");
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
          }

          await page.pdf({
            path: outputPath,
            format: "Letter",
            printBackground: true,
            margin: {
              top: "0mm",
              right: "0mm",
              bottom: "0mm",
              left: "0mm",
            },
          });

          await browser.close();
          browser = null;

          // Enviar solo JSON con la ruta del archivo (no res.download)
          return res.json({
            estadoflag: true,
            msg: "File created successfully",
            path: `files/InstructivoQuote_${nro_propuesta}.pdf`,
          });
        } catch (pdfError) {
          console.error("Error generando PDF con Puppeteer:", pdfError);
          if (browser) {
            await browser.close();
          }
          return res.status(500).json({
            estadoflag: false,
            msg: "Error al generar el PDF",
            error: pdfError?.message || String(pdfError)
          });
        }
      }
    );
  } catch (error) {
    console.error("Error en generarInstructivoQuote:", error);
    return res.status(500).json({
      estadoflag: false,
      msg: "Error interno al generar instructivo",
      error: error?.message || String(error)
    });
  }
};

export const setNoteQuote = async (req: Request, res: Response) => {
  let QuoteNote: QuoteNote = req.body;
  await pool.query(
    "SELECT * FROM function_quote_note_insert($1,$2);",
    [QuoteNote.id_quote, QuoteNote.name],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const InsertMontoFinalesQuoteMONGODB = async (
  req: Request,
  res: Response
) => {
  const collectionName = "quote_montos_finales";
  const dataToInsert = req.body;

  try {
    const collection: Collection = await getCollection(collectionName);
    const filtro = { id: dataToInsert.id };
    const existente = await collection.findOne(filtro);

    if (existente) {
      const update = { $set: req.body };
      await collection.updateOne(filtro, update);
    } else {
      await collection.insertOne(dataToInsert);
    }

    res.json({
      status: 200,
      statusBol: true,
      mensaje: "Registro Correcto",
      estadoflag: true,
      data: [],
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error al insertar datos");
  }
};

export const ListarMontosFinalesQuoteMONGODB = async (
  req: Request,
  res: Response
) => {
  const collectionName = "quote_montos_finales";
  const { id_branch } = req.query;

  try {
    const collection: Collection = await getCollection(collectionName);

    const filtro: any = {};
    if (id_branch) {
      filtro.id_branch = Number(id_branch); // 👈 conversión necesaria
    }

    const data = await collection.find(filtro).toArray();

    res.json({
      status: 200,
      statusBol: true,
      mensaje: "Listado obtenido correctamente",
      estadoflag: true,
      data: data,
      token: renewTokenMiddleware(req),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 500,
      statusBol: false,
      mensaje: "Error al obtener listado",
      estadoflag: false,
      data: [],
      token: renewTokenMiddleware(req),
    });
  }
};

export const ELiminarQuoteMongo = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const collection = await getCollection("quote_montos_finales");
    const result = await collection.deleteOne({ id: Number(id) });

    if (result.deletedCount === 1) {
      res.json({ success: true, mensaje: "Eliminado con éxito" });
    } else {
      res
        .status(404)
        .json({ success: false, mensaje: "No se encontró el documento" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mensaje: "Error al eliminar" });
  }
};

export const getCargarPersonalPricing = async (req: Request, res: Response) => {
  const { id_branch } = req.query;
  await pool.query(
    "SELECT * FROM function_entities_cargarpricing($1)",
    [id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ListarMontoFinalesQuoteMONGODB = async (
  req: Request,
  res: Response
) => {
  const collectionName = "quote_montos_finales";
  try {
    const collection: Collection = await getCollection(collectionName);
    const cursor = collection.find({}); // Obtenemos el cursor

    const result = await cursor.toArray(); // Convertimos el cursor a un array

    if (result) {
      res.json({
        status: 200,
        estadoflag: result.length > 0,
        statusBol: true,
        data: result,
        mensaje: result.length > 0 ? "" : "No se encontraron registros",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Error en la consulta");
  }
};

export const CopiarCotizacion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_quote_copy($1);",
    [req.body.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getResumenPorEstado = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_quote_resumen_por_estado($1);",
    [req.query.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

function getServicios({
  flete = [],
  almacen = [],
  aduana = [],
  local = [],
  contenedor = [],
  numerobultos = "",
  peso = "",
  volumen = "",
}) {
  let serv = [];
  if (flete.length > 0) {
    flete.forEach((element) => {
      serv.push({
        name: element.name,
        estado: element.estado,
      });
    });
  }
  if (almacen.length > 0) {
    almacen.forEach((element) => {
      serv.push({
        name: element.name,
        estado: element.estado,
      });
    });
  }
  if (aduana.length > 0) {
    aduana.forEach((element) => {
      serv.push({
        name: element.name,
        estado: element.estado,
      });
    });
  }
  if (local.length > 0) {
    local.forEach((element) => {
      serv.push({
        name: element.name,
        estado: element.estado,
      });
    });
  }
  if (contenedor.length > 0) {
    contenedor.forEach((element) => {
      serv.push({
        name: element.name,
        estado: element.valor,
      });
    });
  }
  // if (!!numerobultos) {
  //   serv.push({
  //     name: "N° BULTOS",
  //     estado: numerobultos,
  //   });
  // }
  // if (!!peso) {
  //   serv.push({
  //     name: "PESO",
  //     estado: peso,
  //   });
  // }
  // if (!!volumen) {
  //   serv.push({
  //     name: "VOLUMEN",
  //     estado: volumen,
  //   });
  // }

  return serv;
}
