import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getDocumentsList = async (req: Request, res: Response) => {
  const { id_pais } = req.body;
  await pool.query(
    "SELECT * FROM Pais_Document_documento($1)",
    [id_pais],
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

export const getListDocumentsByBranch = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_listar_documents($1,$2, $3, $4, $5);", [
    data.code ? data.code : null,
    data.name ? data.name : null,
    data.description ? data.description : null,
    data.status ? data.status : null,
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

export const insertDocuments = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_insertar_documents($1,$2, $3, $4);", [
    data.name,
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

export const readDocuments = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_ver_documents($1);", [
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

export const updateDocuments = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_actualizar_documents($1,$2, $3, $4);", [
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