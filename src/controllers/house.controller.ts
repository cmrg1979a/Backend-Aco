import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
import fs from "fs";
const nodemailer = require("nodemailer");
const moment = require("moment");
const pool = conexion();
const mime = require("mime-types");
const axios = require("axios");
var xl = require("excel4node");
import ExcelJS from "exceljs";
import path from "path";

import { envioCorreo } from "../middleware/EnvioCorreoMiddleware";

export const setHouse = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "SELECT * FROM table_housecontrol_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)",
    [
      dataObj.id_master ? dataObj.id_master : null,
      dataObj.nro_house ? dataObj.nro_house : null,
      dataObj.code_house ? dataObj.code_house : null,
      dataObj.id_cot ? dataObj.id_cot : null,
      dataObj.id_modality ? dataObj.id_modality : null,
      dataObj.id_shipment ? dataObj.id_shipment : null,
      dataObj.id_port_begin ? dataObj.id_port_begin : null,
      dataObj.id_port_end ? dataObj.id_port_end : null,
      dataObj.id_agent ? dataObj.id_agent : null,
      dataObj.id_consigner ? dataObj.id_consigner : null,
      dataObj.id_notify ? dataObj.id_notify : null,
      dataObj.id_aerolinea ? dataObj.id_aerolinea : null,
      dataObj.id_coloader ? dataObj.id_coloader : null,
      dataObj.id_naviera ? dataObj.id_naviera : null,
      dataObj.id_incoterms ? dataObj.id_incoterms : null,
      dataObj.nro_hbl ? dataObj.nro_hbl : null,
      dataObj.id_motonave ? dataObj.id_motonave : null,
      dataObj.nro_viaje ? dataObj.nro_viaje : null,
      dataObj.bultos ? dataObj.bultos : null,
      dataObj.peso ? dataObj.peso : null,
      dataObj.volumen ? dataObj.volumen : null,
      dataObj.id_conditions ? dataObj.id_conditions : null,
      dataObj.id_moneda ? dataObj.id_moneda : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.id_consigner_real ? dataObj.id_consigner_real : null,
    ],
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

