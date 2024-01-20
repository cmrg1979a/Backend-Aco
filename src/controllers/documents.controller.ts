import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();
import { postDocuments } from "../interface/documentos";

export const getDocumentsList = async (req: Request, res: Response) => {
  const { id_pais } = req.body;
  await pool.query(
    "SELECT * FROM Pais_Document_documento($1)",
    [id_pais],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getListDocumentsByBranch = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_documents_listar($1,$2, $3, $4, $5);",
    [
      data.code ? data.code : null,
      data.name ? data.name : null,
      data.description ? data.description : null,
      data.status ? data.status : null,
      data.id_branch,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const insertDocuments = async (req: Request, res: Response) => {
  const dataObj: postDocuments = req.body;

  await pool.query(
    "SELECT *from function_insertar_documents($1,$2, $3, $4);",
    [dataObj.name, dataObj.description, dataObj.status, dataObj.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const readDocuments = async (req: Request, res: Response) => {
  const data = req.query;
  await pool.query(
    "SELECT *from function_documents_ver($1);",
    [data.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const updateDocuments = async (req: Request, res: Response) => {
  const dataObj: postDocuments = req.body;

  await pool.query(
    "SELECT *from function_documents_actualizar($1,$2, $3, $4);",
    [dataObj.id, dataObj.name, dataObj.description, dataObj.status],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
