import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();
export const getCoinsList = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM Table_Coins_listar();",
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const getListCoinsByBranch = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_coins_listar($1,$2, $3, $4, $5, $6, $7);", [
    data.id_branch,
    data.code ? data.code : null,
    data.symbol ? data.symbol : null,
    data.acronym ? data.acronym : null,
    data.name ? data.name : null,
    data.description ? data.description : null,
    data.status ? data.status : null
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const insertCoins = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_coins_insertar($1,$2, $3, $4, $5, $6);", [
    data.id_branch,
    data.symbol,
    data.acronym,
    data.name,
    data.description,
    data.status,
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const readCoins = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_coins_ver($1);", [
    data.id
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const updateCoins = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_coins_actualizar($1,$2, $3, $4, $5, $6);", [
    data.id,
    data.symbol,
    data.acronym,
    data.name,
    data.description,
    data.status
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}
