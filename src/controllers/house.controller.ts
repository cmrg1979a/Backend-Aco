import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const nodemailer = require("nodemailer");
const pool = conexion();
import { postHouse } from "../interface/house";
import { postHouseEdit } from "../interface/house";

import moment from "moment";

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
    busqueda    
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
    busqueda
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
  const { 
    id_modality, 
    id_shipment, 
    id_incoterms, 
    id_branch 
  } = req.body;

  await pool.query(
    "SELECT * FROM function_services_x_incoterms_listar($1,$2,$3,$4)",
    [
      id_modality, 
      id_shipment, 
      id_incoterms, 
      id_branch
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

export const getHouseBitacora = async (req: Request, res: Response) => {
  const { id } = req.body;

  await pool.query(
    "SELECT * FROM HOUSE_BITACORA_listarxhouse($1);",
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
  const { id } = req.body;
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
      dataObj.lstservices.map((item: any) => item.status ? 1 : 0),
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
      dataObj.comentario ? dataObj.comentario : null
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
    [
      token
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
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const sendNotificacionHouse = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await sendCorreo(dataObj)
    .catch((error) => {
      console.log(error)

      res.status(500);
    });

  res.json({
    status: 200,
    statusBol: true,
    token: renewTokenMiddleware(req),
  });
};

async function sendCorreo(data) {
  const transporter = nodemailer.createTransport({
    host: "p3plzcpnl505059.prod.phx3.secureserver.net", // "mail.pic-cargo.com"
    port: 465, // 465
    secure: true,
    auth: {
      user: "sistema1@piccargo.com", // "sistema1@pic-cargo.com" // "testkaysen@gmail.com"
      pass: "b@+p@f21e48c" // "b@+p@f21e48c", // "csyvzaysfnmntjws", //
    }
  });

  const { 
    user, 
    house, 
    notificacion: { title: tipoNotificacion = "", value: indiceNotificacion = 0 }, 
    sentido, 
    tipoEmbarque, 
    cuentasBancarias 
  } = data;

  let tabla = ""; 
  if (tipoEmbarque == "Aéreo" || tipoEmbarque == "LCL") 
  {
    tabla += `
      <table border="1" cellspacing="0" style="width:600px; margin:auto;">
        <thead>
          <tr>
            <th colspan="2" style="text-align:center; padding:.25rem .5rem;">Datos de la Carga</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Peso</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${house.peso ? `${house.peso}Kg` : ""}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Volumen</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${house.volumen ? `${house.volumen}m3` : ""}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Nro. Bultos</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.bultos || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Origen</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.namelongportbegin || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Destino</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.namelongportend || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Proveedor</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.nameproveedor || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Nro. BL / Nro. Guía Aérea</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.nro_hbl || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Monto Servicio Logístico Cotizado</b></td>
            <td style="width:50%; padding:.25rem .5rem;">USD ${(house.monto || "")}</td>
          </tr>
        </tbody>
      </table>
    `; 
  }
  else if (tipoEmbarque == "FCL")
  {
    tabla += `
      <table border="1" cellspacing="0" style="width:600px; margin:auto;">
        <thead>
          <tr>
            <th colspan="2" style="text-align:center; padding:.25rem .5rem;">Datos de la Carga</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Contenedores</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.list_containers.map(item => `${item.namecontainer} (${item.cantidad})`).join(", ") || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Origen</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.namelongportbegin || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Destino</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.namelongportend || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Proveedor</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.nameproveedor || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Nro. BL / Nro. Guía Aérea</b></td>
            <td style="width:50%; padding:.25rem .5rem;">${(house.nro_hbl || "")}</td>
          </tr>
          <tr>
            <td style="width:50%; padding:.25rem .5rem;"><b>Monto Servicio Logístico Cotizado</b></td>
            <td style="width:50%; padding:.25rem .5rem;">USD ${(house.monto || "")}</td>
          </tr>
        </tbody>
      </table>
    `; 
  }

  let fechaETD_parseada       = house.fecha_etd ? moment(house.fecha_etd).format("D [de] MMMM") : "";
  let fechaETA_parseada       = house.fecha_eta ? moment(house.fecha_eta).format("D [de] MMMM") : "";
  let descripcionNotificacion = "";
  if (sentido == "Import")
  {
    switch(indiceNotificacion) 
    {
      case 1: // Aviso de Salida
        descripcionNotificacion = `te notificamos que tu carga salió el día ${fechaETD_parseada}.`;
        break;
      case 2: // Actualización de Salida
        descripcionNotificacion = `te notificamos que por motivos operacionales, tu carga se estima salir el día ${fechaETD_parseada}.`;
        break;
      case 3: // Pre - Aviso de Llegada 
        descripcionNotificacion = `te notificamos que tu carga va a llegar el día ${fechaETA_parseada}.`;
        break;
      case 4: // Aviso de Llegada
        descripcionNotificacion = "te notificamos que tu carga ya llegó.";
        break;
      case 5: // Actualización de Llegada
        descripcionNotificacion = `te notificamos que, por motivos operacionales, tu carga se estima llegar el día ${fechaETA_parseada}.`;
        break;
    } 
  }
  else if (sentido == "Export") 
  {
    switch(indiceNotificacion) 
    {
      case 1: // Aviso de Salida
        descripcionNotificacion = `te notificamos que tu carga salió el día ${fechaETA_parseada}.`;
        break;
      case 2: // Actualización de Salida
        descripcionNotificacion = `te notificamos que por motivos operacionales, tu carga se estima salir el día ${fechaETA_parseada}.`;
        break;
      case 3: // Aviso de Llegada
        descripcionNotificacion = "te notificamos que tu carga ya llegó.";
        break;
    } 
  }
  else
  {
    switch(indiceNotificacion) 
    {
      case 1: // Notificación de Salida
        descripcionNotificacion = `te notificamos que tu carga salió el día ${fechaETD_parseada}.`;
        break;
      case 2: // Pre - Aviso de Llegada
        descripcionNotificacion = `te notificamos que tu carga va a llegar el día ${fechaETA_parseada}.`;
        break;
      case 3: // Aviso de Llegada
        descripcionNotificacion = "te notificamos que tu carga ya llegó.";
        break;
      case 4: // Actualización de Llegada
        descripcionNotificacion = `te notificamos que, por motivos operacionales, tu carga se estima llegar el día ${fechaETA_parseada}.`;
        break;
    } 
  }

  const mailTemplate  = `
    <div>
      <div style="float:left;">
        <img src="https://api-general.qreport.site/uploads/1713276374733.jfif" alt="LogoChain" width="350" height="120" />
      </div>
      <div style="float:right;">
        <p style="text-align:right;">PERÚ, ${moment().format("DD [de] MMMM [de] YYYY")}</p>
      </div>
      <div style="clear:both;"></div>
      
      <p>Estimados sr(es): <b>${house.namelongclientefinal}</b></p>
      <p>Asunto: <b>${tipoNotificacion}</b></p>
      <p>Datos de su Carga:</p>

      ${tabla}

      <br/>
      <br/>

      <p>Por medio del presente, ${descripcionNotificacion}</p>
      
      <br/>

      <p>Le recordamos que el servicio logístico que le fue cotizado es un monto de USD ${(house.monto || "")}, y lo puede pagar a través de cualquiera de las cuentas bancarias:</p> 
      ${(cuentasBancarias.map(item => `<p>${item.label.trim()}.</p>`).join("") || "")}
      
      <br/>
      <br/>
      
      ${
        (house.token_rastreo) 
          ? 
            `<p>Si desea consultar el estado de su carga, haga clic en este <a href="https://devchainsolver.piccargo.com/tracking/${(house.token_rastreo || "")}">enlace</a></p><br/><br/>`
          : 
            ""
      }      
      
      <p>Atte.: ${house.nameoperador}</p>
      <p>${house.namelongclientefinal}</p>
    </div>
  `;
  const mailOptions   = {
    from: '"ACO" <sistema1@piccargo.com>',
    to: house.emailaddress_clientefinal || "",
    subject: `ACO – ${tipoNotificacion}`,
    html: mailTemplate,
  };
  const mailInfo      = await transporter.sendMail(mailOptions);
}