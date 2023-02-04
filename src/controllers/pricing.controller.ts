import { Request, Response } from "express";
// import { connect } from "../routes/database";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const setQuote = async (req: Request, res: Response) => {
  const dataObj = req.body;

  const serviciocotizacion = dataObj.serviciocotizacion;
  const costocotizacion = dataObj.costocotizacion;
  const notacosto = dataObj.notacosto;
  const contenedores = dataObj.contenedores;
  const ventascasillerodetalles = dataObj.ventascasillerodetalles;
  const impuestos = dataObj.impuestos;
  // --------------------------
  let ID_BEGEND_s = serviciocotizacion.map((item: any) => {
    return item.idBegEnd;
  });
  let NAMESERVICE_s = serviciocotizacion.map((item: any) => {
    return item.nameservice;
  });
  let CODEGROUPSERVICES_s = serviciocotizacion.map((item: any) => {
    return item.codegroupservices;
  });
  // -----------------------
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

  // ---------------------
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
  // -----------------------------
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
    return item.esincluyeflag;
  });
  let statusNoIncluye_nc = notacosto.map((item: any) => {
    return item.esnoincluyeflag;
  });

  await pool.query(
    "SELECT * FROM table_quote_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59)",
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
  await pool.query(
    "select * from TABLE_QUOTE_list($1,null,null,null)",
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

export const getQuoteId = async (req: Request, res: Response) => {
  const { id } = req.body;
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
    return item.id_begend;
  });
  let NAMESERVICE_s = serviciocotizacion.map((item: any) => {
    return item.nameservice;
  });
  let CODEGROUPSERVICES_s = serviciocotizacion.map((item: any) => {
    return item.codegroupservices;
  });
  // -----------------------
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

  // ---------------------
  let id_proveedor_cc = costocotizacion.map((item: any) => {
    return item.id_proveedor;
  });
  let id_multiplicador_cc = costocotizacion.map((item: any) => {
    return item.id_multiplicador;
  });
  let concepto_cc = costocotizacion.map((item: any) => {
    return item.nameservice;
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
    return item.ubptotal;
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
  // -----------------------------
  let id_containers_c = contenedores.map((item: any) => {
    return item.id_contenedor == undefined ? null : item.id_contenedor;
  });
  let quantity_c = contenedores.map((item: any) => {
    return item.quantity;
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
    return item.description;
  });
  let statusPrincipal_nc = notacosto.map((item: any) => {
    return item.esprincipalflag;
  });
  let statusIncluye_nc = notacosto.map((item: any) => {
    return item.esincluyeflag;
  });
  let statusNoIncluye_nc = notacosto.map((item: any) => {
    return item.esnoincluyeflag;
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
    return item.statusService == true || item.statusService == 1 ? 1 : 0;
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
      dataObj.statusquote ? dataObj.statusquote : null,
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

// export const putQuote = async (req: Request, res: Response) => {
//

//   const dataObj: postPricing = req.body;
//   const id_quote = req.params.id_quote;

//   await conn.query(
//     "SELECT * FROM view_listQuoteGet where id = ?",
//     [id_quote],
//     (err, row, fields) => {
//       if (!err) {
//         var datarow = JSON.parse(JSON.stringify(row));

//         console.log("paso 1");
//         conn.query(
//           "UPDATE Table_Quote set id_marketing = ?, id_entitie = ?, id_modality = ?, id_shipment = ?, id_incoterms = ?, id_port_begin = ?, id_port_end = ?, nro_bultos = ?, peso = ?, volumen = ?, monto = ?, statusQuote = ?, id_vendedor = ?, descripcionMercancia = ?, idProvincia = ?, idDistrito = ?, fullflag = ?, seguro = ?, proveedor = ?, telefonoproveedor = ?, direccionproveedor = ?, date_end = ?, tiempo_transito = ?, ganancia = ? , id_pricing = ? where id = ?",
//           [
//             dataObj.id_marketing,
//             dataObj.id_entitie,
//             dataObj.idsentido,
//             dataObj.idtipocarga,
//             dataObj.idincoterms,
//             dataObj.idorigen,
//             dataObj.iddestino,
//             dataObj.numerobultos,
//             dataObj.peso,
//             dataObj.volumen,
//             dataObj.monto,
//             dataObj.statusQuote,
//             dataObj.idVendedor,
//             dataObj.descripcionMercancia,
//             dataObj.idProvincia,
//             dataObj.idDistrito,
//             dataObj.fullflag,

//             dataObj.seguro,
//             dataObj.proveedor,
//             dataObj.telefonoproveedor,
//             dataObj.direccionproveedor,
//             dataObj.fecha_fin,
//             dataObj.tiempo_transito,
//             dataObj.ganancia,
//             dataObj.idPricing,
//             id_quote,
//           ],
//           (err, rowssss, fields) => {
//             if (!err) {
//               var dataquote = JSON.parse(JSON.stringify(rowssss));

//               if (dataObj.impuestos) {
//                 dataObj.impuestos.map((item: any) => {
//                   if (item.id) {
//                     conn.query(
//                       "update Quote_Taxes set type =?, name=?, percentage =?, valor =?, orden =? where id = ?",
//                       [
//                         item.type,
//                         item.name,
//                         item.percentage,
//                         item.valor,
//                         item.orden,
//                         item.id,
//                       ],
//                       (err, rowsssss, fields) => {
//                         if (!err) {
//                         } else {
//                           console.log(err);
//                         }
//                       }
//                     );
//                   } else {
//                     conn.query(
//                       "INSERT INTO Quote_Taxes (id_quote, type, name, percentage, valor, orden) VALUES (?,?,?,?,?,?)",
//                       [
//                         id_quote,
//                         item.type,
//                         item.name,
//                         item.percentage,
//                         item.valor,
//                         item.orden,
//                       ],
//                       (err, rowsssss, fields) => {
//                         if (!err) {
//                         } else {
//                           console.log(err);
//                         }
//                       }
//                     );
//                   }
//                 });
//               }

//               if (dataObj.statusUpdated == false) {
//                 dataObj.serviciocotizacion.map((item: any) => {
//                   if (item.id > 0) {
//                     conn.query(
//                       "UPDATE Quote_Services SET id_begend = ?, nameService = ?, status = ? where id = ?",
//                       [
//                         item.idBegEnd,
//                         item.nameService,
//                         item.statusService,
//                         item.id,
//                       ],
//                       (err, rowsssss, fields) => {
//                         if (!err) {
//                         } else {
//                           console.log(err);
//                         }
//                       }
//                     );
//                   } else {
//                     conn.query(
//                       "INSERT INTO Quote_Services (id_quote, id_begend, nameService, codeGroupServices, status) VALUES (?,?,?,?,?)",
//                       [
//                         id_quote,
//                         item.idBegEnd,
//                         item.nameService,
//                         item.codeGroupServices,
//                         item.statusService,
//                       ],
//                       (err, rowsssss, fields) => {
//                         if (!err) {
//                         } else {
//                           console.log(err);
//                         }
//                       }
//                     );
//                   }
//                 });
//               } else if (dataObj.statusUpdated == true) {
//                 conn.query(
//                   "DELETE FROM Quote_Services where id_quote = ?",
//                   [id_quote],
//                   (err, rowsssss, fields) => {
//                     if (!err) {
//                       dataObj.serviciocotizacion.map((item: any) => {
//                         conn.query(
//                           "INSERT INTO Quote_Services (id_quote, id_begend, nameService, codeGroupServices, status) VALUES (?,?,?,?,?)",
//                           [
//                             id_quote,
//                             item.idBegEnd,
//                             item.nameService,
//                             item.codeGroupServices,
//                             item.statusService,
//                           ],
//                           (err, rowsssss, fields) => {
//                             if (!err) {
//                             } else {
//                               console.log(err);
//                             }
//                           }
//                         );
//                       });
//                     } else {
//                     }
//                   }
//                 );
//               }

//               if (dataObj.statusUpdated == false) {
//                 dataObj.costocotizacion.map((item: any) => {
//                   if (item.id > 0) {
//                     conn.query(
//                       "UPDATE Quote_Cost set id_proveedor = ?, id_multiplicador = ?, concepto = ?, costounitario = ?, cif = ?, seguro = ?, subtotal =?, esorigenflag = ?, eslocalflag = ?, esaduanaflag = ?, esalmacenflag = ?, esopcionflag = ?, esventaflag = ?, status = ? where id = ?",
//                       [
//                         item.id_proveedor,
//                         item.id_multiplicador,
//                         item.nameService,
//                         item.costounitario,
//                         item.cif,
//                         item.seguro,
//                         item.subtotal,
//                         item.esorigenflag,
//                         item.eslocalflag,
//                         item.esaduanaflag,
//                         item.esalmacenflag,

//                         item.esopcionflag,
//                         item.esventaflag,
//                         item.status,
//                         item.id,
//                       ],
//                       (err, rowsssss, fields) => {
//                         if (!err) {
//                         } else {
//                           console.log(err);
//                         }
//                       }
//                     );
//                   } else {
//                     conn.query(
//                       "INSERT INTO Quote_Cost (id_quote, id_proveedor, id_multiplicador, concepto, costounitario, cif, seguro, subtotal, esorigenflag, eslocalflag, esaduanaflag, esalmacenflag, esopcionflag, esventaflag, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//                       [
//                         id_quote,
//                         item.id_proveedor,
//                         item.id_multiplicador,
//                         item.nameService,
//                         item.costounitario,
//                         item.cif,
//                         item.seguro,
//                         item.subtotal,
//                         item.esorigenflag,
//                         item.eslocalflag,
//                         item.esaduanaflag,
//                         item.esalmacenflag,
//                         item.esopcionflag,
//                         item.esventaflag,
//                         item.status,
//                       ],
//                       (err, rowsssss, fields) => {
//                         if (!err) {
//                         } else {
//                           console.log(err);
//                         }
//                       }
//                     );
//                   }
//                 });
//               } else if (dataObj.statusUpdated == true) {
//                 conn.query(
//                   "DELETE FROM Quote_Cost where id_quote = ?",
//                   [id_quote],
//                   (err, rowsssss, fields) => {
//                     if (!err) {
//                       dataObj.costocotizacion.map((item: any) => {
//                         conn.query(
//                           "INSERT INTO Quote_Cost (id_quote, id_proveedor, id_multiplicador, concepto, costounitario, cif, seguro, subtotal, esorigenflag, eslocalflag, esaduanaflag, esalmacenflag, esopcionflag, esventaflag, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//                           [
//                             id_quote,
//                             item.id_proveedor,
//                             item.id_multiplicador,
//                             item.nameService,
//                             item.costounitario,
//                             item.cif,
//                             item.seguro,
//                             item.subtotal,
//                             item.esorigenflag,
//                             item.eslocalflag,
//                             item.esaduanaflag,
//                             item.esalmacenflag,
//                             item.esopcionflag,
//                             item.esventaflag,
//                             item.status,
//                           ],
//                           (err, rowsssss, fields) => {
//                             if (!err) {
//                             } else {
//                               console.log(err);
//                             }
//                           }
//                         );
//                       });
//                     } else {
//                     }
//                   }
//                 );
//               }

//               dataObj.contenedores.map((item: any) => {
//                 if (item.id) {
//                   conn.query(
//                     "UPDATE Quote_Containers set id_containers = ?, quantity = ? where id = ?",
//                     [item.id_contenedor, item.cantidad, item.id],
//                     (err, rowsssss, fields) => {
//                       if (!err) {
//                       } else {
//                         console.log(err);
//                       }
//                     }
//                   );
//                 } else {
//                   conn.query(
//                     "INSERT INTO Quote_Containers (id_quote, id_containers, quantity) VALUES (?,?,?)",
//                     [id_quote, item.id_contenedor, item.cantidad],
//                     (err, rowsssss, fields) => {
//                       if (!err) {
//                       } else {
//                         console.log(err);
//                       }
//                     }
//                   );
//                 }
//               });

//               if (dataObj.ventascasillerodetalles) {
//                 dataObj.ventascasillerodetalles.map((item: any) => {
//                   if (item.id) {
//                     conn.query(
//                       "UPDATE Quote_SalesDetails set id_quoteSales = ?, description = ?, monto = ?, status= ? where id = ?",
//                       [
//                         item.id_quoteSales,
//                         item.description,
//                         item.monto,
//                         item.status,
//                         item.id,
//                       ],
//                       (err, rowsssss, fields) => {
//                         if (!err) {
//                         } else {
//                           console.log(err);
//                         }
//                       }
//                     );
//                   } else {
//                     conn.query(
//                       "INSERT INTO Quote_SalesDetails (id_quote, id_quoteSales, description, monto, status) VALUES (?,?,?,?,?)",
//                       [
//                         id_quote,
//                         item.id_quoteSales,
//                         item.description,
//                         item.monto,
//                         item.status,
//                       ],
//                       (err, rowsssss, fields) => {
//                         if (!err) {
//                         } else {
//                           console.log(err);
//                         }
//                       }
//                     );
//                   }
//                 });
//               }

//               dataObj.notacosto.map((item: any) => {
//                 if (item.id) {
//                   conn.query(
//                     "UPDATE Quote_NotesCost set description = ?, statusPrincipal = ?, statusIncluye = ?, statusNoIncluye = ?, status = ? WHERE id = ?",
//                     [
//                       item.description,
//                       item.esprincipalflag,
//                       item.esincluyeflag,
//                       item.esnoincluyeflag,
//                       item.status,
//                       item.id,
//                     ],
//                     (err, rowsssss, fields) => {
//                       if (!err) {
//                       } else {
//                         console.log(err);
//                       }
//                     }
//                   );
//                 } else {
//                   conn.query(
//                     "INSERT INTO Quote_NotesCost (id_quote, description, statusPrincipal, statusIncluye, statusNoIncluye, status) VALUES (?,?,?,?,?,?)",
//                     [
//                       id_quote,
//                       item.description,
//                       item.esprincipalflag,
//                       item.esincluyeflag,
//                       item.esnoincluyeflag,
//                       item.status,
//                     ],
//                     (err, rowsssss, fields) => {
//                       if (!err) {
//                       } else {
//                         console.log(err);
//                       }
//                     }
//                   );
//                 }
//               });

//               res.json({
//                 status: 200,
//                 statusBol: true,
//                 msg: "Cotizacion " + datarow[0].quote + " actualizada",
//               });
//             } else {
//               console.log(err);
//             }
//           }
//         );
//       } else {
//         console.log(err);
//       }
//       setTimeout(() => {}, 9000);
//       //
//     }
//   );
// };

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
// export const getInstructivoId = async (req: Request, res: Response) => {
//
//   const id = req.params.id_quote;
//   conn.query(
//     "SELECT * FROM view_QuoteInstructivoData where id = ?",
//     [id],
//     (err, rows, fields) => {
//       if (!err) {
//         let data = JSON.parse(JSON.stringify(rows));
//         let dataServiceList;
//         let datanew: Array<any> = [];
//         datanew.push({
//           id: data[0].id,
//           quote: data[0].quote,
//           expediente: data[0].expediente,
//           cliente: {
//             nombre: data[0].nombre,
//             direccion: data[0].direccion,
//             ruc: data[0].ruc,
//             contacto: data[0].contacto,
//             vendedor: data[0].nameLong,
//             origen: data[0].origen,
//             destino: data[0].destino,
//             sentido: data[0].sentido,
//             carga: data[0].carga,
//             fiscal: data[0].fiscal,
//             incoterms: data[0].incoterms,
//             direccionporigen: data[0].direccionporigen,
//             proveedor: data[0].proveedor,
//           },
//         });

//         conn.query(
//           "SELECT * FROM view_QuoteInstructivoVentas where id_quote = ?",
//           [id],
//           (err, rowss, fields) => {
//             datanew.push({
//               ventas: rowss,
//             });
//           }
//         );

//         conn.query(
//           "SELECT * FROM view_QuoteInstructivoCostos where id_quote = ?",
//           [id],
//           (err, rowssss, fields) => {
//             datanew.push({
//               costos: rowssss,
//             });
//           }
//         );

//         conn.query(
//           "SELECT * FROM view_QuoteInstructivoServices where id_quote = ?",
//           [id],
//           (err, rowsss, fields) => {
//             datanew.push({
//               servicios: rowsss,
//             });
//           }
//         );

//         conn.query(
//           "SELECT * FROM view_QuoteInstructivoNotes where id_quote = ?",
//           [id],
//           (err, rowssss, fields) => {
//             datanew.push({
//               Notas: rowssss,
//             });
//             setTimeout(function () {
//               res.json({
//                 status: 200,
//                 statusBol: true,
//                 data: datanew,
//               });
//             }, 900);
//           }
//         );
//       } else {
//         console.log(err);
//       }
//     }
//   );
// };

// export const putInstructivo = async (req: Request, res: Response) => {
//

//   const { fiscal, direccionorigen, notas, proveedor } = req.body;
//   const id_quote = req.params.id_quote;

//   conn.query(
//     "UPDATE Table_Quote set fiscal = ?, direccionorigen = ?, proveedor = ? where id = ?",
//     [fiscal, direccionorigen, proveedor, id_quote],
//     (err, rowssss, fields) => {
//       if (!err) {
//         var dataquote = JSON.parse(JSON.stringify(rowssss));
//         console.log("paso 4");
//         notas.map((item: any) => {
//           conn.query(
//             "INSERT INTO Quote_Notes (id_quote, name, status) VALUES (?,?,?)",
//             [id_quote, item.description, item.status],
//             (err, rowsssss, fields) => {
//               if (!err) {
//               } else {
//                 console.log(err);
//               }
//             }
//           );
//         });

//         res.json({
//           status: 200,
//           statusBol: true,
//           msg: {
//             textMesg: "Notas agregadas correctamente",
//           },
//         });
//       } else {
//         res.json({
//           status: 200,
//           statusBol: true,
//           error: err,
//         });
//       }
//     }
//   );
// };

// export const getQuoteCalls = async (req: Request, res: Response) => {
//
//   await conn.query(
//     `SELECT * FROM view_quoteCalls WHERE id_branch = ${
//       req.body.id_branch ? req.body.id_branch : "id_branch"
//     } `,
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
