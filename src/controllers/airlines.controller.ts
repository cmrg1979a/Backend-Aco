import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { ModelAirlines } from "interface/airlines";
const { Pool } = pg;
const pool = conexion();

export const ListarAirlines = async (req: Request, res: Response) => {
  const modelAirlines: ModelAirlines = req.query;

  await pool.query(
    "SELECT * FROM function_airlines_listar($1,$2,$3,$4,$5,$6,$7)",
    [
      modelAirlines.id_branch,
      modelAirlines.code || null,
      modelAirlines.code_iata || null,
      modelAirlines.code_icao || null,
      modelAirlines.name || null,
      modelAirlines.status !== "null" ? modelAirlines.status === "true" : null,

      modelAirlines.id_pais || null,
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
export const validateIATANuevo = async (req: Request, res: Response) => {
  const modelAirlines: ModelAirlines = req.query;

  await pool.query(
    "SELECT * FROM function_airlines_validariata_nuevo($1,$2)",
    [modelAirlines.id_branch, modelAirlines.code_iata || null],
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
export const validateICAONuevo = async (req: Request, res: Response) => {
  const modelAirlines: ModelAirlines = req.query;

  await pool.query(
    "SELECT * FROM function_airlines_validaricao_nuevo($1,$2)",
    [modelAirlines.id_branch, modelAirlines.code_icao || null],
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

export const GuardarAirlines = async (req: Request, res: Response) => {
  const modelAirlines: ModelAirlines = req.body;
  console.log(modelAirlines);

  await pool.query(
    "SELECT * FROM function_airlines_insertar($1,$2,$3,$4,$5,$6)",
    [
      modelAirlines.id_branch,
      modelAirlines.id_pais || null,
      modelAirlines.code_iata,
      modelAirlines.code_icao,
      modelAirlines.name,
      modelAirlines.status,
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

export const validateIATAEditar = async (req: Request, res: Response) => {
  const modelAirlines: ModelAirlines = req.query;

  await pool.query(
    "SELECT * FROM function_airlines_validariata_editar($1,$2,$3)",
    [
      modelAirlines.id_branch,
      modelAirlines.code_iata || null,
      modelAirlines.id,
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
export const validateICAOEditar = async (req: Request, res: Response) => {
  const modelAirlines: ModelAirlines = req.query;

  await pool.query(
    "SELECT * FROM function_airlines_validaricao_editar($1,$2,$3)",
    [
      modelAirlines.id_branch,
      modelAirlines.code_icao || null,
      modelAirlines.id,
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

export const GuardarEditar = async (req: Request, res: Response) => {
  const modelAirlines: ModelAirlines = req.body;

  await pool.query(
    "SELECT * FROM function_airlines_editar($1,$2,$3,$4,$5,$6)",
    [
      modelAirlines.id,
      modelAirlines.id_pais || null,
      modelAirlines.code_iata,
      modelAirlines.code_icao,
      modelAirlines.name,
      modelAirlines.status,
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
export const getAilrines = async (req: Request, res: Response) => {
  const modelAirlines: ModelAirlines = req.query;
  await pool.query(
    "SELECT * FROM Table_airlines_cargar($1)",
    [modelAirlines.id_branch],
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
