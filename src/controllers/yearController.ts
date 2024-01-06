import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

import { postYear } from "../interface/year";

export const getChargeYear = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_YEAR_listar();",
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

export const getListYear = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query("SELECT *from function_year_listar($1,$2, $3);", [
    data.id_branch,
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

export const insertYear = async (req: Request, res: Response) => {
  const dataObj: postYear = req.body;

  await pool.query("SELECT *from function_year_insertar($1,$2, $3);", [
    dataObj.description,
    dataObj.status,
    dataObj.id_branch,
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

export const readYear = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query("SELECT *from function_year_ver($1);", [
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

export const updateYear = async (req: Request, res: Response) => {
  const dataObj: postYear = req.body;

  await pool.query("SELECT *from function_year_actualizar($1,$2, $3);", [
    dataObj.id,
    dataObj.description,
    dataObj.status  
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

export const validateCodeInTableYear = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query("SELECT *from function_validar_codigo_year($1,$2);", [
    data.description,
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