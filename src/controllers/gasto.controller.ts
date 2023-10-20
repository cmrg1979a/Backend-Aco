import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const getListGasto = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_list_table_gasto($1,$2, $3, $4, $5);", [
    data.id_branch,
    data.code ? data.code : null,
    data.description ? data.description : null,
    data.calculoflag ? data.calculoflag : null,
    data.status
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else { 
        console.log("No se encontraron resultados");
      }
  } catch (error) {
      console.log('Error al listar los resultados:', error);
  }
}

export const insertGasto = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_insert_table_gasto($1, $2, $3, $4, $5);", [
    data.id_branch,
    data.code,
    data.description,
    data.calculoflag,
    data.status,
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        console.log('No se pudo insertar el registro.');
      }
  } catch (error) {
      console.log('Error al insertar el registro:', error);
  }
}

export const readGasto = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_see_table_gasto($1);", [
    data.id
  ]);

  const { rows } = result;

  try {
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      console.log('No se encontraron resultados.');
    }
  } catch (error) {
      console.log('Error al accceder el registro:', error);
  }
}

export const updateGasto = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_edit_table_gasto($1,$2, $3, $4);", [
    data.id,
    data.description,
    data.calculoflag,
    data.status,
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        console.log("No se pudo actualizar el registro");
      }
  } catch (error) {
      console.log('Error al actualizar el registro:', error);
  }
}

export const switchGasto = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_switch_table_gasto($1, $2);", [
    data.id,
    data.status
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
          console.log('No se pudo eliminar el registro.');
      }
  } catch (error) {
      console.log('Error al eliminar el registro:', error);
  }
}


export const validateCodeGasto = async (req: Request, res: Response) => {
  let data = req.query;

  const result = await pool.query("SELECT *from function_validates_code_in_table_gasto($1,$2, $3);", [
    data.id,
    data.id_branch,
    data.code,
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        console.log("No se encontraron resultados");
      }
  } catch (error) {
      console.log('Error al listar las regiones:', error);
  }
}
