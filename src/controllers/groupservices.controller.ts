import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();


export const getListGroupservices = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_listar_groupservices($1,$2, $3, $4, $5);", [
    data.id_branch,
    data.code ? data.code : null,
    data.name ? data.name : null,
    data.description ? data.description : null,
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

export const insertGroupservices = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_insertar_groupservices($1,$2, $3, $4);", [
    data.id_branch,
    data.name,
    data.description,
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

export const readGroupservices = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_ver_groupservices($1);", [
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

export const updateGroupservices = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_actualizar_groupservices($1,$2, $3, $4);", [
    data.id,
    data.name,
    data.description,
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
