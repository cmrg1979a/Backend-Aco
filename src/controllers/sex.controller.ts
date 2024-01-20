import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { postSex } from "../interface/sex";

export const getSex = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_SEX_list();",
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

export const getListSex = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_sex_listar($1,$2, $3, $4, $5, $6);",
    [
      data.id_branch,
      data.code ? data.code : null,
      data.name ? data.name : null,
      data.acronym ? data.acronym : null,
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
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const insertSex = async (req: Request, res: Response) => {
  const dataObj: postSex = req.body;

  await pool.query(
    "SELECT *from function_sex_insertar($1,$2, $3, $4, $5);",
    [
      dataObj.id_branch,
      dataObj.acronym,
      dataObj.name,
      dataObj.description,
      dataObj.status,
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

export const readSex = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_sex_ver($1);",
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

export const updateSex = async (req: Request, res: Response) => {
  const dataObj: postSex = req.body;

  await pool.query(
    "SELECT *from function_sex_actualizar($1,$2, $3, $4, $5);",
    [
      dataObj.id,
      dataObj.acronym,
      dataObj.name,
      dataObj.description,
      dataObj.status,
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

export const validateAcronymInTableSexNuevo = async (
  req: Request,
  res: Response
) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_validar_acronimo_nuevo_sexo($1,$2);",
    [data.acronym, data.id_branch],
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

export const validateAcronymInTableSexEditar = async (
  req: Request,
  res: Response
) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_validar_acronimo_editar_sexo($1,$2, $3);",
    [data.id, data.acronym, data.id_branch],
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
