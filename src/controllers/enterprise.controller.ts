import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();
export const getBracnh = async (req: Request, res: Response) => {
  const { id_branch } = req.params;
  await pool.query(
    "select * from Table_Branch_ver($1);",
    [id_branch],
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

export const getListEnterprise = async (req: Request, res: Response) => {
  const result = await pool.query("SELECT *from function_list_enterprise($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11);", [
    req.query.id_branch,
    req.query.document ? req.query.document : null,
    req.query.trade_name ? req.query.trade_name : null,
    req.query.business_name ? req.query.business_name : null,
    req.query.address ? req.query.address : null,
    req.query.status ? req.query.status : null,
    req.query.id_pais ? req.query.id_pais : null,
    req.query.id_state ? req.query.id_state : null,
    req.query.id_city ? req.query.id_city : null,
    req.query.id_town ? req.query.id_town : null,
    req.query.id_document ? req.query.id_document : null,
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        console.log("No se encontraron resultados");
      }
  } catch (error) {
      console.log('Error al listar los registros:', error);
  }
}


export const insertEnterprise = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_insert_enterprise($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);", [
    data.id_branch,
    data.document,
    data.trade_name,
    data.business_name,
    data.slogan,
    data.address,
    data.status,
    data.id_pais,
    data.id_state,
    data.id_city,
    data.id_town,
    data.id_document,
    data.ic
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        console.log('No se pudo insertar el registro.');
      }
  } catch (error) {
      console.log('Error al listar las regiones:', error);
  }
}

export const readEnterprise = async (req: Request, res: Response) => {
  let data = req.query;
  const result = await pool.query("SELECT *from function_see_enterprise($1);", [
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
      console.log('Error al listar las empresas:', error);
  }
}

export const updateEnterprise = async (req: Request, res: Response) => {
  let data = req.body;

  const result = await pool.query("SELECT *from function_edit_enterprise($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);", [
    data.id,
    data.document,
    data.trade_name,
    data.business_name,
    data.slogan,
    data.address,
    data.status,
    data.id_pais,
    data.id_state,
    data.id_city,
    data.id_town,
    data.id_document,
    data.ic
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        console.log("No se pudo actualizar el registro");
      }
  } catch (error) {
      console.log('Error al listar las empresas:', error);
  }
}

export const deleteEnterprise = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_delete_enterprise($1);", [
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
      console.log('Error al listar las empresas:', error);
  }
}

export const validateDocumentEnterprise = async (req: Request, res: Response) => {
  let data = req.query;

  const result = await pool.query("SELECT *from function_validates_type_document_and_document_in_enterprise($1,$2, $3);", [
    data.id ? data.id : 0,
    data.id_document,
    data.document,
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
