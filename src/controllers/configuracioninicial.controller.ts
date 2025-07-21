import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
import { envioCorreo } from "../middleware/EnvioCorreoMiddleware";

const pool = conexion();

export const actualizarDatosEmpresaConfig = async (
  req: Request,
  res: Response
) => {
  const {
    id,
    id_document,
    document,
    trade_name,
    logo,
    id_pais,
    id_logo,
    address,
    TipoImp,
    impuesto,
    usarclientes,
    usaropadmin,
  } = req.body;
  await pool.query(
    "select * from function_config_actualizardatosempresa($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);",
    [
      id,
      id_document,
      document,
      trade_name,
      logo,
      id_pais,
      id_logo,
      address,
      TipoImp,
      impuesto,
      usarclientes,
      usaropadmin,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
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
export const actualizarDatosAdministradorConfig = async (
  req: Request,
  res: Response
) => {
  const { id, id_user, names, surname, second_surname, phone, email } =
    req.body;
  await pool.query(
    "select * from function_config_actualizardatosadmin($1,$2,$3,$4,$5,$6,$7);",
    [id, id_user, names, surname, second_surname, phone, email],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
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
export const actualizarDatosCMProveedor = async (
  req: Request,
  res: Response
) => {
  const { id_branch, lstProveedor } = req.body;

  await pool.query(
    "select * from function_config_cargamasivaproveedor($1,$2);",
    [id_branch, JSON.stringify(lstProveedor)],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
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
export const actualizarDatosCMCliente = async (req: Request, res: Response) => {
  const { id_branch, lstClientes } = req.body;

  await pool.query(
    "select * from function_config_cargamasivacliente($1,$2);",
    [id_branch, JSON.stringify(lstClientes)],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
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
export const obtenerConfigCostos = async (req: Request, res: Response) => {
  const { id_branch, id_modality, shipment } = req.query;

  await pool.query(
    "select * from function_config_costos($1,$2,$3);",
    [id_branch, id_modality, shipment],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
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
export const guardarCostosConfig = async (req: Request, res: Response) => {
  const { id_branch, id_modality, id_shipment, lstCostos } = req.body;
  await pool.query(
    "select * from function_config_guardar_costos($1,$2,$3,$4);",
    [id_branch, id_modality, id_shipment, JSON.stringify(lstCostos)],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
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

export const envioMSGEmail = async (req: Request, res: Response) => {
  let query = req.query;
  let codigo = Math.floor(1000 + Math.random() * 9000);
  let html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div
      style="
        width: 550px;
        margin: 0 auto;
        padding: 0;
        background-color: #ffffff;
      "
    >
      <div style="text-align: center">
        <img
          src="https://api.agentedecargaonline.com/uploads/imgLogin.png"
          alt="Imagen de Bienvenida"
          style="width: 100%; max-width: 550px; height: auto;"
        />
      </div>
      <div
        style="
          text-align: center;
          color: #011936;
          font-size: 1.5rem;
          padding: 1rem;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: bold;
        "
      >
        ¡Bienvenido a SISTEMA ACO!
      </div>
      <div style="text-align: center; font-size: 1rem; padding: 0 1rem;">
        Gracias por registrarte. Para completar tu registro, por favor ingresa el
        siguiente código en nuestra plataforma:
      </div>
      <div
        style="
          text-align: center;
          font-size: 2.2rem;
          font-weight: bold;
          padding: 1.5rem;
        "
      >
        ${codigo}
      </div>
      <div style="text-align: center; font-size: 1rem; padding: 0 1rem; background:yellow">
        Este código es válido por 1 hora.
      </div>
      <div style="text-align: center; font-size: 1rem; padding: 0 1rem;">
        Gracias por confiar en nosotros.
        <span style="color: #011936; font-weight: bold">
          ¡Estamos aquí para ayudarte a crecer!</span
        >
      </div>
      <div style="text-align: center; padding: 10px;">
        <img
          src="https://api.agentedecargaonline.com/uploads/logo-aco.png"
          alt="Logo ACO"
          style="width: 100%; max-width: 300px; height: auto;"
        />
      </div>
    </div>
  </body>
</html>

  `;
  // let html = `
  // <h1>Bienvenido al SISTEMA ACO</h1>
  // <p>Para continuar con su registro, por favor ingrese en la plataforma el c&oacute;digo proporcionado a continuaci&oacute;n</p>
  // <p>Tu c&oacute;digo de un solo uso es:</p>
  // <div style="align-content: center !important; text-align: center; padding: auto;">
  //   <div style="border: 1px solid; border-radius: 5px; padding: 10px; width: 50px; text-align: center;">${codigo}</div>
  // </div>
  // <div>
  // Duración del código: 1h
  // </div>
  // <div style="float:left;">
  //         <img src="https://api.agentedecargaonline.com/uploads/1713276374733.jfif" alt="LogoChain" max-width="350" height="300" />
  // </div>
  // `;
  let data = {
    from: '"ACO" <aco@agentedecargaonline.com>',
    email: query.email,
    subject: "ACO – Registro",
    html: html,
  };
  let respuest = await envioCorreo(data);
  if (respuest.estado) {
    await pool.query(
      "SELECT * FROM function_token_registro($1,$2)",
      [codigo, query.email],
      (err, response, fields) => {
        if (!err) {
          let rows = response.rows;

          res.json({
            status: 200,
            mensaje: rows[0].mensaje,
            estadoflag: rows[0].estadoflag,
          });
        } else {
          console.log(err);
        }
      }
    );
  }
};
export const OmitirConfiguracionCostos = async (
  req: Request,
  res: Response
) => {
  let { id_branch } = req.body;
  await pool.query(
    "select *from function_omitir_config_costos($1)",
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
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const FinalizarConfiguracion = async (req: Request, res: Response) => {
  let { id_branch } = req.body;
  await pool.query(
    "select *from function_finalizar_config($1)",
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
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validarTokenRegistro = async (req: Request, res: Response) => {
  let { codigo, email, eliminartoken } = req.query;
  await pool.query(
    "SELECT * FROM function_token_registro_validar($1,$2,$3)",
    [codigo, email, eliminartoken],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const envioMSGWhathapp = async (req: Request, res: Response) => {
  const { email, phone } = req.query;
  // const { Client, LocalAuth } = require("whatsapp-web.js");
  // const qrcode = require("qrcode-terminal");
  // const client = new Client({
  //   authStrategy: new LocalAuth(),
  //   puppeteer: { headless: true }, // Change to `false` if you want to see the browser
  //   webVersionCache: {
  //     type: "remote", // Or 'local' if you prefer a local HTML file
  //     remotePath:
  //       "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html", // Update version if needed
  //   },
  // });
  // const chatId = await client.getChatById(phone);
  // client.sendMessage(chatId, "hola");
  // // });
  // client.initialize();
};
