import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getListMarketing = async (req: Request, res: Response) => {
  console.log("Listando desde el back");
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
          console.log(rows);
          return res.status(200).json(rows);
      } else {
          return res.status(404).json({ error: 'No se encontraron resultados.' });
      }
  } catch (error) {
      console.error('Error al listar los resultados:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
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
        const { status, message } = rows[0];
        return res.status(200).json({ status, message });
      } else {
          return res.status(500).json({ error: 'No se pudo insertar el registro.' });
      }
  } catch (error) {
      console.error('Error al insertar el registro:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
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
          return res.status(500).json({ error: 'No se pudo accede al registro.' });
      }
  } catch (error) {
      console.error('Error al acceder al registro:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
  }
}

export const updateMarketing = async (req: Request, res: Response) => {
  let data = req.body;

  const result = await pool.query("SELECT *from function_edit_table_marketing($1,$2, $3, $4, $5);", [
    data.id,
    data.name,
    data.description,
    data.position,
    data.status
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        const { status, message } = rows[0];
        return res.status(200).json({ status, message });
      } else {
          return res.status(500).json({ error: 'No se pudo actualizar el registro.' });
      }
  } catch (error) {
      console.error('Error al actualizar el registro:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
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
        const { status, message } = rows[0];
        return res.status(200).json({ status, message });
      } else {
          return res.status(500).json({ error: 'No se pudo eliminar el registro.' });
      }
  } catch (error) {
      console.error('Error al eliminar el registro:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
  }
}

export const validatePositionMarketing = async (req: Request, res: Response) => {
  const result = await pool.query("SELECT *from function_validates_type_document_and_document_in_enterprise($1,$2);", [
    req.query.id_document,
    req.query.document,
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        console.log(rows);
          const { status, message } = rows[0];
          return res.status(200).json({ status, message });
      } else {
          return res.status(404).json({ error: 'No se respuesta.' });
      }
  } catch (error) {
      console.error('Error al listar las regiones:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
  }
}
