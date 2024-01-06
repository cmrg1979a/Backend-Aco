import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

import { postModality } from "../interface/modality";

export const getModality = async (req: Request, res: Response) => {
  await pool.query(
    "select * from TABLE_MODALITY_LISTAR();",
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


export const getListModality = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query("SELECT *from function_modality_listar($1,$2, $3, $4, $5);", [
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
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const insertModality = async (req: Request, res: Response) => {
  const dataObj: postModality = req.body;

  await pool.query("SELECT *from function_modality_insertar($1,$2, $3, $4, $5);", [
    dataObj.id_branch,
    dataObj.name,
    dataObj.code,
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

export const readModality = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query("SELECT *from function_modality_ver($1);", [
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

export const updateModality = async (req: Request, res: Response) => {
  const dataObj: postModality = req.body;

  await pool.query("SELECT *from function_modality_actualizar($1,$2, $3, $4);", [
    dataObj.id,
    dataObj.name,
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