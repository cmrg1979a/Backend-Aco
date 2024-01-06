import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();
import { postMarketing } from "../interface/marketing";

export const getListMarketing = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query("SELECT *from function_marketing_listar($1,$2, $3, $4, $5);", [
    data.id_branch,
    data.name ? data.name : null,
    data.description ? data.description : null,
    data.position ? data.position : null,
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

export const insertMarketing = async (req: Request, res: Response) => {
  const dataObj: postMarketing = req.body;

  await pool.query("SELECT *from function_marketing_insertar($1,$2, $3, $4, $5);", [
    dataObj.name,
    dataObj.description,
    dataObj.position,
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

export const readMarketing = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query("SELECT *from function_marketing_ver($1);", [
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
  const dataObj: postMarketing = req.body;

  await pool.query("SELECT *from function_marketing_actualizar($1,$2, $3, $4, $5);", [
    dataObj.id,
    dataObj.name,
    dataObj.description,
    dataObj.position,
    dataObj.status
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


export const validatePositionMarketingNuevo = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query("SELECT *from function_validar_position_nuevo_marketing($1,$2);", [
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


export const validatePositionMarketingEditar = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query("SELECT *from function_validar_position_editar_marketing($1,$2, $3);", [
    data.id,
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
  const data = req.query;

  await pool.query("SELECT *from function_siguiente_posicion_marketing($1);", [
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