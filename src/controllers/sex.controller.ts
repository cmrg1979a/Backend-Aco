import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const getSex = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_SEX_list();",
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
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

export const getListSex = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_list_table_sex($1,$2, $3, $4, $5, $6);", [
    data.id_branch,
    data.code ? data.code : null,
    data.name ? data.name : null,
    data.acronym ? data.acronym : null,
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

export const insertSex = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_insert_table_sex($1,$2, $3, $4, $5);", [
    data.id_branch,
    data.acronym,
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

export const readSex = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_see_table_sex($1);", [
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

export const updateSex = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_edit_table_sex($1,$2, $3, $4, $5, $6);", [
    data.id,
    data.id_branch,
    data.acronym,
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

export const deleteSex = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_delete_table_sex($1);", [
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


export const validateAcronymInTableSex = async (req: Request, res: Response) => {
  let data = req.query;

  const result = await pool.query("SELECT *from function_validates_acronym_in_table_sex($1,$2, $3);", [
    data.id,
    data.acronym,
    data.id_branch,
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
