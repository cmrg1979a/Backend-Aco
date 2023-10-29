import { Request, Response } from "express";
// import { connect } from "../routes/database";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
import moment from "moment";
moment.locale("es");
export const setQuote = async (req: Request, res: Response) => {
  const dataObj = req.body;

  const serviciocotizacion = dataObj.serviciocotizacion;
  const costocotizacion = dataObj.costocotizacion;
  const notacosto = dataObj.notacosto;
  const contenedores = dataObj.contenedores;
  const ventascasillerodetalles = dataObj.ventascasillerodetalles;
  const impuestos = dataObj.impuestos;
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
  // ----------------------- IMPUESTOS
  let type_i = impuestos.map((item: any) => {
    return item.type;
  });
  let name_i = impuestos.map((item: any) => {
    return item.name;
  });
  let percentage_i = impuestos.map((item: any) => {
    return item.percentage;
  });
  let valor_i = impuestos.map((item: any) => {
    return item.valor;
  });
  let orden_i = impuestos.map((item: any) => {
    return item.orden;
  });

  // --------------------- COSTOS DE LA COTIZACION

  let id_proveedor_cc = costocotizacion.map((item: any) => {
    return item.id_proveedor;
  });
  let id_multiplicador_cc = costocotizacion.map((item: any) => {
    return item.id_multiplicador;
  });
  let concepto_cc = costocotizacion.map((item: any) => {
    return item.concepto;
  });
  let costounitario_cc = costocotizacion.map((item: any) => {
    return item.costounitario;
  });
  let cif_cc = costocotizacion.map((item: any) => {
    return item.cif;
  });
  let seguro_cc = costocotizacion.map((item: any) => {
    return item.seguro;
  });
  let ubptotal_cc = costocotizacion.map((item: any) => {
    return item.subtotal;
  });
  let esorigenflag_cc = costocotizacion.map((item: any) => {
    return item.esorigenflag;
  });
  let eslocalflag_cc = costocotizacion.map((item: any) => {
    return item.eslocalflag;
  });
  let sadpuanaflag_cc = costocotizacion.map((item: any) => {
    return item.esaduanaflag;
  });
  let esalmacenflag_cc = costocotizacion.map((item: any) => {
    return item.esalmacenflag;
  });
  let esopcionflag_cc = costocotizacion.map((item: any) => {
    return item.esopcionflag;
  });
  let esventaflag_cc = costocotizacion.map((item: any) => {
    return item.esventaflag;
  });

  // ----------------------------- contenedores
  let id_containers_c = contenedores.map((item: any) => {
    return item.id_contenedor;
  });
  let quantity_c = contenedores.map((item: any) => {
    return item.cantidad;
  });
  // ----------------------------
  let id_quoteSales_vd = ventascasillerodetalles.map((item: any) => {
    return item.id_quoteSales;
  });
  let description_vd = ventascasillerodetalles.map((item: any) => {
    return item.description;
  });
  let monto_vd = ventascasillerodetalles.map((item: any) => {
    return item.monto;
  });
  // ------------------------------
  let description_nc = notacosto.map((item: any) => {
    return item.descripcion;
  });
  let statusPrincipal_nc = notacosto.map((item: any) => {
    return item.esprincipalflag;
  });
  let statusIncluye_nc = notacosto.map((item: any) => {
    return item.esincluyeflag ? item.esincluyeflag : 0;
  });
  let statusNoIncluye_nc = notacosto.map((item: any) => {
    return item.esnoincluyeflag ? item.esnoincluyeflag : 0;
  });

  await pool.query(
    "SELECT * FROM table_quote_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61)",
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
      1,
      dataObj.idVendedor ? dataObj.idVendedor : null,
      dataObj.descripcionMercancia ? dataObj.descripcionMercancia : null,
      dataObj.idProvincia ? dataObj.idProvincia : null,
      dataObj.idDistrito ? dataObj.idDistrito : null,
      dataObj.fullflag ? (dataObj.fullflag == true ? 1 : 0) : null,
      dataObj.seguro ? dataObj.seguro : null,
      dataObj.proveedor ? dataObj.proveedor : null,
      dataObj.telefonoproveedor ? dataObj.telefonoproveedor : null,
      dataObj.direccionproveedor ? dataObj.direccionproveedor : null,
      dataObj.fecha_fin ? dataObj.fecha_fin : null,
      dataObj.tiempo_transito ? dataObj.tiempo_transito : null,
      dataObj.ganancia ? dataObj.ganancia : null,
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.idPricing ? dataObj.idPricing : null,

      // --------------------
      ID_BEGEND_s,
      NAMESERVICE_s,
      CODEGROUPSERVICES_s,
      statusservices_s,
      //----------------------------------
      type_i,
      name_i,
      percentage_i,
      valor_i,
      orden_i,
      // --------------------------
      costocotizacion.map((item: any) => {
        return item.code_cost ? item.code_cost : null;
      }),
      id_proveedor_cc,
      id_multiplicador_cc,
      concepto_cc,
      costounitario_cc,
      cif_cc,
      seguro_cc,
      ubptotal_cc,
      esorigenflag_cc,
      eslocalflag_cc,
      sadpuanaflag_cc,
      esalmacenflag_cc,
      esopcionflag_cc,
      esventaflag_cc,
      // -----------------------------
      id_containers_c,
      quantity_c,
      // ----------------------------
      id_quoteSales_vd,
      description_vd,
      monto_vd,
      // ------------------------------

      description_nc,
      statusPrincipal_nc,
      statusIncluye_nc,
      statusNoIncluye_nc,
      dataObj.fullflag,
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
            insertId: rows[0].insertid,
            nro_quote: rows[0].nro_quote,
            msg: "Cotización ingresada con el número " + rows[0].nro_quote,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
          });
        }
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

