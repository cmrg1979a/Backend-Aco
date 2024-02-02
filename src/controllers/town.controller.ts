import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { ITown } from "interface/iTown";
const { Pool } = pg;
const pool = conexion();

export const getTown = async (req: Request, res: Response) => {
  const { idTown } = req.body;
  await pool.query(
    " select * from LOC_TOWN_listar($1);",
    [idTown],
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

export const ListarTown = async (req: Request, res: Response) => {
  let town: ITown = req.query;
  await pool.query(
    " SELECT * FROM function_town_listar($1,$2,$3,$4,$5,$6,$7)",
    [
      town.id_pais ? town.id_pais : null,
      town.id_state ? town.id_state : null,
      town.id_city ? town.id_city : null,
      town.code ? town.code : null,
      town.name ? town.name : null,
      town.description ? town.description : null,
      town.status ? town.status : null,
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

export const InsertarTown = async (req: Request, res: Response) => {
  let town: ITown = req.body;
  await pool.query(
    " SELECT * FROM function_town_insertar($1,$2,$3,$4)",
    [
      town.id_city,
      town.name,
      town.description ? town.description : town.description,
      town.status,
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
export const ActualizarTown = async (req: Request, res: Response) => {
  let town: ITown = req.body;
  await pool.query(
    " SELECT * FROM function_town_actualizar($1,$2,$3,$4,$5)",
    [
      town.id_city,
      town.name,
      town.description ? town.description : null,
      town.status,
      town.id,
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
