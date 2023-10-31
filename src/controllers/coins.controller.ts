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
  const result = await pool.query(
    "SELECT *from function_list_table_coins($1,$2, $3, $4, $5, $6, $7);",
    [
      data.id_branch,
      data.code ? data.code : null,
      data.symbol ? data.symbol : null,
      data.acronym ? data.acronym : null,
      data.name ? data.name : null,
      data.description ? data.description : null,
      data.status,
    ]
  );

  const { rows } = result;

  try {
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      console.log("No se encontraron resultados");
    }
  } catch (error) {
    console.log("Error al listar los resultados:", error);
  }
};

export const insertCoins = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query(
    "SELECT *from function_insert_table_coins($1,$2, $3, $4, $5, $6);",
    [
      data.id_branch,
      data.symbol,
      data.acronym,
      data.name,
      data.description,
      data.status,
    ]
  );

  const { rows } = result;

  try {
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      console.log("No se pudo insertar el registro.");
    }
  } catch (error) {
    console.log("Error al insertar el registro:", error);
  }
};

export const readCoins = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query(
    "SELECT *from function_see_table_coins($1);",
    [data.id]
  );

  const { rows } = result;

  try {
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      console.log("No se encontraron resultados.");
    }
  } catch (error) {
    console.log("Error al accceder el registro:", error);
  }
};

export const updateCoins = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query(
    "SELECT *from function_edit_table_coins($1,$2, $3, $4, $5, $6);",
    [
      data.id,
      data.symbol,
      data.acronym,
      data.name,
      data.description,
      data.status,
    ]
  );

  const { rows } = result;

  try {
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      console.log("No se pudo actualizar el registro");
    }
  } catch (error) {
    console.log("Error al actualizar el registro:", error);
  }
};

export const swicthCoins = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query(
    "SELECT *from function_switch_table_coins($1, $2);",
    [data.id, data.status]
  );

  const { rows } = result;

  try {
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      console.log("No se pudo eliminar el registro.");
    }
  } catch (error) {
    console.log("Error al eliminar el registro:", error);
  }
};
