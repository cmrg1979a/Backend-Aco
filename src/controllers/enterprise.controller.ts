import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
import { postEnterprise } from "../interface/enterprises";

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
  const data = req.query;

  await pool.query(
    "SELECT *from function_enterprise_listar($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",
    [
      data.id_branch,
      data.document ? data.document : null,
      data.trade_name ? data.trade_name : null,
      data.business_name ? data.business_name : null,
      data.address ? data.address : null,
      data.status ? data.status : null,
      data.id_pais ? data.id_pais : null,
      data.id_state ? data.id_state : null,
      data.id_city ? data.id_city : null,
      data.id_town ? data.id_town : null,
      data.id_document ? data.id_document : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const insertEnterprise = async (req: Request, res: Response) => {
  const dataObj: postEnterprise = req.body;

  await pool.query(
    "SELECT *from function_enterprise_insertar($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);",
    [
      dataObj.id_branch,
      dataObj.id_logo ? dataObj.id_logo : null,
      dataObj.document,
      dataObj.trade_name,
      dataObj.business_name,
      dataObj.slogan,
      dataObj.address,
      dataObj.status,
      dataObj.id_pais,
      dataObj.id_state,
      dataObj.id_city,
      dataObj.id_town,
      dataObj.id_document,
      dataObj.ic,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const readEnterprise = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_enterprise_ver($1);",
    [data.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const updateEnterprise = async (req: Request, res: Response) => {
  const dataObj: postEnterprise = req.body;

  await pool.query(
    "SELECT *from function_enterprise_actualizar($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);",
    [
      dataObj.id,
      dataObj.id_logo ? dataObj.id_logo : null,
      dataObj.document,
      dataObj.trade_name,
      dataObj.business_name,
      dataObj.slogan,
      dataObj.address,
      dataObj.status,
      dataObj.id_pais,
      dataObj.id_state,
      dataObj.id_city,
      dataObj.id_town,
      dataObj.id_document,
      dataObj.ic,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const validateDocumentEnterpriseNuevo = async (
  req: Request,
  res: Response
) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_validar_tipo_documento_y_documento_nuevo_empresa($1,$2, $3);",
    [data.id_branch, data.id_document, data.document],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const validateDocumentEnterpriseEditar = async (
  req: Request,
  res: Response
) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_validar_tipo_documento_y_documento_editar_empresa($1,$2, $3, $4);",
    [data.id, data.id_branch, data.id_document, data.document],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
