import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import path from "path";
var xl = require("excel4node");

export const setProyeccion = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query(
    "SELECT * FROM function_proyeccion_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);",
    [
      data.id_branch,
      data.id_month,
      data.id_year,
      data.id_user,
      data.tipocambio,
      data.total_monlocal,
      data.total_conversionext,
      data.total_monext,
      data.total_proyectado_ext,
      data.details.map((item) => {
        return item.id_tiposubgasto;
      }),
      data.details.map((item) => {
        return item.id_entitie;
      }),
      data.details.map((item) => {
        return item.id_coin;
      }),
      data.details.map((item) => {
        return item.descripcion;
      }),
      data.details.map((item) => {
        return item.monto_monlocal;
      }),
      data.details.map((item) => {
        return item.monto_monext;
      }),
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const listProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_list_proyeccion($1,$2,$3,$4,$5,$6,$7,$8,$9);",
    [
      req.query.pid_branch ? req.query.pid_branch : null,
      req.query.pid_month ? req.query.pid_month : null,
      req.query.pid_year ? req.query.pid_year : null,
      req.query.pid_user ? req.query.pid_user : null,
      req.query.ptipocambio ? req.query.ptipocambio : null,
      req.query.ptotal_monlocal ? req.query.ptotal_monlocal : null,
      req.query.ptotal_conversionext ? req.query.ptotal_conversionext : null,
      req.query.ptotal_monext ? req.query.ptotal_monext : null,
      req.query.ptotal_proyectado_ext ? req.query.ptotal_proyectado_ext : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
