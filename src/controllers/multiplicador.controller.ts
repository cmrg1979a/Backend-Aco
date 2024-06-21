import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();
import { postMultiplicador } from "../interface/multiplicador";

export const getMultiplicador = async (req: Request, res: Response) => {
  const { id_shipment, containers, id_branch } = req.body;

  await pool.query(
    "SELECT * FROM table_multiplicador_cargar($1,$2,$3)",
    [
      id_branch,
      id_shipment,
      containers.map((element) => {
        return element.id_containers;
      }),
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
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
export const getMultiplicadorConfig = async (req: Request, res: Response) => {
  const { id_shipment,  id_branch } = req.body;

  await pool.query(
    "SELECT * FROM table_multiplicador_cargar_config($1,$2)",
    [
      id_branch,
      id_shipment
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
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

export const getListMultiplicador = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_multiplicador_listar($1,$2, $3, $4, $5, $6);",
    [
      data.id_branch,
      data.code ? data.code : null,
      data.name ? data.name : null,
      data.description ? data.description : null,
      data.id_shipment ? data.id_shipment : null,
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

export const readMultiplicador = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_multiplicador_ver($1);",
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

export const updateMultiplicador = async (req: Request, res: Response) => {
  const dataObj: postMultiplicador = req.body;

  await pool.query(
    "SELECT *from function_multiplicador_actualizar($1,$2,$3,$4,$5, $6);",
    [
      dataObj.id,
      dataObj.name,
      dataObj.description,
      dataObj.id_shipment,
      dataObj.valor,
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

export const getCargarShipment = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_shipment_cargar($1);",
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
