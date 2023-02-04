import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getModuleRole = async (req: Request, res: Response) => {
  const { id_module } = req.body;
  const { id_branch } = req.body;
  await pool.query(
    `SELECT * FROM role_listar($1,$2);`,
    [id_branch, id_module],
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

export const getRole = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM Table_Role_LISTAR()",
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

export const editRole = async (req: Request, res: Response) => {
  const { id_entities } = req.params;
  const { id_role } = req.body;
  await pool.query(
    "UPDATE Entities_Role set id_role = $1 where id_entities = $2",
    [id_role, id_entities],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
