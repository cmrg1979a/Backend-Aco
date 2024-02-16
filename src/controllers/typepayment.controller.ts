import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { ITypePayments } from "interface/iTypePayments";
const { Pool } = pg;
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const ListTypePayments = async (req: Request, res: Response) => {
  const typePayments: ITypePayments = req.query;


  await pool.query(
    `SELECT * FROM function_type_payments_listar($1,$2,$3,$4,$5);`,
    [
      typePayments.id_branch ? typePayments.id_branch : null,
      typePayments.code ? typePayments.code : null,
      typePayments.name ? typePayments.name : null,
      typePayments.description ? typePayments.description : null,
      typePayments.status !== "null" ? typePayments.status === "true" : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const InsertarTypePayments = async (req: Request, res: Response) => {
  const typePayments: ITypePayments = req.body;
  await pool.query(
    `SELECT * FROM function_type_payments_insertar($1,$2,$3,$4);`,
    [
      typePayments.name,
      typePayments.description ? typePayments.description : null,
      typePayments.id_branch,
      typePayments.status,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ActualizarTypePayments = async (req: Request, res: Response) => {
  const typePayments: ITypePayments = req.body;
  await pool.query(
    `SELECT * FROM function_type_payments_actualizar($1,$2,$3,$4);`,
    [
      typePayments.name,
      typePayments.description ? typePayments.description : null,
      typePayments.status,
      typePayments.id,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
