import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { envioCorreo } from "../middleware/EnvioCorreoMiddleware";

const { Pool } = pg;
const pool = conexion();

export const getValidarUsuarioAdmin = async (req: Request, res: Response) => {
  let { usuario, clave } = req.body;
  await pool.query(
    "SELECT * FROM table_validar_usuario_admin($1,$2)",
    [usuario, clave],
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

export const setRecuperarClave = async (req: Request, res: Response) => {
  let { email } = req.body;
  await pool.query(
    "SELECT * FROM function_token_recuperarcontrasenia($1)",
    [email],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (rows[0].token) {
          let url = `${global.path_url}reestablecer_clave/${rows[0].token}`;
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
                        Gracias por su preferencia. Para reestablecer contraseña, por favor ingresa al siguiente a la siguiente url
                      </div>
                      <div style="text-align: center; font-size: 1rem; padding: 0 1rem;">
                        <a href="${url}" style="
                          display: inline-block;
                          padding: 10px 20px;
                          background-color: #007bff; /* Color de fondo azul */
                          color: white;
                          text-decoration: none;
                          border: none;
                          cursor: pointer;
                          border-radius: 5px;
                        ">Cambiar clave</a>
                      </div>
                      <div style="text-align: center; font-size: 1rem; padding: 0 1rem; background:yellow">
                        Válido por 2 hora.
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
          let data = {
            from: '"ACO" <aco@agentedecargaonline.com>',
            email: email,
            subject: "ACO – Registro",
            html: html,
          };
          let respuest = envioCorreo(data);
        }
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

export const validarTokenRecuperarClave = async (
  req: Request,
  res: Response
) => {
  let { token } = req.query;
  await pool.query(
    "SELECT * FROM function_validar_token($1)",
    [token],
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

export const reestablecerClave = async (req: Request, res: Response) => {
  let { email, clave, token } = req.body;
  await pool.query(
    "SELECT * FROM function_users_reestablecer_clave($1,$2,$3)",
    [email, clave, token],
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
