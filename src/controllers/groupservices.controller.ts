import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();


export const getListGroupservices = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_list_table_groupservices($1,$2, $3, $4, $5);", [
    data.id_branch,
    data.code ? data.code : null,
    data.name ? data.name : null,
    data.description ? data.description : null,
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

export const insertGroupservices = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_insert_table_groupservices($1,$2, $3, $4);", [
    data.id_branch,
    data.name,
    data.description,
    data.status
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

export const readGroupservices = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_see_table_groupservices($1);", [
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

export const updateGroupservices = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_edit_table_groupservices($1,$2, $3, $4);", [
    data.id,
    data.name,
    data.description,
    data.status
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

export const switchGroupservices = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_switch_table_groupservices($1, $2);", [
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