export const getHouseList = async (req: Request, res: Response) => {
  const { id_master } = req.body;
  const { id_branch } = req.body;

  await pool.query(
    "SELECT * FROM TABLE_HOUSECONTROL_listar($1,$2);",
    [id_branch, id_master],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getHouseListAll = async (req: Request, res: Response) => {
  const {
    id_branch,
    id_master,
    id_sentido,
    id_tipo_embarque,
    id_origen,
    id_destino,
    id_cliente,
    fecha_etd,
    fecha_eta,
    pagina,
    limite,
    orden,
    busqueda,
  } = req.query;
  // console.log(req.query)

  await pool.query(
    "SELECT * FROM Table_HouseControl_listarall($1,null,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);",
    [
      id_branch,
      id_master || null,
      id_sentido || null,
      id_tipo_embarque || null,
      id_origen || null,
      id_destino || null,
      id_cliente || null,
      fecha_etd || null,
      fecha_eta || null,
      pagina || null,
      limite || null,
      orden || null,
      busqueda || null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getTotalHouseListAll = async (req: Request, res: Response) => {
  const {
    id_branch,
    id_master,
    id_sentido,
    id_tipo_embarque,
    id_origen,
    id_destino,
    id_cliente,
    fecha_etd,
    fecha_eta,
    busqueda,
  } = req.query;
  // console.log(req.query)

  await pool.query(
    "SELECT * FROM Table_HouseControl_consultar_total($1,null,$2,$3,$4,$5,$6,$7,$8,$9,$10);",
    [
      id_branch,
      id_master || null,
      id_sentido || null,
      id_tipo_embarque || null,
      id_origen || null,
      id_destino || null,
      id_cliente || null,
      fecha_etd || null,
      fecha_eta || null,
      busqueda || null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          total: rows[0].total,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getHouseListId = async (req: Request, res: Response) => {
  const { id, id_branch } = req.body;

  await pool.query(
    "SELECT * FROM Table_HouseControl_listarall($1,$2,null,null,null,null,null,null,null,null,null,null,null,null)",
    [id_branch, id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getHouseServices = async (req: Request, res: Response) => {
  const { id } = req.body;

  await pool.query(
    "SELECT * FROM HOUSE_SERVICES_LISTArxhouse($1) ",
    [id],
    // [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getServicesByIncoterms = async (req: Request, res: Response) => {
  const { id_modality, id_shipment, id_incoterms, id_branch } = req.body;

  await pool.query(
    "SELECT * FROM function_services_x_incoterms_listar($1,$2,$3,$4)",
    [id_modality, id_shipment, id_incoterms, id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getHouseBitacora = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query(
    "SELECT * FROM house_bitacora_listarxhouse($1);",
    [id],
    // [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getHouseContainers = async (req: Request, res: Response) => {
  const { id } = req.query;
  await pool.query(
    " select * from HOUSE_CONTAINERS_listarxhouse($1)",
    [id],
    // [req.body.id_branch],
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

export const setHouseEdit = async (req: Request, res: Response) => {
  const dataObj = req.body;
  const id = req.params.id;

  await pool.query(
    "select function_housecontrol_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)",
    [
      dataObj.id,
      dataObj.id_cot ? dataObj.id_cot : null,
      dataObj.id_proveedor ? dataObj.id_proveedor : null,
      dataObj.id_consigner ? dataObj.id_consigner : null,
      dataObj.id_notify ? dataObj.id_notify : null,
      dataObj.id_aerolinea ? dataObj.id_aerolinea : null,
      dataObj.id_coloader ? dataObj.id_coloader : null,
      dataObj.id_naviera ? dataObj.id_naviera : null,
      dataObj.id_incoterms ? dataObj.id_incoterms : null,
      dataObj.nro_hbl ? dataObj.nro_hbl : null,
      dataObj.id_motonave ? dataObj.id_motonave : null,
      dataObj.nro_viaje ? dataObj.nro_viaje : null,
      dataObj.bultos ? dataObj.bultos : null,
      dataObj.peso ? dataObj.peso : null,
      dataObj.volumen ? dataObj.volumen : null,
      dataObj.id_conditions ? dataObj.id_conditions : null,
      dataObj.id_moneda ? dataObj.id_moneda : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.id_modality ? dataObj.id_modality : null,
      dataObj.id_shipment ? dataObj.id_shipment : null,
      dataObj.id_consigner_real ? dataObj.id_consigner_real : null,
      dataObj.id_port_begin ? dataObj.id_port_begin : null,
      dataObj.id_port_end ? dataObj.id_port_end : null,
      dataObj.lstservices.map((item: any) => item.id || null),
      dataObj.lstservices.map((item: any) => item.id_begend || null),
      dataObj.lstservices.map((item: any) => item.nameservice || null),
      dataObj.lstservices.map((item: any) => (item.status ? 1 : 0)),
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const setHouseDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  await pool.query(
    "SELECT * FROM function_housecontrol_eliminar($1)",
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

export const insertComentarioHouse = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "SELECT * FROM function_comentariohouse_insertar($1,$2,$3,$4)",
    [
      dataObj.id_house ? dataObj.id_house : null,
      dataObj.id_entities ? dataObj.id_entities : null,
      dataObj.fecha ? dataObj.fecha : null,
      dataObj.comentario ? dataObj.comentario : null,
    ],
    (err, response, fields) => {
      let rows = response.rows;
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const setTrackingToken = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "SELECT * FROM function_housecontrol_tokenrastreo_insertar($1,$2,$3)",
    [
      dataObj.id_house ? dataObj.id_house : null,
      dataObj.token ? dataObj.token : null,
      dataObj.fecha ? dataObj.fecha : null,
    ],
    (err, response, fields) => {
      let rows = response.rows;
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getTrackingData = async (req: Request, res: Response) => {
  const { token } = req.params;

  await pool.query(
    "SELECT * FROM function_estadocarga_consultar($1)",
    [token],
    (err, response, fields) => {
      let rows = response.rows;
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const sendNotificacionHouse = async (req: Request, res: Response) => {
  const { id, cuentasBancarias, id_branch, notificacion, token } = req.body;
  let url = global.path_url + "tracking/";
  const response = await pool.query(
    "SELECT * FROM function_generar_mail_aviso($1, $2, $3, $4,$5)",
    [id, notificacion, id_branch, cuentasBancarias, url]
  );
  const data = response.rows[0];

  if (!data) {
    return res.status(404).json({
      status: 404,
      statusBol: false,
      mensaje: "No se encontró información",
    });
  }
  data.tipoNotificacion = notificacion;
  await sendCorreo(data).catch((error) => {
    console.log(error);

    res.status(500);
  });

  res.json({
    status: 200,
    statusBol: true,
    token: renewTokenMiddleware(req),
  });
};

// async function sendCorreo(data) {
//   const transporter = nodemailer.createTransport({
//     host: "p3plzcpnl505059.prod.phx3.secureserver.net", // "mail.pic-cargo.com"
//     port: 465, // 465
//     secure: true,
//     auth: {
//       user: "sistema1@piccargo.com", // "sistema1@pic-cargo.com" // "testkaysen@gmail.com"
//       pass: "b@+p@f21e48c", // "b@+p@f21e48c", // "csyvzaysfnmntjws", //
//     },
//   });

//   const {
//     user,
//     house,
//     notificacion: {
//       title: tipoNotificacion = "",
//       value: indiceNotificacion = 0,
//     },
//     sentido,
//     tipoEmbarque,
//     cuentasBancarias,
//     razonSocial = "",
//   } = data;

//   let tabla = "";
//   if (tipoEmbarque == "Aéreo" || tipoEmbarque == "LCL") {
//     tabla += `
//       <table border="1" cellspacing="0" style="width:600px; margin:auto;">
//         <thead>
//           <tr>
//             <th colspan="2" style="text-align:center; padding:.25rem .5rem;">Datos de la Carga</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Peso</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.peso ? `${house.peso}Kg` : ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Volumen</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.volumen ? `${house.volumen}m3` : ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Nro. Bultos</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.bultos || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Origen</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.namelongportbegin || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Destino</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.namelongportend || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Proveedor</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.nameproveedor || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Nro. BL / Nro. Guía Aérea</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.nro_hbl || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Monto Servicio Logístico Cotizado</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">USD ${
//               house.monto || ""
//             }</td>
//           </tr>
//         </tbody>
//       </table>
//     `;
//   } else if (tipoEmbarque == "FCL") {
//     tabla += `
//       <table border="1" cellspacing="0" style="width:600px; margin:auto;">
//         <thead>
//           <tr>
//             <th colspan="2" style="text-align:center; padding:.25rem .5rem;">Datos de la Carga</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Contenedores</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.list_containers
//                 .map((item) => `${item.namecontainer} (${item.cantidad})`)
//                 .join(", ") || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Origen</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.namelongportbegin || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Destino</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.namelongportend || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Proveedor</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.nameproveedor || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Nro. BL / Nro. Guía Aérea</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">${
//               house.nro_hbl || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="width:50%; padding:.25rem .5rem;"><b>Monto Servicio Logístico Cotizado</b></td>
//             <td style="width:50%; padding:.25rem .5rem;">USD ${
//               house.monto || ""
//             }</td>
//           </tr>
//         </tbody>
//       </table>
//     `;
//   }

//   let fechaETD_parseada = house.fecha_etd
//     ? moment(house.fecha_etd).format("D [de] MMMM")
//     : "";
//   let fechaETA_parseada = house.fecha_eta
//     ? moment(house.fecha_eta).format("D [de] MMMM")
//     : "";
//   let descripcionNotificacion = "";
//   if (sentido == "Import") {
//     switch (indiceNotificacion) {
//       case 1: // Aviso de Salida
//         descripcionNotificacion = `te notificamos que tu carga salió el día ${fechaETD_parseada}.`;
//         break;
//       case 2: // Actualización de Salida
//         descripcionNotificacion = `te notificamos que por motivos operacionales, tu carga se estima salir el día ${fechaETD_parseada}.`;
//         break;
//       case 3: // Pre - Aviso de Llegada
//         descripcionNotificacion = `te notificamos que tu carga va a llegar el día ${fechaETA_parseada}.`;
//         break;
//       case 4: // Aviso de Llegada
//         descripcionNotificacion = "te notificamos que tu carga ya llegó.";
//         break;
//       case 5: // Actualización de Llegada
//         descripcionNotificacion = `te notificamos que, por motivos operacionales, tu carga se estima llegar el día ${fechaETA_parseada}.`;
//         break;
//     }
//   } else if (sentido == "Export") {
//     switch (indiceNotificacion) {
//       case 1: // Aviso de Salida
//         descripcionNotificacion = `te notificamos que tu carga salió el día ${fechaETA_parseada}.`;
//         break;
//       case 2: // Actualización de Salida
//         descripcionNotificacion = `te notificamos que por motivos operacionales, tu carga se estima salir el día ${fechaETA_parseada}.`;
//         break;
//       case 3: // Aviso de Llegada
//         descripcionNotificacion = "te notificamos que tu carga ya llegó.";
//         break;
//     }
//   } else {
//     switch (indiceNotificacion) {
//       case 1: // Notificación de Salida
//         descripcionNotificacion = `te notificamos que tu carga salió el día ${fechaETD_parseada}.`;
//         break;
//       case 2: // Pre - Aviso de Llegada
//         descripcionNotificacion = `te notificamos que tu carga va a llegar el día ${fechaETA_parseada}.`;
//         break;
//       case 3: // Aviso de Llegada
//         descripcionNotificacion = "te notificamos que tu carga ya llegó.";
//         break;
//       case 4: // Actualización de Llegada
//         descripcionNotificacion = `te notificamos que, por motivos operacionales, tu carga se estima llegar el día ${fechaETA_parseada}.`;
//         break;
//     }
//   }

//   const mailTemplate = `
//     <div>
//       <div style="text-align: center">
//                 <img
//                   src="https://api-general.qreport.site/uploads/imgLogin.png"
//                   alt="Imagen de Bienvenida"
//                   style="width: 100%; max-width: 550px; height: auto;"
//                 />
//               </div>
//               <br>
//       <div style="float:right;">
//         <p style="text-align:right;">${moment().format(
//           "DD [de] MMMM [de] YYYY"
//         )}</p>
//       </div>
//       <div style="clear:both;"></div>

//       <p>Estimados sr(es): <b>${house.namelongclientefinal}</b></p>
//       <p>Asunto: <b>${tipoNotificacion}</b></p>
//       <p>Datos de su Carga:</p>

//       ${tabla}

//       <br/>
//       <br/>

//       <p>Por medio del presente, ${descripcionNotificacion}</p>

//       <br/>

//       <p>Le recordamos que el servicio logístico que le fue cotizado es un monto de USD ${
//         house.monto || ""
//       }, y lo puede pagar a través de cualquiera de las cuentas bancarias:</p>
//       ${
//         cuentasBancarias
//           .map(
//             (item) => `<p>${item.label.trim()} - CCI: ${item.cci.trim()}.</p>`
//           )
//           .join("") || ""
//       }

//       <br/>
//       <br/>

//       ${
//         house.token_rastreo
//           ? `<p>Si desea consultar el estado de su carga, haga clic en este <a href="${
//               global.path_url
//             }tracking/${house.token_rastreo || ""}">enlace</a></p><br/><br/>`
//           : ""
//       }

//       <p>Atte.: ${house.nameoperador}</p>
//       <p>${razonSocial}</p>
//     </div>
//      <div style="text-align: center; padding: 10px;">
//                 <img
//                   src="https://api-general.qreport.site/uploads/logo-aco.png"
//                   alt="Logo ACO"
//                   style="width: 100%; max-width: 300px; height: auto;"
//                 />
//               </div>
//   `;
//   const mailOptions = {
//     from: '"ACO" <aco@agentedecargaonline.com>',
//     email: house.emailaddress_clientefinal || "",
//     subject: `ACO – ${tipoNotificacion}`,
//     html: mailTemplate,
//   };
//   let respuest = await envioCorreo(mailOptions);
//   console.log(respuest);
// }
async function sendCorreo(data) {
  const transporter = nodemailer.createTransport({
    host: "p3plzcpnl505059.prod.phx3.secureserver.net", // "mail.pic-cargo.com"
    port: 465, // 465
    secure: true,
    auth: {
      user: "sistema1@piccargo.com", // "sistema1@pic-cargo.com" // "testkaysen@gmail.com"
      pass: "b@+p@f21e48c", // "b@+p@f21e48c", // "csyvzaysfnmntjws", //
    },
  });

  // const {
  //   user,
  //   house,
  //   notificacion: {
  //     title: tipoNotificacion = "",
  //     value: indiceNotificacion = 0,
  //   },
  //   sentido,
  //   tipoEmbarque,
  //   cuentasBancarias,
  //   razonSocial = "",
  // } = data;

  const mailTemplate = data.html;

  // ${
  //   house.token_rastreo
  //     ? `<p>Si desea consultar el estado de su carga, haga clic en este <a href="${
  //         global.path_url
  //       }tracking/${house.token_rastreo || ""}">enlace</a></p><br/><br/>`
  //     : ""
  // }
  const mailOptions = {
    from: '"ACO" <aco@agentedecargaonline.com>',
    email: data.email || "",
    subject: `ACO – ${data.tipoNotificacion}`,
    html: mailTemplate,
  };
  let respuest = await envioCorreo(mailOptions);
  console.log(respuest);
}

export const getListarHouses = async (req: Request, res: Response) => {
  const {
    id_branch,
    id_master,
    id_modality,
    id_shipment,
    id_origin,
    id_destino,
    id_cliente,
    fechaetd,
    dechaeta,
  } = req.query;

  await pool.query(
    "SELECT * FROM function_house_listar($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      id_branch ? id_branch : null,
      id_master ? id_master : null,
      id_modality ? id_modality : null,
      id_shipment ? id_shipment : null,
      id_origin ? id_origin : null,
      id_destino ? id_destino : null,
      id_cliente ? id_cliente : null,
      fechaetd ? fechaetd : null,
      dechaeta ? dechaeta : null,
    ],
    (err, response, fields) => {
      let rows = response.rows;
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getVerHouse = async (req: Request, res: Response) => {
  const { id_branch, id } = req.query;
  await pool.query(
    "SELECT * FROM function_house_ver($1)",
    [id],
    (err, response, fields) => {
      let rows = response.rows;
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

// export const generarFormatoBL = async (req: Request, res: Response) => {
//   var wb = new xl.Workbook({
//     dateFormat: "dd/mm/yyyy",
//     author: "PIC CARGO - IMPORTADORES",
//   });
//   await pool.query(
//     "SELECT * from function_export_ingresos($1)",
//     [req.body.id_branch],
//     (err, response, fields) => {
//       if (!err) {
//         let rows = response.rows;

//         let cabTitle = wb.createStyle({
//           font: {
//             color: "#ffffff",
//             bold: true,
//           },
//           fill: {
//             type: "pattern",
//             patternType: "solid",
//             fgColor: "#A43542",
//           },
//           alignment: {
//             vertical: "center",
//             horizontal: "center",
//           },
//         });
//         const fechaActual = moment().format("DD/MM/YYYY");
//         var wt = wb.addWorksheet("FormatoBL");

//         wt.cell(4, 1, 7, 5, true).string("");
//         wt.cell(9, 1, 11, 5, true).string("");
//         wt.cell(13, 1, 18, 5, true).string("");
//         wt.cell(31, 5, 46, 8, true).string("");

//         wt.cell(3, 1, 3, 5, true).string("SHIPPER:");
//         wt.cell(8, 1, 8, 5, true).string("CONSIGNEE:");
//         wt.cell(12, 1, 12, 5, true).string("NOTIFY ADDRESS:");
//         wt.cell(21, 1, 21, 2, true).string("OCEAN  VESSEL");
//         wt.cell(24, 1, 24, 2, true).string("PORT OF DISCHARGE:");
//         wt.cell(28, 1, 28, 2, true).string("MARKS AND No.");

//         wt.cell(19, 4, 19, 5, true).string("PLACE OF RECEPT:");
//         wt.cell(21, 4, 21, 5, true).string("PORT OF LOADING:");
//         wt.cell(24, 4, 24, 5, true).string("PORT OF DELIVERY:");
//         wt.cell(28, 3, 28, 4, true).string("QUANTTY GOODS");
//         wt.cell(28, 5, 28, 6, true).string("DESCRIPTION OF GOODS");
//         wt.cell(28, 9).string("GROSS WEIGTH");
//         wt.cell(28, 10).string("MEASUREMENT");
//         wt.cell(69, 8).string(fechaActual);

//         wt.cell(5, 8).string("B/L No.");
//         wt.cell(49, 8).string("TOTAL");

//         let pathexcel = path.join(`${__dirname}../../../uploads`, "BL.xlsx");
//         wb.write(pathexcel, function (err, stats) {
//           if (err) {
//             console.log(err);
//           } else {
//             res.download(pathexcel);
//           }
//         });
//       }
//     }
//   );
// };

// export const generarFormatoBL = async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(
//       "SELECT * from function_export_ingresos($1)",
//       [req.body.id_branch]
//     );
//     const rows = result.rows;

//     const workbook = new ExcelJS.Workbook();
//     workbook.creator = "PIC CARGO - IMPORTADORES";
//     workbook.created = new Date();

//     const worksheet = workbook.addWorksheet("FormatoBL", {
//       views: [{ showGridLines: false }],
//     });

//     // Configuración básica
//     worksheet.properties.defaultColWidth = 20;

//     // Estilos
//     const cabTitle = {
//       font: { color: { argb: "FFFFFFFF" }, bold: true },
//       fill: {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "A43542" },
//       },
//       alignment: { vertical: "middle", horizontal: "center" },
//     };

//     // Texto en celdas (equivalente a .cell().string())
//     worksheet.mergeCells("A4:E7");
//     worksheet.getCell("A4").value = "";
//     worksheet.mergeCells("A9:E11");
//     worksheet.getCell("A9").value = "";
//     worksheet.mergeCells("A13:E18");
//     worksheet.getCell("A13").value = "";
//     worksheet.mergeCells("E31:H46");
//     worksheet.getCell("E31").value = "";

//     worksheet.mergeCells("A3:E3");
//     worksheet.getCell("A3").value = "SHIPPER:";

//     worksheet.mergeCells("A8:E8");
//     worksheet.getCell("A8").value = "CONSIGNEE:";

//     worksheet.mergeCells("A12:E12");
//     worksheet.getCell("A12").value = "NOTIFY ADDRESS:";

//     worksheet.mergeCells("A21:B21");
//     worksheet.getCell("A21").value = "OCEAN  VESSEL";

//     worksheet.mergeCells("A24:B24");
//     worksheet.getCell("A24").value = "PORT OF DISCHARGE:";

//     worksheet.mergeCells("A28:B28");
//     worksheet.getCell("A28").value = "MARKS AND No.";

//     worksheet.mergeCells("D19:E19");
//     worksheet.getCell("D19").value = "PLACE OF RECEPT:";

//     worksheet.mergeCells("D21:E21");
//     worksheet.getCell("D21").value = "PORT OF LOADING:";

//     worksheet.mergeCells("D24:E24");
//     worksheet.getCell("D24").value = "PORT OF DELIVERY:";

//     worksheet.mergeCells("C28:D28");
//     worksheet.getCell("C28").value = "QUANTTY GOODS";

//     worksheet.mergeCells("E28:F28");
//     worksheet.getCell("E28").value = "DESCRIPTION OF GOODS";

//     worksheet.getCell("I28").value = "GROSS WEIGTH";
//     worksheet.getCell("J28").value = "MEASUREMENT";

//     worksheet.getCell("H69").value = moment().format("DD/MM/YYYY");

//     worksheet.getCell("H5").value = "B/L No.";
//     worksheet.getCell("H49").value = "TOTAL";

//     // Agregar imagen de fondo
//     const imagePath = path.join(__dirname, "../../public/img/fondo.png");
//     const imageId = workbook.addImage({
//       filename: imagePath,
//       extension: "png",
//     });

//     worksheet.addImage(imageId, {
//       tl: { col: 0, row: 0 },
//       ext: { width: 1000, height: 800 }, // ajusta el tamaño según tu fondo
//       editAs: "oneCell",
//     });

//     const dirPath = path.join(__dirname, "../../../uploads");
//     if (!fs.existsSync(dirPath)) {
//       fs.mkdirSync(dirPath, { recursive: true });
//     }

//     const filePath = path.join(dirPath, "BL.xlsx");
//     await workbook.xlsx.writeFile(filePath);
//     res.download(filePath);
//   } catch (error) {
//     console.error("Error generando Excel:", error);
//     res.status(500).send("Error generando Excel");
//   }
// };

export const generarFormatoBL = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * from function_house_datosbl($1)",
      [req.query.id_house]
    );

    const rows = result.rows;
    let data = rows[0];

    const workbook = new ExcelJS.Workbook();
    let templatePath = "";
    let name = "";
    if (req.query.formatoflag === "true") {
      name = "FORMATO_BL_CON_FONDO";
      templatePath = path.join(
        __dirname,
        "../../plantillas/FORMATO_BL_CON_FONDO.xlsx"
      );
    } else {
      name = "FORMATO_BL_SIN_FONDO";
      templatePath = path.join(
        __dirname,
        "../../plantillas/FORMATO_BL_SIN_FONDO.xlsx"
      );
    }
    await workbook.xlsx.readFile(templatePath);

    const worksheet = workbook.getWorksheet("FormatoBL");

    // 👉 Insertar datos en celdas
    worksheet.getCell("H6").value = data.nro_hbl;
    worksheet.getCell("A3").value = data.proveedor;
    worksheet.getCell("A8").value = data.consignatario;
    worksheet.getCell("A11").value = data.notify;
    worksheet.getCell("D17").value = data.port_begin;
    worksheet.getCell("D22").value = data.port_end;
    worksheet.getCell("G56").value = moment().format("DD/MM/YYYY");

    // 👉 Descargar e insertar imagen (logo)
    if (data.logo) {
      try {
        const response = await axios.get(data.logo, {
          responseType: "arraybuffer",
        });
        const contentType = response.headers["content-type"]; // ej. 'image/png'
        const extension = mime.extension(contentType); // ej. 'png', 'jpeg'

        if (!["png", "jpeg", "jpg"].includes(extension)) {
          console.warn("Tipo de imagen no soportado:", extension);
        } else {
          const imageBuffer = Buffer.from(response.data);

          const imageId = workbook.addImage({
            buffer: imageBuffer,
            extension: extension === "jpg" ? "jpeg" : extension,
          });

          worksheet.addImage(imageId, {
            tl: { col: 4, row: 5 }, // E6
            ext: { width: 150, height: 60 },
          });

          // Insertar en F52
          worksheet.addImage(imageId, {
            tl: { col: 5, row: 51 }, // F52
            ext: { width: 150, height: 60 },
          });
        }
      } catch (imgErr) {
        console.warn("No se pudo insertar el logo:", imgErr.message);
      }
    }

    const outputDir = path.join(__dirname, "../../../uploads");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, name + ".xlsx");
    await workbook.xlsx.writeFile(outputPath);

    res.download(outputPath);
  } catch (error) {
    console.error("Error generando Excel:", error);
    res.status(500).send("Error generando Excel");
  }
};
export const generarFormatoAWB = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * from function_house_datosbl($1)",
      [req.query.id_house]
    );

    const rows = result.rows;
    let data = rows[0];

    const workbook = new ExcelJS.Workbook();
    let templatePath = "";
    let name = "";
    if (req.query.formatoflag === "true") {
      name = "FORMATO_BL_CON_FONDO";
      // Leer plantilla
      templatePath = path.join(
        __dirname,
        "../../plantillas/FORMATO_AWB_CON_FONDO.xlsx"
      );
    } else {
      console.log("bbbbb", req.query.formatoflag);
      name = "FORMATO_BL_SIN_FONDO";
      templatePath = path.join(
        __dirname,
        "../../plantillas/FORMATO_AWB_SIN_FONDO.xlsx"
      );
    }
    await workbook.xlsx.readFile(templatePath);

    const worksheet = workbook.getWorksheet("GUIA");

    // // Editar celdas (sin perder el fondo)
    worksheet.getCell("B2").value = data.proveedor;
    worksheet.getCell("B8").value = data.consignatario;
    worksheet.getCell("B15").value = "";
    worksheet.getCell("F15").value = "";
    worksheet.getCell("B21").value = data.port_begin;
    worksheet.getCell("B23").value = data.port_begin;
    worksheet.getCell("B25").value = data.port_end;
    worksheet.getCell("A28").value = data.notify;
    worksheet.getCell("A49").value = data.bultos;
    worksheet.getCell("B49").value = data.peso;
    worksheet.getCell("C49").value = data.volumen;

    worksheet.getCell("E58").value = moment().format("DD/MM/YYYY");

    // Crear carpeta uploads si no existe
    const outputDir = path.join(__dirname, "../../../uploads");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, name + ".xlsx");
    await workbook.xlsx.writeFile(outputPath);

    // Enviar archivo generado
    res.download(outputPath);
  } catch (error) {
    console.error("Error generando Excel:", error);
    res.status(500).send("Error generando Excel");
  }
};
