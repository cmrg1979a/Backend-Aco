import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

import { postIngresos } from "../interface/ingresos";

export const getListIngreso = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_ingreso_listar($1,$2, $3, $4, $5);",
    [
      data.id_branch,
      data.code ? data.code : null,
      data.description ? data.description : null,
      data.calculoflag ? data.calculoflag : null,
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

export const insertIngreso = async (req: Request, res: Response) => {
  const dataObj: postIngresos = req.body;

  await pool.query(
    "SELECT *from function_ingreso_insertar($1, $2, $3, $4, $5);",
    [
      dataObj.id_branch,
      dataObj.code,
      dataObj.description,
      dataObj.calculoflag,
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
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const readIngreso = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_ingreso_ver($1);",
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

export const updateIngreso = async (req: Request, res: Response) => {
  const dataObj: postIngresos = req.body;

  await pool.query(
    "SELECT *from function_ingreso_actualizar($1,$2, $3, $4);",
    [dataObj.id, dataObj.description, dataObj.calculoflag, dataObj.status],
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

export const validateCodeIngresoNuevo = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_validar_codigo_nuevo_ingreso($1,$2);",
    [data.id_branch, data.code],
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
