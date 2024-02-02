import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { ICity } from "../interface/iCity";
const { Pool } = pg;

const pool = conexion();

export const getCity = async (req: Request, res: Response) => {
  const city: ICity = req.body;
  await pool.query(
    "SELECT * FROM function_city_cargar($1);",
    [city.idState ? city.idState : null],
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

export const ListarCity = async (req: Request, res: Response) => {
  let city: ICity = req.query;
  await pool.query(
    " SELECT * FROM function_city_listar($1,$2,$3,$4,$5,$6)",
    [
      city.id_pais ? city.id_pais : null,
      city.id_state ? city.id_state : null,
      city.code ? city.code : null,
      city.name ? city.name : null,
      city.description ? city.description : null,
      city.status ? city.status : null,
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

export const InsertarCity = async (req: Request, res: Response) => {
  let city: ICity = req.body;
  await pool.query(
    " SELECT * FROM function_city_insertar($1,$2,$3,$4)",
    [
      city.id_state,
      city.name,
      city.description ? city.description : city.description,
      city.status,
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
export const ActualizarCity = async (req: Request, res: Response) => {
  let city: ICity = req.body;
  await pool.query(
    " SELECT * FROM function_city_actualizar($1,$2,$3,$4,$5)",
    [
      city.id_state,
      city.name,
      city.description ? city.description : null,
      city.status,
      city.id,
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
