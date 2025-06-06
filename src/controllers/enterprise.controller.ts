import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
import { postEnterprise } from "../interface/enterprises";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { envioCorreo } from "../middleware/EnvioCorreoMiddleware";
const nodemailer = require("nodemailer");
const pool = conexion();
import jwt, {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";

export const getBracnh = async (req: Request, res: Response) => {
  const { id_branch } = req.params;
  await pool.query(
    "select * from Table_Branch_ver($1);",
    [id_branch],
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

export const getListEnterprise = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_enterprise_listar($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",
    [
      data.id_branch,
      data.document ? data.document : null,
      data.trade_name ? data.trade_name : null,
      data.business_name ? data.business_name : null,
      data.address ? data.address : null,
      data.status ? data.status : null,
      data.id_pais ? data.id_pais : null,
      data.id_state ? data.id_state : null,
      data.id_city ? data.id_city : null,
      data.id_town ? data.id_town : null,
      data.id_document ? data.id_document : null,
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

export const insertEnterprise = async (req: Request, res: Response) => {
  const { user, enterprise } = req.body;
  let clave = generarContrasenaAleatoria(10);
  await pool.query(
    "SELECT *from function_enterprise_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31);",
    [
      enterprise.id_branch,
      enterprise.id_logo ? enterprise.id_logo : null,
      enterprise.document,
      enterprise.trade_name,
      enterprise.business_name,
      enterprise.slogan,
      enterprise.address,
      enterprise.status == true || enterprise.status == 1 ? 1 : 0,
      enterprise.id_pais,
      enterprise.id_state,
      enterprise.id_city,
      enterprise.id_town,
      enterprise.id_document,
      enterprise.ic,
      user.id_entitie ? user.id_entitie : null,
      user.names,
      user.surname,
      user.second_surname,
      user.birthday,
      user.address,
      user.document,
      user.status == true || user.status == 1 ? 1 : 0,
      user.id_sex,
      user.id_document,
      user.socialprincipal ? user.socialprincipal : null,
      user.socialsecundary ? user.socialsecundary : null,
      user.users,
      clave,
      user.departamento,
      user.email,
      user.phone,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        user.clave = clave;
        EnvioCorreo(user);
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

export const readEnterprise = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_enterprise_ver($1);",
    [data.id],
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

export const updateEnterprise = async (req: Request, res: Response) => {
  const dataObj: postEnterprise = req.body;
  console.log(dataObj);
  await pool.query(
    "SELECT *from function_enterprise_actualizar($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15,$16,$17,$18);",
    [
      dataObj.id,
      dataObj.id_logo ? dataObj.id_logo : null,
      dataObj.document ? dataObj.document : null,
      dataObj.trade_name ? dataObj.trade_name : null,
      dataObj.business_name ? dataObj.business_name : null,
      dataObj.slogan ? dataObj.slogan : null,
      dataObj.address ? dataObj.address : null,
      dataObj.status ? dataObj.status : null,
      dataObj.id_pais ? dataObj.id_pais : null,
      dataObj.id_state ? dataObj.id_state : null,
      dataObj.id_city ? dataObj.id_city : null,
      dataObj.id_town ? dataObj.id_town : null,
      dataObj.id_document ? dataObj.id_document : null,
      dataObj.ic ? dataObj.ic : null,
      dataObj.tipoimpuesto ? dataObj.tipoimpuesto : null,
      dataObj.impuesto ? dataObj.impuesto : null,
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.phone ? dataObj.phone : null,
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

export const validateDocumentEnterpriseNuevo = async (
  req: Request,
  res: Response
) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_validar_tipo_documento_y_documento_nuevo_empresa($1,$2, $3);",
    [data.id_branch, data.id_document, data.document],
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

export const validateDocumentEnterpriseEditar = async (
  req: Request,
  res: Response
) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_validar_tipo_documento_y_documento_editar_empresa($1,$2, $3, $4);",
    [data.id, data.id_branch, data.id_document, data.document],
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

export const validarCorreoRegistro = async (req: Request, res: Response) => {
  let { email } = req.query;
  await pool.query(
    "SELECT *from function_validarEmailRegistro($1);",
    [email],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: null,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const RegistroNuevaEmpresa = async (req: Request, res: Response) => {
  const {
    trade_name,
    id_pais,
    names,
    surname,
    second_surname,
    email,
    phone,
    clave,
  } = req.body;
  // let clave = generarContrasenaAleatoria(10);
  await pool.query(
    "SELECT *from function_enterprise_registro($1,$2, $3, $4,$5,$6,$7,$8);",
    [trade_name, id_pais, names, surname, second_surname, clave, email, phone],
    async (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        let user = {
          email: email,
          clave: clave,
          names: names,
          surname: surname,
          second_surname: second_surname,
          users: rows[0].users,
        };
        let html = `<!DOCTYPE html>
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
                  src="https://api-general.qreport.site/uploads/imgLogin.png"
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
                Hemos creado tu acceso al sistema ACO
              </div>
              <div
                style="
                  text-align: center;
                  font-size: 2.2rem;
                  padding: 1.5rem;
                "
              >
                  <p> <b>usuario: </b> ${user.users} </p>
                  <p> <b>clave: </b> ${user.clave} </p>
              </div>
              
              <div style="text-align: center; font-size: 1rem; padding: 0 1rem;">
                Gracias por confiar en nosotros.
                <span style="color: #011936; font-weight: bold">
                  ¡Estamos aquí para ayudarte a crecer!</span
                >
              </div>
              <div style="text-align: center; padding: 10px;">
                <img
                  src="https://api-general.qreport.site/uploads/logo-aco.png"
                  alt="Logo ACO"
                  style="width: 100%; max-width: 300px; height: auto;"
                />
              </div>
            </div>
          </body>
        </html>`;
        // let html = `
        //   <p> Hola ${user.surname} ${user.second_surname}, ${user.names} </p>
        //   <p> Se ha creado tu usuario  - ADMINISTRADOR DE SISTEMA</p>
        //    <p> <b>usuario: </b> ${user.users} </p>
        //     <p> <b>clave: </b> ${user.clave} </p>
        //     <br/>
        //    Para acceder de click <a href="https://chainsolver.piccargo.com/"> Aqui </a>
        //   <br/>
        //   <p><img src="https://i.ibb.co/ypKb7q1/chain-Solver.png" alt="LogoChain" width="404" height="112" /></p>
        // `;

        let data = {
          from: '"ACO" <sistema1@piccargo.com>',
          email: user.email,
          subject: "ACO – DATOS DE ACCESO",
          html: html,
        };
        await envioCorreo(data);
        // EnvioCorreo(user);
        const token: string = jwt.sign(
          { user },
          process.env.TOKEN_SECRET || "tokentest",
          {
            expiresIn: 60 * 60 * 8,
          }
        );
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: token,
        });
      } else {
        console.log(err);
      }
    }
  );
};

function generarContrasenaAleatoria(longitud) {
  // Array que contiene caracteres alfanuméricos
  const caracteresAlfanumericos =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // Array que contiene caracteres especiales
  const caracteresEspeciales = "!#$%&()*+,-./:;<=>?@[]^_`{|}~";
  // Variable para almacenar la contraseña
  let contrasena = "";

  // Generar caracteres alfanuméricos
  for (let i = 0; i < longitud - 3; i++) {
    contrasena +=
      caracteresAlfanumericos[
        Math.floor(Math.random() * caracteresAlfanumericos.length)
      ];
  }

  // Generar un caracter numérico
  contrasena += caracteresAlfanumericos[Math.floor(Math.random() * 10)];

  // Generar un caracter especial
  contrasena +=
    caracteresEspeciales[
      Math.floor(Math.random() * caracteresEspeciales.length)
    ];

  // Generar un caracter aleatorio adicional
  contrasena +=
    caracteresAlfanumericos[
      Math.floor(Math.random() * caracteresAlfanumericos.length)
    ];

  // Reordenar la contraseña
  contrasena = contrasena
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  // Devolver la contraseña
  return contrasena;
}

async function EnvioCorreo(datos) {
  let transporter = nodemailer.createTransport({
    host: "mail.pic-cargo.com",
    port: 465,
    secure: true,
    auth: {
      user: "sistema1@pic-cargo.com", // "testkaysen@gmail.com", //
      pass: "b@+p@f21e48c", // "csyvzaysfnmntjws", //
    },
  });

  let info = await transporter.sendMail({
    from: 'CHAIN-SOLVER" <sistema1@pic-cargo.com>',
    to: datos.email,
    subject: "ACO – Registro de USUARIO",
    text: "Recuperación de contraseña",
    html: `
    <p> Hola ${datos.surname} ${datos.second_surname}, ${datos.names} </p>
    <p> Se ha creado tu usuario como <b> Administrador del sistema</b> </p>
    <p> <b>usuario: </b> ${datos.email} </p>
    <p> <b>clave: </b> ${datos.clave} </p>
    <br/>
    Para acceder de click <a href="https://chainsolver.piccargo.com/"> Aqui </a>  
    <br/>
    <p><img src="https://i.ibb.co/ypKb7q1/chain-Solver.png" alt="LogoChain" width="404" height="112" /></p>  
    `,
  });
}

export const ReEstablecerContrasenia = async (req: Request, res: Response) => {
  let { user } = req.body;
  let clave = generarContrasenaAleatoria(10);

  await pool.query(
    "SELECT *from reestablecer_correo($1,$2);",
    [user, clave],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (rows[0].estadoflag) {
          let users = {
            email: rows[0].email,
            clave: clave,
            users: user,
          };
          let html = `<!DOCTYPE html>
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
                    src="https://api-general.qreport.site/uploads/imgLogin.png"
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
                  Hemos creado tu acceso al sistema ACO
                </div>
                <div
                  style="
                    text-align: center;
                    font-size: 2.2rem;
                    padding: 1.5rem;
                  "
                >
                    <p> <b>usuario: </b> ${users.users} </p>
                    <p> <b>clave: </b> ${users.clave} </p>
                </div>
              
                <div style="text-align: center; font-size: 1rem; padding: 0 1rem;">
                  Gracias por confiar en nosotros.
                  <span style="color: #011936; font-weight: bold">
                    ¡Estamos aquí para ayudarte a crecer!</span
                  >
                </div>
                <div style="text-align: center; padding: 10px;">
                  <img
                    src="https://api-general.qreport.site/uploads/logo-aco.png"
                    alt="Logo ACO"
                    style="width: 100%; max-width: 300px; height: auto;"
                  />
                </div>
              </div>
            </body>
          </html>`;
          let data = {
            from: '"ACO" <sistema1@piccargo.com>',
            email: users.email,
            subject: "ACO – DATOS DE ACCESO",
            html: html,
          };
          envioCorreo(data);
        }
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: null,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const obtenerImpuestosXBranch = async (req: Request, res: Response) => {
  const { id_branch } = req.query;
  await pool.query(
    "select * from function_obtener_tipoimpuesto($1);",
    [id_branch],
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
