import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
const nodemailer = require("nodemailer");
// var xl = require("excel4node");
import { IUser } from "interface/iUsers";

export const ListarUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.query;
  let newtoken = renewTokenMiddleware(req);
  await pool.query(
    "SELECT * FROM function_users_listar($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      user.id_branch,
      user.users ? user.users : null,
      user.nombrecompleto ? user.nombrecompleto : null,
      user.id_document ? user.id_document : null,
      user.document ? user.document : null,
      user.phone ? user.phone : null,
      user.email ? user.email : null,
      user.status ? user.status : null,
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
          token: newtoken,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validarUsersUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.query;
  let newtoken = renewTokenMiddleware(req);
  await pool.query(
    "SELECT * FROM function_users_validareuser($1)",
    [user.users],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: newtoken,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validarDocumentUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.query;
  let newtoken = renewTokenMiddleware(req);
  await pool.query(
    "SELECT * FROM function_entitie_validardocument($1,$2,$3)",
    [user.id_branch, user.id_document, user.document],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: newtoken,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validarEmailtUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.query;
  let newtoken = renewTokenMiddleware(req);
  await pool.query(
    "SELECT * FROM function_users_validateemail($1)",
    [user.email],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: newtoken,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const InsertarUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.body;
  console.log(user);
  let clave = generarContrasenaAleatoria(8);
  console.log(clave);

  let newtoken = renewTokenMiddleware(req);
  await pool.query(
    "SELECT * FROM function_users_insert($1)",
    [
      user.id,
      user.names,
      user.surname,
      user.second_surname,
      user.birthday,
      user.address,
      user.document,
      user.status,
      user.id_pais,
      user.id_city,
      user.id_state,
      user.id_town,
      user.id_sex,
      user.id_document,
      user.id_branch,
      user.socialprincipal,
      user.socialsecundary,
      user.users,
      clave,
      user.departamento,
      user.email,
      user.positions.map((element) => {
        return element.id;
      }),
      user.sucursales.map((element) => {
        return element.id;
      }),
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
          token: newtoken,
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
    subject: "ChainSolver – Establecer Contraseña",
    text: "Recuperación de contraseña",
    html: `
    <p> Hola ${datos.surname} ${datos.second_surname}, ${datos.names} </p>
    <p> Se ha creado tu usuario  </p>
    <p> <b>usuario: </b> ${datos.users} </p>
    <p> <b>clave: </b> ${datos.clave} </p>
    Para acceder de click <a href="https://chainsolver.piccargo.com/"> Aqui </a>    
    `,
  });
}
