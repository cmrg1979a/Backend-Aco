import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getPerformances = async (req: Request, res: Response) => {
  const { id_transport } = req.body;
  await pool.query(
    "SELECT * FROM PERFORMANCE_listar();",
    null,
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

export const getListPerformance = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_listar_performance($1,$2, $3, $4);", [
    data.id_branch,
    data.code ? data.code : null,
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

export const insertPerformance = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_insertar_performance($1,$2, $3);", [
    data.description,
    data.status,
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

export const readPerformance = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_ver_performance($1);", [
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

export const updatePerformance = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_actualizar_performance($1,$2, $3);", [
    data.id,
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
