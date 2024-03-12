import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { IPort } from "interface/iPort";
const { Pool } = pg;
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const getPortBegin = async (req: Request, res: Response) => {
  const { id_transport } = req.body;
  await pool.query(
    "SELECT * FROM PORT_BEGINEND_listar($1,$2);",
    [1, id_transport],
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

export const getPortEnd = async (req: Request, res: Response) => {
  const { id_transport } = req.body;
  await pool.query(
    "SELECT * FROM PORT_BEGINEND_listar($1,$2);",
    [2, id_transport],
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
export const ListarPuertos = async (req: Request, res: Response) => {
  const puerto: IPort = req.query;
  await pool.query(
    "SELECT * FROM function_puert_listar($1,$2,$3,$4,$5,$6,$7);",
    [
      puerto.id_branch,
      puerto.code ? puerto.code : null,
      puerto.name ? puerto.name : null,
      puerto.description ? puerto.description : null,
      puerto.id_pais ? puerto.id_pais : null,
      puerto.status == 1 || puerto.status == 0 ? puerto.status : null,
      puerto.id_transporte ? puerto.id_transporte : null,
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
export const InsertarPuertos = async (req: Request, res: Response) => {
  const puerto: IPort = req.body;

  await pool.query(
    "SELECT * FROM function_port_insertar($1,$2,$3,$4,$5,$6,$7);",
    [
      puerto.id_transporte ? puerto.id_transporte : null,
      puerto.id_pais ? puerto.id_pais : null,
      puerto.code ? puerto.code : null,
      puerto.name ? puerto.name : null,
      puerto.description ? puerto.description : null,
      puerto.status == true || puerto.status == 1 ? 1 : 0,
      puerto.id_branch,
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
export const ActualizarPuertos = async (req: Request, res: Response) => {
  const puerto: IPort = req.body;
  await pool.query(
    "SELECT * FROM function_port_actualizar($1,$2,$3,$4,$5,$6);",
    [
      puerto.id_pais ? puerto.id_pais : null,
      puerto.name ? puerto.name : null,
      puerto.description ? puerto.description : null,
      puerto.status == true || puerto.status == 1 ? 1 : 0,
      puerto.id_transporte ? puerto.id_transporte : null,
      puerto.id,
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
