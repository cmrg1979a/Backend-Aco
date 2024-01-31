import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { IMotonave } from "interface/iMotonave";
const { Pool } = pg;

const pool = conexion();

export const getMotonave = async (req: Request, res: Response) => {
  let motonave: IMotonave = req.query;
  await pool.query(
    " SELECT * FROM table_motonave_cargar($1)",
    [motonave.id_branch],
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
export const ListarMontonave = async (req: Request, res: Response) => {
  let motonave: IMotonave = req.query;
  await pool.query(
    " SELECT * FROM function_motonave_listar($1,$2,$3,$4)",
    [
      motonave.id_branch,
      motonave.name ? motonave.name : null,
      motonave.description ? motonave.description : null,
      motonave.status ? motonave.status : null,
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
export const InsertarMontonave = async (req: Request, res: Response) => {
  let motonave: IMotonave = req.body;
  await pool.query(
    " SELECT * FROM function_motonave_insertar($1,$2,$3,$4)",
    [
      motonave.id_branch,
      motonave.name,
      motonave.description ? motonave.description : null,
      motonave.status,
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
export const ActualizarMotonave = async (req: Request, res: Response) => {
  let motonave: IMotonave = req.body;
  await pool.query(
    " SELECT * FROM function_motonave_actualizar($1,$2,$3,$4)",
    [
      motonave.name,
      motonave.description ? motonave.description : null,
      motonave.status,
      motonave.id,
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
