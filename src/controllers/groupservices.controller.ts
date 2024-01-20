import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

import { postGroupServices } from "../interface/groupservices";

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
        });
      } else {
        console.log(err);
      }
    }
  );
};
