import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { IBegend } from "interface/iBegend";
const { Pool } = pg;
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const cargarBegend = async (req: Request, res: Response) => {
  await pool.query(
    `SELECT * FROM table_begend_cargar($1);`,
    [req.body.id_branch],
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

export const ListBegend = async (req: Request, res: Response) => {
  const begend: IBegend = req.query;
  let status = [1, 0, "1", "0"];
  await pool.query(
    `SELECT * FROM function_begend_listar($1,$2,$3,$4,$5,$6,$7);`,
    [
      begend.id_branch ? begend.id_branch : null,
      begend.code ? begend.code : null,
      begend.name ? begend.name : null,
      begend.description ? begend.description : null,
      begend.color ? begend.color : null,
      begend.position ? begend.position : null,
      status.includes(begend.status) ? begend.status : null,
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
export const InsertarBegend = async (req: Request, res: Response) => {
  const begend: IBegend = req.body;
  await pool.query(
    `SELECT * FROM function_begend_insertar($1,$2,$3,$4,$5,$6,$7);`,
    [
      begend.position,
      begend.code,
      begend.name,
      begend.description ? begend.description : null,
      begend.color ? begend.color : null,
      begend.id_branch,
      begend.status,
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
export const ActualizarBegend = async (req: Request, res: Response) => {
  const begend: IBegend = req.body;
  console.log(begend);

  await pool.query(
    `SELECT * FROM function_begend_actualizar($1,$2,$3,$4,$5,$6);`,
    [
      begend.position,
      begend.name,
      begend.description ? begend.description : null,
      begend.color ? begend.color : null,
      begend.status,
      begend.id,
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

export const ValidateBegendPositionInsert = async (
  req: Request,
  res: Response
) => {
  const begend: IBegend = req.query;
  await pool.query(
    `SELECT * FROM function_begend_validate_position($1,$2);`,
    [
      begend.id_branch ? begend.id_branch : null,
      begend.position ? begend.position : null,
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
export const ValidateBegendPositionActualizar = async (
  req: Request,
  res: Response
) => {
  const begend: IBegend = req.query;
  await pool.query(
    `SELECT * FROM function_begend_validate_position_actualizar($1,$2,$3);`,
    [
      begend.id_branch ? begend.id_branch : null,
      begend.position ? begend.position : null,
      begend.id ? begend.id : null,
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
