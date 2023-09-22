import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getListMarketing = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_list_table_marketing($1,$2, $3, $4, $5);", [
    data.id_branch,
    data.name ? data.name : null,
    data.description ? data.description : null,
    data.position ? data.position : null,
    data.status ? data.status : null,
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

export const insertMarketing = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_insert_table_marketing($1,$2, $3, $4, $5);", [
    data.name,
    data.description,
    data.position,
    data.status,
    data.id_branch,
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

export const readMarketing = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_see_table_markeing($1);", [
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

export const updateMarketing = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_edit_table_marketing($1,$2, $3, $4, $5, $6);", [
    data.id,
    data.name,
    data.description,
    data.position,
    data.id_branch,
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

export const deleteMarketing = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_delete_table_marketing($1);", [
    data.id
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

export const validatePositionMarketing = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_validated_position_table_marketing($1,$2, $3);", [
    data.id ? data.id : 0,
    data.id_branch,
    data.position ? data.position : null
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

export const lastPositionMarketing = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_next_position_table_marketing($1);", [
    data.id_branch
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