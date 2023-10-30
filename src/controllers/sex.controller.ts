import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const getSex = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_SEX_list();",
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

export const getListSex = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_listar_sex($1,$2, $3, $4, $5, $6);", [
    data.id_branch,
    data.code ? data.code : null,
    data.name ? data.name : null,
    data.acronym ? data.acronym : null,
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

export const insertSex = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_insertar_sex($1,$2, $3, $4, $5);", [
    data.id_branch,
    data.acronym,
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

export const readSex = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_ver_sex($1);", [
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

export const updateSex = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_actualizar_sex($1,$2, $3, $4, $5, $6);", [
    data.id,
    data.id_branch,
    data.acronym,
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


export const validateAcronymInTableSex = async (req: Request, res: Response) => {
  let data = req.query;

  await pool.query("SELECT *from function_validar_acronimo_sexo($1,$2, $3);", [
    data.id,
    data.acronym,
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