export const getQuoteId = async (req: Request, res: Response) => {
  const { id } = req.query;
  await pool.query(
    "select * from TABLE_QUOTE_VER($1);",
    [id],
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
  const costocotizacion = dataObj.costocotizacion;
  const notacosto = dataObj.notacosto;
  const contenedores = dataObj.contenedores;
  const ventascasillerodetalles = dataObj.ventascasillerodetalles;
  const impuestos = dataObj.impuestos;

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
  // -----------------------
  let type_i = impuestos.map((item: any) => {
    return item.type ? item.type : null;
  });
  let name_i = impuestos.map((item: any) => {
    return item.name ? item.name : null;
  });
  let percentage_i = impuestos.map((item: any) => {
    return item.percentage ? item.percentage : null;
  });
  let valor_i = impuestos.map((item: any) => {
    return item.valor ? item.valor : null;
  });
  let orden_i = impuestos.map((item: any) => {
    return item.orden ? item.orden : null;
  });

  // ---------------------
  let id_proveedor_cc = costocotizacion.map((item: any) => {
    return item.id_proveedor ? item.id_proveedor : null;
  });
  let id_multiplicador_cc = costocotizacion.map((item: any) => {
    return item.id_multiplicador ? item.id_multiplicador : null;
  });
  let concepto_cc = costocotizacion.map((item: any) => {
    return item.concepto ? item.concepto : null;
  });
  let costounitario_cc = costocotizacion.map((item: any) => {
    return item.costounitario ? item.costounitario : 0;
  });
  let cif_cc = costocotizacion.map((item: any) => {
    return item.cif ? item.cif : 0;
  });
  let seguro_cc = costocotizacion.map((item: any) => {
    return item.seguro ? item.seguro : 0;
  });
  let ubptotal_cc = costocotizacion.map((item: any) => {
    return item.ubptotal ? item.ubptotal : null;
  });
  let esorigenflag_cc = costocotizacion.map((item: any) => {
    return item.esorigenflag ? item.esorigenflag : null;
  });
  let eslocalflag_cc = costocotizacion.map((item: any) => {
    return item.eslocalflag ? item.eslocalflag : null;
  });
  let sadpuanaflag_cc = costocotizacion.map((item: any) => {
    return item.esaduanaflag ? item.esaduanaflag : null;
  });
  let esalmacenflag_cc = costocotizacion.map((item: any) => {
    return item.esalmacenflag ? item.esalmacenflag : null;
  });
  let esopcionflag_cc = costocotizacion.map((item: any) => {
    return item.esopcionflag ? item.esopcionflag : null;
  });
  let esventaflag_cc = costocotizacion.map((item: any) => {
    return item.esventaflag ? item.esventaflag : null;
  });
  // -----------------------------
  let id_containers_c = contenedores.map((item: any) => {
    return item.id_contenedor == undefined ? null : item.id_contenedor;
  });
  let quantity_c = contenedores.map((item: any) => {
    return item.cantidad ? item.cantidad : null;
  });
  // ----------------------------
  let id_quoteSales_vd = ventascasillerodetalles.map((item: any) => {
    return item.id_quoteSales ? item.id_quoteSales : null;
  });
  let description_vd = ventascasillerodetalles.map((item: any) => {
    return item.description ? item.description : null;
  });
  let monto_vd = ventascasillerodetalles.map((item: any) => {
    return item.monto ? item.monto : null;
  });
  // ------------------------------
  let description_nc = notacosto.map((item: any) => {
    return item.descripcion ? item.descripcion : null;
  });
  let statusPrincipal_nc = notacosto.map((item: any) => {
    return item.esprincipalflag ? item.esprincipalflag : null;
  });
  let statusIncluye_nc = notacosto.map((item: any) => {
    return item.esincluyeflag ? item.esincluyeflag : null;
  });
  let statusNoIncluye_nc = notacosto.map((item: any) => {
    return item.esnoincluyeflag ? item.esnoincluyeflag : null;
  });
  let pid_s = serviciocotizacion.map((item: any) => {
    return item.id ? item.id : 0;
  });
  let pid_t = impuestos.map((item: any) => {
    return item.id ? item.id : 0;
  });
  let pid_c = costocotizacion.map((item: any) => {
    return item.id ? item.id : 0;
  });
  let pid_cc = contenedores.map((item: any) => {
    return item.id ? item.id : 0;
  });
  let pid_sd = ventascasillerodetalles.map((item: any) => {
    return item.id ? item.id : 0;
  });
  let pid_nt = notacosto.map((item: any) => {
    return item.id ? item.id : 0;
  });

  let pstatus_s = serviciocotizacion.map((item: any) => {
    return item.status == true || item.status == 1 ? 1 : 0;
  });

  let pstatus_c = costocotizacion.map((item: any) => {
    return item.status == true || item.status == 1 ? 1 : 0;
  });

  let pstatus_nt = notacosto.map((item: any) => {
    return item.status == true ? 1 : 0;
  });
  let pid_contenedor = contenedores.map((item: any) => {
    return item.id_contenedor ? item.id_contenedor : null;
  });

  let pid = dataObj.id_quote;
  let statusquote = dataObj.statusquote;
  await pool.query(
    "SELECT * FROM table_quote_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61,$62,$63,$64,$65,$66,$67,$68,$69,$70)",
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
      statusquote ? statusquote : null,
      1,
      dataObj.idVendedor ? dataObj.idVendedor : null,
      dataObj.descripcionMercancia ? dataObj.descripcionMercancia : null,
      dataObj.idProvincia ? dataObj.idProvincia : null,
      dataObj.idDistrito ? dataObj.idDistrito : null,
      dataObj.fullflag ? (dataObj.fullflag == true ? 1 : 0) : null,
      dataObj.seguro ? dataObj.seguro : null,
      dataObj.proveedor ? dataObj.proveedor : null,
      dataObj.telefonoproveedor ? dataObj.telefonoproveedor : null,
      dataObj.direccionproveedor ? dataObj.direccionproveedor : null,
      dataObj.date_end ? dataObj.date_end : null,
      dataObj.tiempo_transito ? dataObj.tiempo_transito : null,
      dataObj.ganancia ? dataObj.ganancia : null,
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.idPricing ? dataObj.idPricing : null,

      // --------------------
      ID_BEGEND_s,
      NAMESERVICE_s,
      CODEGROUPSERVICES_s,
      //----------------------------------
      type_i,
      name_i,
      percentage_i,
      valor_i,
      orden_i,
      // --------------------------
      id_proveedor_cc,
      id_multiplicador_cc,
      concepto_cc,
      costounitario_cc,
      cif_cc,
      seguro_cc,
      ubptotal_cc,
      esorigenflag_cc,
      eslocalflag_cc,
      sadpuanaflag_cc,
      esalmacenflag_cc,
      esopcionflag_cc,
      esventaflag_cc,
      // -----------------------------
      id_containers_c,
      quantity_c,
      // ----------------------------
      id_quoteSales_vd,
      description_vd,
      monto_vd,
      // ------------------------------
      description_nc,
      statusPrincipal_nc,
      statusIncluye_nc,
      statusNoIncluye_nc,
      !!dataObj.fullflag ? 1 : 0,
      pid_s,
      pid_t,
      pid_c,
      pid_cc,
      pid_sd,
      pid_nt,
      pstatus_s,
      pstatus_c,
      pstatus_nt,
      pid_contenedor,
      pid,
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
            insertId: rows[0].insertid,
            nro_quote: rows[0].nro_quote,
            msg: "Cotización ingresada con el número " + rows[0].nro_quote,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
          });
        }
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

