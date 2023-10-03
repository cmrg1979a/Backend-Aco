import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getDocumentsList = async (req: Request, res: Response) => {
  const { id_pais } = req.body;
  await pool.query(
    "SELECT * FROM Pais_Document_documento($1)",
    [id_pais],
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

export const getListDocumentsByBranch = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_list_table_documents($1,$2, $3, $4, $5);", [
    data.code ? data.code : null,
    data.name ? data.name : null,
    data.description ? data.description : null,
    data.status ? data.status : null,
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

export const insertDocuments = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_insert_table_documents($1,$2, $3, $4);", [
    data.name,
    data.description,
    data.status,
    data.id_branch
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

export const readDocuments = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_see_table_documents($1);", [
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

export const updateDocuments = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_edit_table_documents($1,$2, $3, $4);", [
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

export const swicthDocuments = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_switch_table_documents($1, $2);", [
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