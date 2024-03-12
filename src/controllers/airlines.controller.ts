import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { IAirlines } from "interface/iAirlines";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const { Pool } = pg;
const pool = conexion();

export const ListarAirlines = async (req: Request, res: Response) => {
  const iAirlines: IAirlines = req.query;

  await pool.query(
    "SELECT * FROM function_airlines_listar($1,$2,$3,$4,$5,$6,$7)",
    [
      iAirlines.id_branch,
      iAirlines.code || null,
      iAirlines.code_iata || null,
      iAirlines.code_icao || null,
      iAirlines.name || null,
      iAirlines.status !== "null" ? iAirlines.status === "true" : null,
      iAirlines.id_pais || null,
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
export const validateIATANuevo = async (req: Request, res: Response) => {
  const iAirlines: IAirlines = req.query;
  await pool.query(
    "SELECT * FROM function_airlines_validariata_nuevo($1,$2)",
    [iAirlines.id_branch, iAirlines.code_iata || null],
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
export const validateICAONuevo = async (req: Request, res: Response) => {
  const iAirlines: IAirlines = req.query;

  await pool.query(
    "SELECT * FROM function_airlines_validaricao_nuevo($1,$2)",
    [iAirlines.id_branch, iAirlines.code_icao || null],
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

export const GuardarAirlines = async (req: Request, res: Response) => {
  const iAirlines: IAirlines = req.body;

  await pool.query(
    "SELECT * FROM function_airlines_insertar($1,$2,$3,$4,$5,$6)",
    [
      iAirlines.id_branch,
      iAirlines.id_pais || null,
      iAirlines.code_iata,
      iAirlines.code_icao,
      iAirlines.name,
      iAirlines.status,
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

export const validateIATAEditar = async (req: Request, res: Response) => {
  const iAirlines: IAirlines = req.query;

  await pool.query(
    "SELECT * FROM function_airlines_validariata_editar($1,$2,$3)",
    [iAirlines.id_branch, iAirlines.code_iata || null, iAirlines.id],
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
export const validateICAOEditar = async (req: Request, res: Response) => {
  const iAirlines: IAirlines = req.query;

  await pool.query(
    "SELECT * FROM function_airlines_validaricao_editar($1,$2,$3)",
    [iAirlines.id_branch, iAirlines.code_icao || null, iAirlines.id],
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

export const GuardarEditar = async (req: Request, res: Response) => {
  const iAirlines: IAirlines = req.body;

  await pool.query(
    "SELECT * FROM function_airlines_editar($1,$2,$3,$4,$5,$6)",
    [
      iAirlines.id,
      iAirlines.id_pais || null,
      iAirlines.code_iata,
      iAirlines.code_icao,
      iAirlines.name,
      iAirlines.status,
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
export const getAilrines = async (req: Request, res: Response) => {
  const iAirlines: IAirlines = req.query;

  await pool.query(
    "SELECT * FROM Table_airlines_cargar($1)",
    [iAirlines.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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