export const setPath = async (req: Request, res: Response) => {
  const { id_quote, name, type, size, path } = req.body;
  await pool.query(
    "INSERT INTO Table_Path (id_quote, name, type, size, path, status) VALUES($1,$2,$3,$4,$5,$6)",
    [id_quote, name, type, size, path, 1],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
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

export const putPath = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;
  await pool.query(
    "UPDATE Table_Path SET name = $1 where id = $2",
    [name, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
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

export const deletePath = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query(
    "UPDATE Table_Path SET status = 0 where id = $1",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
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
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
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

export const getCalls = async (req: Request, res: Response) => {
  const { id_branch, id_quote } = req.body;

  await pool.query(
    "select * from  QUOTE_CALLS_LISTAR($1, null,$2); ",
    [id_branch, id_quote],

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

export const getCallsId = async (req: Request, res: Response) => {
  const id = req.params.id;
  await pool.query(
    "select * from  QUOTE_CALLS_LISTAR($1, $2,null);",
    [req.body.id_branch, id],
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
export const getQuoteCalls = async (req: Request, res: Response) => {
  const id = req.params.id;
  await pool.query(
    "select * from  QUOTE_CALLS_LISTAR($1, null,null);",
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

export const getInstructivoId = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM view_QuoteInstructivoData($1);",
    [req.params.id_quote],
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

export const getMarketingList = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_MARKETING_LIST($1)",
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

export const getModulesEntities = async (req: Request, res: Response) => {
  const { id_module, id_branch } = req.body;
  await pool.query(
    "SELECT * FROM ModulesEntities_list($1,$2)",
    [id_branch, id_module],
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
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estado: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
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

export const ActualizarFolderOneDrive = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_quote_updatefolderonedrive($1,$2)",
    [req.body.id, req.body.url],
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

export const cargarMasterDetalleImpuestos = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'IMP')",
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
export const quoteDataHouse = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_quote_data_house($1)",
    [req.query.id_quote],
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

export const listadoCotizacionMercadeo = async (
  req: Request,
  res: Response
) => {
  let { filtro, id_branch } = req.body;

  await pool.query(
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
    ],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        if (!!rows[0].estadoflag) {
          let lstTotalPorDia = rows[0].lsttotaldia;
          let lstmarketing = rows;
          let sucursal = rows[0].trade_name_sucursal;

          const countByStatus = {};

          // Itera a través del array y cuenta los estados
          for (const item of rows) {
            const status = item.namemarketing;
            if (countByStatus[status]) {
              countByStatus[status] += 1;
            } else {
              countByStatus[status] = 1;
            }
          }
          // ------------------------
          // let countByStatusArray = Object.values(countByStatus);
          const countByActivosArray = Object.entries(countByStatus).map(
            ([name, cantidad]) => ({ name, cantidad })
          );

          // console.log(lstTotalPorDia);

          // ------------------------
          ejs.renderFile(
            path.join(__dirname, "../views/", "pdfQuoteMarketing.ejs"),

            {
              sucursal,
              countByActivosArray,
              lstmarketing,
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
                    "files/pdfQuoteMarketing.pdf",
                    function (err: any, data: any) {
                      if (err) {
                        res.send(err);
                      } else {
                        res.download("/pdfQuoteMarketing.pdf");
                        res.send({
                          estadoflag: true,
                          msg: "File created successfully",
                          path: path.join("pdfQuoteMarketing.pdf"),
                        });
                      }
                    }
                  );
              }
            }
          );
        } else {
          res.send({
            estadoflag: false,
            msg: "No se encontraron registros",
            // path: path.join("pdfQuoteMarketing.pdf"),
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const quotePreviewTotales = async (req: Request, res: Response) => {
  let {
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
    totalImpuestosIGV,
    totalFlete,
    totalLocales,
    totalAduanas,
    totalAlmacenes,
    totalServicios,
    total,
    iso_pais,
    numerobultos,
    peso,
    volumen,
    pais,
  } = req.body;
  let fecha = moment().format("DD-MM-YYYY");

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
  ejs.renderFile(
    path.join(__dirname, "../views/", "quoteDetallado.ejs"),
    {
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
      conceptos,
      sentido,
      embarque,
      icoterm,
      datosFlete,
      datosLocales,
      datosAduanas,
      datosAlmacenes,
      totalImpuestosIGV,
      totalFlete,
      totalLocales,
      totalAduanas,
      totalAlmacenes,
      totalServicios,
      total,
      iso_pais,
      pais,
    },

    (err: any, data: any) => {
      if (err) {
        // res.send(err);
        console.log(err);
      } else {
        let options = {
          page_size: "A4",
          header: {
            height: "15mm",
          },
        };

        pdf
          .create(data, options)
          .toFile("files/COTIZACION.pdf", function (err: any, data: any) {
            if (err) {
              res.send(err);
            } else {
              res.download("/COTIZACION.pdf");
              res.send({
                estadoflag: true,
                msg: "File created successfully",
                path: path.join("COTIZACION.pdf"),
              });
            }
          });
      }
    }
  );
};

export const aprobarCotizacion = async (req: Request, res: Response) => {
  let { id_quote, nuevoexpediente, id_exp ,fecha_validez} = req.body;
  await pool.query(
    "SELECT * FROM function_aprobar_cotizacion($1,$2,$3,$4);",
    [
      id_quote ? id_quote : null,
      nuevoexpediente ? nuevoexpediente : null,
      id_exp ? id_exp : null,
      fecha_validez ? fecha_validez : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
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
  if (!!numerobultos) {
    serv.push({
      name: "Nro Bultos",
      estado: numerobultos,
    });
  }
  if (!!peso) {
    serv.push({
      name: "Peso",
      estado: peso,
    });
  }
  if (!!volumen) {
    serv.push({
      name: "Volumen",
      estado: volumen,
    });
  }
  // console.log(serv);
  return serv;
}
