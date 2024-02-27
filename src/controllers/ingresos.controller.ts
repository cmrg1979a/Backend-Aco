import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { postIngresos } from "../interface/ingresos";
import { ISubIngreso } from "interface/iSubIngreso";

export const getListIngreso = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_ingreso_listar($1,$2, $3, $4, $5);",
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const insertIngreso = async (req: Request, res: Response) => {
  const dataObj: postIngresos = req.body;

  await pool.query(
    "SELECT *from function_ingreso_insertar($1, $2, $3, $4, $5);",
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const readIngreso = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_ingreso_ver($1);",
    [data.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const updateIngreso = async (req: Request, res: Response) => {
  const dataObj: postIngresos = req.body;

  await pool.query(
    "SELECT *from function_ingreso_actualizar($1,$2, $3, $4);",
    [dataObj.id, dataObj.description, dataObj.calculoflag, dataObj.status],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const validateCodeIngresoNuevo = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_validar_codigo_nuevo_ingreso($1,$2);",
    [data.id_branch, data.code],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const CargarIngreso = async (req: Request, res: Response) => {
  const ingresos: postIngresos = req.query;
  await pool.query(
    `SELECT * FROM function_ingreso_cargar($1);`,
    [ingresos.id_branch ? ingresos.id_branch : null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ListSubIngreso = async (req: Request, res: Response) => {
  const subingreso: ISubIngreso = req.query;
  console.log(Boolean(subingreso.calculoflag));

  await pool.query(
    `SELECT * FROM function_subingreso_listar($1,$2,$3,$4,$5,$6,$7);`,
    [
      subingreso.id_branch ? subingreso.id_branch : null,
      subingreso.id_ingreso ? subingreso.id_ingreso : null,
      subingreso.code ? subingreso.code : null,
      subingreso.description ? subingreso.description : null,
      Boolean(subingreso.status) ? subingreso.status : null,
      Boolean(subingreso.calculoflag) ? subingreso.calculoflag : null,
      Boolean(subingreso.mostrarflag) ? subingreso.mostrarflag : null,
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ValidarCodigoSubIngreso = async (req: Request, res: Response) => {
  const subingreso: ISubIngreso = req.query;
  console.log(subingreso.mostrarflag);

  await pool.query(
    `SELECT * FROM function_subingreso_validarcodigo($1,$2);`,
    [
      subingreso.id_branch ? subingreso.id_branch : null,
      subingreso.code ? subingreso.code : null,
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const InsertarSubIngreso = async (req: Request, res: Response) => {
  const subingreso: ISubIngreso = req.body;

  await pool.query(
    `SELECT * FROM function_subingreso_insertar($1,$2,$3,$4,$5,$6,$7);`,
    [
      subingreso.id_ingreso,
      subingreso.code,
      subingreso.description ? subingreso.description : null,
      subingreso.status,
      subingreso.id_branch,
      subingreso.calculoflag,
      subingreso.mostrarflag,
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ActualizarSubIngreso = async (req: Request, res: Response) => {
  const subingreso: ISubIngreso = req.body;
  await pool.query(
    `SELECT * FROM function_subingreso_actualizar($1,$2,$3,$4,$5,$6);`,
    [
      subingreso.id_ingreso,
      subingreso.description ? subingreso.description : null,
      subingreso.status,
      subingreso.calculoflag,
      subingreso.mostrarflag,
      subingreso.id,
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
