import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";

const { Pool } = pg;
const pool = conexion();

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
  let data = req.query;
  await pool.query("SELECT *from function_listar_shipment($1,$2, $3, $4, $5);", [
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
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const insertShipment = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_insertar_shipment($1,$2, $3, $4, $5, $6);", [
    data.id_branch,
    data.code,
    data.name,
    data.id_transport,
    data.description,
    data.status,
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const readShipment = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_ver_shipment($1);", [
    data.id
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const updateShipment = async (req: Request, res: Response) => {
  let data = req.body;
  
  await pool.query("SELECT *from function_actualizar_shipment($1,$2,$3,$4,$5);", [
    data.id,
    data.name,
    data.description,
    data.id_transport,
    data.status
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const getCargarTransport = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_cargar_transport($1);", [
    data.id_branch
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}
