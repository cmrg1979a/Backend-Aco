import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const getListIngreso = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_listar_ingreso($1,$2, $3, $4, $5);", [
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
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const insertIngreso = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_insertar_ingreso($1, $2, $3, $4, $5);", [
    data.id_branch,
    data.code,
    data.description,
    data.calculoflag,
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

export const readIngreso = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_ver_ingreso($1);", [
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

export const updateIngreso = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_actualizar_ingreso($1,$2, $3, $4);", [
    data.id,
    data.description,
    data.calculoflag,
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

export const validateCodeIngreso = async (req: Request, res: Response) => {
  let data = req.query;

  await pool.query("SELECT *from function_validar_codigo_ingreso($1,$2, $3);", [
    data.id,
    data.id_branch,
    data.code,
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
