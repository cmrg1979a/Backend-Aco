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
  let data = req.query
  const result = await pool.query("SELECT *from function_list_enterprise($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11);", [
    data.id_branch,
    data.document ? data.document : null,
    data.trade_name ? data.trade_name : null,
    data.business_name ? data.business_name : null,
    data.address ? data.address : null,
    data.status,
    data.id_pais ? data.id_pais : null,
    data.id_state ? data.id_state : null,
    data.id_city ? data.id_city : null,
    data.id_town ? data.id_town : null,
    data.id_document ? data.id_document : null,
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
  const result = await pool.query("SELECT *from function_insert_enterprise($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);", [
    data.id_branch,
    data.id_logo ? data.id_logo : null,
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

  const result = await pool.query("SELECT *from function_edit_enterprise($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);", [
    data.id,
    data.id_logo,
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

export const switchEnterprise = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_switch_enterprise($1, $2);", [
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
      console.log('Error al listar las empresas:', error);
  }
}

export const validateDocumentEnterprise = async (req: Request, res: Response) => {
  let data = req.query;

  const result = await pool.query("SELECT *from function_validates_type_document_and_document_in_enterprise($1,$2, $3, $4);", [
    data.id ? data.id : 0,
    data.id_branch,
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
