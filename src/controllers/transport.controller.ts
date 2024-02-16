import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { postTransport } from "../interface/transport";

export const getListTransport = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_transport_listar($1,$2, $3, $4, $5);",
    [
      data.id_branch,
      data.code ? data.code : null,
      data.name ? data.name : null,
      data.description ? data.description : null,
      data.status,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const insertTransport = async (req: Request, res: Response) => {
  const dataObj: postTransport = req.body;

  await pool.query(
    "SELECT *from function_transport_insertar($1,$2, $3, $4, $5);",
    [
      dataObj.id_branch,
      dataObj.name,
      dataObj.code,
      dataObj.description,
      dataObj.status,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const readTransport = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_transport_ver($1);",
    [data.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const updateTransport = async (req: Request, res: Response) => {
  const dataObj: postTransport = req.body;

  await pool.query(
    "SELECT *from function_transport_actualizar($1,$2, $3, $4);",
    [dataObj.id, dataObj.name, dataObj.description, dataObj.status],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const cargarTransport = async (req: Request, res: Response) => {
  const dataObj: postTransport = req.query;

  await pool.query(
    "SELECT *from table_transport_cargar($1);",
    [dataObj.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
