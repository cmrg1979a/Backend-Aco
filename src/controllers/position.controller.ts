import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { IPosition } from "interface/iPosition";

export const CargarPosicion = async (req: Request, res: Response) => {
  const position: IPosition = req.query;
  await pool.query(
    "SELECT * FROM function_position_cargar($1)",
    [position.id_branch],
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

export const ListarPosicion = async (req: Request, res: Response) => {
  const position: IPosition = req.query;
  await pool.query(
    "SELECT * FROM function_position_listar($1,$2,$3,$4)",
    [
      position.code ? position.code : null,
      position.name ? position.name : null,
      position.description ? position.description : null,
      Boolean(position.estado) ? position.estado : null,
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
export const verPosicion = async (req: Request, res: Response) => {
  const position: IPosition = req.query;
  await pool.query(
    "SELECT * FROM function_position_ver($1,$2)",
    [position.id, position.id_branch],
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
export const CargarUsuarioNoAsignadoPosicion = async (
  req: Request,
  res: Response
) => {
  const position: IPosition = req.query;
  await pool.query(
    "SELECT * FROM function_user_noasignadosposicion($1,$2)",
    [position.id, position.id_branch],
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

export const insertarActualizarUsuarioPosicion = async (
  req: Request,
  res: Response
) => {
  const position = req.body;
  await pool.query(
    "SELECT * FROM function_user_position_insertar($1,$2,$3,$4)",
    [
      position.user_position.map((element) => {
        return element.id ? element.id : null;
      }),
      position.id,
      position.user_position.map((element) => {
        return element.id_users;
      }),
      position.user_position.map((element) => {
        return element.estado;
      }),
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

export const cambiarEstadoPosicion = async (req: Request, res: Response) => {
  const position = req.body;
  await pool.query(
    "SELECT * FROM function_position_cambiarestado($1)",
    [position.id],
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
