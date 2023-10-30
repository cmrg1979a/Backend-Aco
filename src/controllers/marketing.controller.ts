import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getListMarketing = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_listar_marketing($1,$2, $3, $4, $5);", [
    data.id_branch,
    data.name ? data.name : null,
    data.description ? data.description : null,
    data.position ? data.position : null,
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

export const insertMarketing = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_insertar_marketing($1,$2, $3, $4, $5);", [
    data.name,
    data.description,
    data.position,
    data.status,
    data.id_branch,
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

export const readMarketing = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_ver_marketing($1);", [
    data.id
  ], 
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        data: rows,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
      });
    } else {
      console.log(err);
    }
  });

}

export const updateMarketing = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_actualizar_marketing($1,$2, $3, $4, $5);", [
    data.id,
    data.name,
    data.description,
    data.position,
    data.status
  ], (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        data: rows,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
      });
    } else {
      console.log(err);
    }
  });

}


export const validatePositionMarketing = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_validar_position_marketing($1,$2, $3);", [
    data.id ? data.id : 0,
    data.id_branch,
    data.position ? data.position : null
  ], (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        data: rows,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
      });
    } else {
      console.log(err);
    }
  });
}

export const nextPositionMarketing = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_buscar_siguiente_posicion_marketing($1);", [
    data.id_branch
  ], 
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        data: rows,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
      });
    } else {
      console.log(err);
    }
  });

}