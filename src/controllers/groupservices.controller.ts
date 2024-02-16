import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { postGroupServices } from "../interface/groupservices";
import { IITemServices } from "../interface/iItemServices";

export const CargarGroupservices = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_groupservices_cargar($1);",
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
export const getListGroupservices = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_groupservices_listar($1,$2, $3, $4, $5);",
    [
      data.id_branch,
      data.code ? data.code : null,
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

export const insertGroupservices = async (req: Request, res: Response) => {
  const dataObj: postGroupServices = req.body;

  await pool.query(
    "SELECT *from function_groupservices_insertar($1,$2, $3, $4);",
    [dataObj.id_branch, dataObj.name, dataObj.description, dataObj.status],
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

export const readGroupservices = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_groupservices_ver($1);",
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

export const updateGroupservices = async (req: Request, res: Response) => {
  const dataObj: postGroupServices = req.body;

  await pool.query(
    "SELECT *from function_groupservices_actualizar($1,$2, $3, $4);",
    [dataObj.id, dataObj.name, dataObj.description, dataObj.status],
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

export const ListarItemServices = async (req: Request, res: Response) => {
  const itemservice: IITemServices = req.query;

  await pool.query(
    "SELECT *from function_ITEMSSERVICES_listar($1,$2, $3, $4,$5,$6);",
    [
      itemservice.id_branch ? itemservice.id_branch : null,
      itemservice.id_groupservices ? itemservice.id_groupservices : null,
      itemservice.code ? itemservice.code : null,
      itemservice.name ? itemservice.name : null,
      itemservice.description ? itemservice.description : null,

      itemservice.status === "null" ? null : itemservice.status,
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
export const InsertarItemServices = async (req: Request, res: Response) => {
  const itemservice: IITemServices = req.body;

  await pool.query(
    "SELECT *from function_itemsservices_insertar($1,$2, $3, $4,$5,$6);",
    [
      itemservice.id_groupservices,
      itemservice.code,
      itemservice.name,
      itemservice.description ? itemservice.description : null,
      itemservice.id_branch,
      itemservice.status === "true" ||
      itemservice.status === "1" ||
      itemservice.status === 1
        ? 1
        : 0,
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
export const ActualizarItemServices = async (req: Request, res: Response) => {
  const itemservice: IITemServices = req.body;

  await pool.query(
    "SELECT *from function_itemsservices_actualizar($1,$2, $3, $4,$5,$6);",
    [
      itemservice.id_groupservices,
      itemservice.code,
      itemservice.name,
      itemservice.description ? itemservice.description : null,
      itemservice.status == "true" ||
      itemservice.status == "1" ||
      itemservice.status == 1
        ? 1
        : 0,
      itemservice.id,
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
