import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const getIncoterms = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_INCOTERMS_LISTAR($1)",
    [req.body.id_branch],
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

export const getListIncoterms = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_listar_incoterms($1,$2, $3, $4);", [
    data.id_branch,
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

export const insertIncoterms = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_insert_incoterms($1,$2, $3, $4);", [
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

export const readIncoterms = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_ver_incoterms($1);", [
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

export const updateIncoterms = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_actualizar_incoterms($1,$2, $3);", [
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
