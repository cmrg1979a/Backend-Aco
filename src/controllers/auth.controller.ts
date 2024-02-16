import { Request, response, Response } from "express";
import { postUser } from "../interface/postUser";

import jwt, {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();
export const singin = async (req: Request, res: Response) => {
  const { user, password } = req.body;
  await pool.query(
    "SELECT * FROM Table_Users_login($1,$2)",
    [user, password],
    (err, response, fields) => {
      let rows = response.rows;

      if (!err) {
        if (!!rows[0].estadoflag) {
          let data = rows[0];
          const token: string = jwt.sign(
            { data },
            process.env.TOKEN_SECRET || "tokentest",
            {
              expiresIn: 60 * 60 * 2,
            }
          );
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
            token: token,
            data: rows,
          });
        } else {
          res.json({
            status: 400,
            statusBol: false,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
            tipomensaje: rows[0].tipomensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const singup = async (req: Request, res: Response) => {
  const dataObj: postUser = req.body;

  await pool.query(
    "INSERT INTO Table_Users SET ?",
    [dataObj],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const validToken = async (req: Request, res: Response) => {
  const token = req.header("auth-token");
  const secret = process.env.TOKEN_SECRET || "tokentest"; // La clave secreta utilizada para firmar el JWT
  try {
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const expirationTimestamp = decodedToken.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (expirationTimestamp && expirationTimestamp <= currentTimestamp) {
      return res.json({
        status: 500,
        statusBol: true,
        estadoflag: false,
        mensaje: "El JWT ha expirado",
      });
    } else {
      return res.json({
        status: 500,
        statusBol: true,
        estadoflag: true,
        mensaje: "El JWT aún es válido",
      });
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.json({
        status: 500,
        statusBol: true,
        estadoflag: false,
        mensaje: "Error: JWT expirado",
      });
    }
    if (error instanceof JsonWebTokenError) {
      return res.json({
        status: 500,
        statusBol: true,
        estadoflag: false,
        mensaje: "Error: JWT expirado",
      });
    }
  }
};

export const CargarBranch = async (req: Request, res: Response) => {
  let id_usuario = req.params.id_usuario;
  await pool.query(
    "select * from branchxusuario_cargar($1)",
    [id_usuario],
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
