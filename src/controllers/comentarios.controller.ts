import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getComentariosPredefinidos = async (req: Request, res: Response) => {
  const { id_branch } = req.query;

  await pool.query(
    `SELECT * FROM table_op_comentarios_tracking_listar($1);`,
    [id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
            token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getListComentariosPredefinidos = async (req: Request, res: Response) => {
  const dataObj = req.query;

  await pool.query(
    `SELECT * FROM table_comentarios_predefinidos_listar($1,$2,$3,$4);`,
    [
      dataObj.id_branch,
      dataObj.code ? dataObj.code : null,
      dataObj.comentario ? dataObj.comentario : null,
      dataObj.status ? dataObj.status : null  
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
            token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getMaxCodeListComentariosPredefinidos = async (req: Request, res: Response) => {
  const dataObj = req.query;

  await pool.query(
    `SELECT * FROM table_comentarios_predefinidos_consultar_maxcode($1);`,
    [
      dataObj.id_branch
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
            token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const insertComentarioPredefinido = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    `SELECT * FROM function_comentario_predefinido_insertar($1,$2,$3,$4);`,
    [
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.code ? dataObj.code : null,
      dataObj.comentario ? dataObj.comentario : null,
      dataObj.status ? 1 : 0
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
            token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const updateComentarioPredefinido = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    `SELECT * FROM function_comentario_predefinido_actualizar($1,$2,$3,$4,$5);`,
    [
      dataObj.id,
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.code ? dataObj.code : null,
      dataObj.comentario ? dataObj.comentario : null,
      dataObj.status ? 1 : 0
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
            token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const deleteComentarioPredefinido = async (req: Request, res: Response) => {
  const { id } = req.body;

  await pool.query(
    `SELECT * FROM function_comentario_predefinido_eliminar($1);`,
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
            token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};