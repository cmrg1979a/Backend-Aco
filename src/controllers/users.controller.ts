import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { envioCorreo } from "../middleware/EnvioCorreoMiddleware";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
const nodemailer = require("nodemailer");
// var xl = require("excel4node");
import { IUser } from "interface/iUsers";

export const ListarUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.query;

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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const verUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.query;

  await pool.query(
    "SELECT * FROM function_users_ver($1,$2)",
    [user.id, user.id_branch],
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
export const validarUsersUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.query;

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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validarDocumentUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.query;

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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validarEmailtUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.query;

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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const InsertarUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.body;
  // let clave = generarContrasenaAleatoria(10);

  await pool.query(
    "SELECT * FROM function_users_insert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)",
    [
      user.id_entitie ? user.id_entitie : null,
      user.names,
      user.surname,
      user.second_surname,
      user.birthday,
      user.address,
      user.document,
      user.status ? 1 : 0,
      user.id_pais,
      user.id_city ? user.id_city : null,
      user.id_state ? user.id_state : null,
      user.id_town ? user.id_town : null,
      user.id_sex,
      user.id_document,
      user.id_branch,
      user.socialprincipal ? user.socialprincipal : null,
      user.socialsecundary ? user.socialsecundary : null,
      user.users,
      user.clave,
      user.departamento,
      user.email,
      user.phone,
      user.positions.map((element) => {
        return element.id;
      }),
      user.sucursales.map((element) => {
        return element.id;
      }),
    ],
    async (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        // user.clave = user.clave;
        let html = `
         <p> Hola ${user.surname} ${user.second_surname}, ${user.names} </p>
        <p> Se ha creado tu usuario  </p>
        <p> <b>usuario: </b> ${user.email} </p>
        <p> <b>clave: </b> ${user.clave} </p>
        Para acceder de click <a href="https://chainsolver.piccargo.com/"> Aqui </a>  
        <div style="float:left;">
          <img src="https://api-general.qreport.site/uploads/1713276374733.jfif" alt="LogoChain" max-width="350" height="300" />
        </div>
    
        `;
        let data = {
          from: '"ACO" <sistema1@piccargo.com>',
          email: user.email,
          subject: "ACO – Registro",
          html: html,
        };

        await envioCorreo(data);

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
export const ActualizarUsuarios = async (req: Request, res: Response) => {
  const user: IUser = req.body;

  await pool.query(
    "SELECT * FROM function_users_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)",
    [
      user.id_entitie,
      user.birthday,
      user.address,
      user.status,
      user.id_pais,
      user.id_city ? user.id_city : null,
      user.id_state ? user.id_state : null,
      user.id_town ? user.id_town : null,
      user.id_sex,
      user.socialprincipal ? user.socialprincipal : null,
      user.socialsecundary ? user.socialsecundary : null,
      user.departamento,
      user.phone,
      user.positions.map((element) => {
        return element.id_position;
      }),
      user.positions.map((element) => {
        return element.status;
      }),
      user.sucursales.map((element) => {
        return element.id_branch;
      }),
      user.sucursales.map((element) => {
        return element.status;
      }),
      user.id,
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

export const cambiarEstadoUser = async (req: Request, res: Response) => {
  const user = req.body;
  await pool.query(
    "SELECT * FROM function_users_cambiarestado($1)",
    [user.id],
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
    <p> Se ha creado tu usuario  </p>
    <p> <b>usuario: </b> ${datos.email} </p>
    <p> <b>clave: </b> ${datos.clave} </p>
    Para acceder de click <a href="https://chainsolver.piccargo.com/"> Aqui </a>  
    <p><img src="https://i.ibb.co/ypKb7q1/chain-Solver.png" alt="LogoChain" width="404" height="112" /></p>  
    `,
  });
}
