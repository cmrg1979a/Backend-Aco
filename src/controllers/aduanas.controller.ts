import { Request, response, Response } from "express";
import { conexion } from "../routes/databasePGOp";
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";

export const obtenerListadoServiciosAduanaQuote = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM functio_listar_servicioaduanas($1)",
    [req.query.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const setAduana = async (req: Request, res: Response) => {
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
    "SELECT * FROM table_aduana_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35)",
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

export const getAduanaList = async (req: Request, res: Response) => {
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
    "select * from table_aduana_list($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
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

export const getAduanaVer = async (req: Request, res: Response) => {
  const { id } = req.query;
  await pool.query(
    "select * from table_aduana_ver($1);",
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

export const actualizarAduana = async (req: Request, res: Response) => {
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
    "SELECT * FROM table_aduana_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36)",
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
    (err, response, fields) => {
      if (!err) {
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

export const obtenerCotizacionParaUnificar = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_cargarcotizacionunificar($1)",
    [req.query.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const obtenerAduanaParaUnificar = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_cargaradunaunificar($1)",
    [req.query.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const aduanaUnificar = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "SELECT * FROM function_quote_unificar($1,$2)",
    [dataObj.id_quote, dataObj.id_aduana],
    (err, response, fields) => {
      if (!err) {
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

export const updateAduanaRecibidoEnviado = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);
  await pool.query(
    "SELECT * FROM function_aduana_actualizar_recibido_enviado($1,$2,$3,$4,$5,$6,$7)",
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

export const setCallsAduana = async (req: Request, res: Response) => {
  const { id_quote, fecha, id_operador, comentario } = req.body;
  await pool.query(
    "select * from aduana_calls_insertar($1,$2,$3,$4)",
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

export const getListCallsAduana = async (req: Request, res: Response) => {
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
    "select * from lista_llamadas_aduana($1,$2,$3,$4,$5,$6,$7,$8)",
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

export const aprobarCotizacionAduana = async (req: Request, res: Response) => {
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
  } = req.body;
  let Descripcion = ["SubTotal", "TOTAL"];
  await pool.query(
    "SELECT * FROM function_aprobar_cotizacionaduana($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);",
    [
      id_quote ? id_quote : null,
      nuevoexpediente ? nuevoexpediente : null,
      id_exp ? id_exp : null,
      fecha_validez ? fecha_validez : null,
      igvIngreso ? igvIngreso : null,
      valorIngreso ? valorIngreso : null,
      totalIngreso ? totalIngreso : 0,
      id_house,
      id_opcion,
      JSON.stringify(listCostosInstructivo.filter((item) => item.id)),
      JSON.stringify(
        listVentasInstructivo.filter(
          (item) => !/^(TOTAL|SubTotal)$/i.test(item.descripcion.trim())
        )
      ),
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

export const cargarListadoQuoteAduana = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_cargar_quoteaduana($1)",
    [req.query.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getInstructivoIdAduana = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM view_quoteinstructivodataAduana($1);",
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
