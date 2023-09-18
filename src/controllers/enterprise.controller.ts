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
  const result = await pool.query("SELECT *from function_list_enterprise($1,$2, $3, $4, $5, $6, $7, $8, $9, $10);", [
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
          return res.status(404).json({ error: 'No se encontraron empresas.' });
      }
  } catch (error) {
      console.error('Error al listar las regiones:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
  }
}


export const insertEnterprise = async (req: Request, res: Response) => {
  let data = req.body;
  const result = await pool.query("SELECT *from function_insert_enterprise($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);", [
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
    data.ic,
    data.id_branch,
  ]);

  const { rows } = result;

  try {
      if (rows.length > 0) {
        const { status, message } = rows[0];
        return res.status(200).json({ status, message });
      } else {
          return res.status(500).json({ error: 'No se pudo insertar la empresa.' });
      }
  } catch (error) {
      console.error('Error al listar las regiones:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
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
          return res.status(500).json({ error: 'No se pudo accede a la empresa.' });
      }
  } catch (error) {
      console.error('Error al listar las empresas:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
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
        const { status, message } = rows[0];
        return res.status(200).json({ status, message });
      } else {
          return res.status(500).json({ error: 'No se pudo accede a la empresa.' });
      }
  } catch (error) {
      console.error('Error al listar las empresas:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
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
        const { status, message } = rows[0];
        return res.status(200).json({ status, message });
      } else {
          return res.status(500).json({ error: 'No se pudo accede a la empresa.' });
      }
  } catch (error) {
      console.error('Error al listar las empresas:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });    
  }
}

export const validateDocumentEnterprise = async (req: Request, res: Response) => {
  console.log("Desde el back...");

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
