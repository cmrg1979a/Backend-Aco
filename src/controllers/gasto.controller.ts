import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

import { postGasto } from "../interface/gastos";
import { ISubGasto } from "interface/iSubGasto";

export const CargarGasto = async (req: Request, res: Response) => {
  const gasto: postGasto = req.query;

  await pool.query(
    `SELECT * FROM function_gasto_cargar($1);`,
    [gasto.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getListGasto = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_gasto_listar($1,$2, $3, $4, $5);",
    [
      data.id_branch,
      data.code ? data.code : null,
      data.description ? data.description : null,
      data.calculoflag ? data.calculoflag : null,
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

export const insertGasto = async (req: Request, res: Response) => {
  const dataObj: postGasto = req.body;

  await pool.query(
    "SELECT *from function_gasto_insertar($1, $2, $3, $4, $5);",
    [
      dataObj.id_branch,
      dataObj.code,
      dataObj.description,
      dataObj.calculoflag,
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

export const readGasto = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_gasto_ver($1);",
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

export const updateGasto = async (req: Request, res: Response) => {
  const dataObj: postGasto = req.body;

  await pool.query(
    "SELECT *from function_gasto_actualizar($1,$2, $3, $4);",
    [dataObj.id, dataObj.description, dataObj.calculoflag, dataObj.status],
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

export const validateCodeGastoNuevo = async (req: Request, res: Response) => {
  let data = req.query;

  await pool.query(
    "SELECT *from function_validar_codigo_nuevo_gasto($1,$2);",
    [data.id_branch, data.code],
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

export const ListSubGasto = async (req: Request, res: Response) => {
  const subgasto: ISubGasto = req.query;

  await pool.query(
    `SELECT * FROM function_subgasto_listar($1,$2,$3,$4,$5,$6,$7);`,
    [
      subgasto.id_branch ? subgasto.id_branch : null,
      subgasto.id_gasto ? subgasto.id_gasto : null,
      subgasto.code ? subgasto.code : null,
      subgasto.description ? subgasto.description : null,
      Boolean(subgasto.status) ? subgasto.status : null,
      Boolean(subgasto.calculoflag) ? subgasto.calculoflag : null,
      Boolean(subgasto.mostrarflag) ? subgasto.mostrarflag : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ValidarCodigoSubGasto = async (req: Request, res: Response) => {
  const subgasto: ISubGasto = req.query;
  await pool.query(
    `SELECT * FROM function_subgasto_validarcodigo($1,$2);`,
    [
      subgasto.id_branch ? subgasto.id_branch : null,
      subgasto.code ? subgasto.code : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const InsertarSubGasto = async (req: Request, res: Response) => {
  const subgasto: ISubGasto = req.body;

  await pool.query(
    `SELECT * FROM function_subgasto_insertar($1,$2,$3,$4,$5,$6,$7);`,
    [
      subgasto.id_gasto,
      subgasto.code,
      subgasto.description ? subgasto.description : null,
      subgasto.status,
      subgasto.id_branch,
      subgasto.calculoflag,
      subgasto.mostrarflag,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ActualizarSubGasto = async (req: Request, res: Response) => {
  const subgasto: ISubGasto = req.body;
  await pool.query(
    `SELECT * FROM function_subgasto_actualizar($1,$2,$3,$4,$5,$6);`,
    [
      subgasto.id_gasto,
      subgasto.description ? subgasto.description : null,
      subgasto.status,
      subgasto.calculoflag,
      subgasto.mostrarflag,
      subgasto.id,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
