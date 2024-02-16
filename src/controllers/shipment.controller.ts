import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const { Pool } = pg;
const pool = conexion();

import { postShipment } from "../interface/shipment";

export const getShipment = async (req: Request, res: Response) => {
  await pool.query(
    `SELECT * FROM TABLE_SHIPMENT_LISTAR($1)`,
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
           data: rows,
          token: renewTokenMiddleware(req),
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

export const getListShipment = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_shipment_listar($1,$2, $3, $4, $5);",
    [
      data.id_branch,
      data.id_transport ? data.id_transport : null,
      data.name ? data.name : null,
      data.description ? data.description : null,
      data.status ? data.status : null,
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

export const insertShipment = async (req: Request, res: Response) => {
  const dataObj: postShipment = req.body;

  await pool.query(
    "SELECT *from function_shipment_insertar($1,$2, $3, $4, $5, $6);",
    [
      dataObj.id_branch,
      dataObj.code,
      dataObj.name,
      dataObj.id_transport,
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
         data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const readShipment = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_shipment_ver($1);",
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

export const updateShipment = async (req: Request, res: Response) => {
  const dataObj: postShipment = req.body;

  await pool.query(
    "SELECT *from function_shipment_actualizar($1,$2,$3,$4,$5);",
    [
      dataObj.id,
      dataObj.name,
      dataObj.description,
      dataObj.id_transport,
      dataObj.status,
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

export const getCargarTransport = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_transport_cargar($1);",
    [data.id_branch],
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
