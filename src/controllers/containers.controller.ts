import { Request, Response } from "express";

import { postContainers } from "../interface/containers";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getContainers = async (req: Request, res: Response) => {
  await pool.query(
    `SELECT * FROM Table_Containers_listar();`,
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

export const setHouseContainers = async (req: Request, res: Response) => {
  const dataObj: postContainers = req.body;
  await pool.query(
    "INSERT INTO House_Containers SET $1",
    [dataObj],
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

export const deleteContainers = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query(
    "DELETE FROM House_Containers WHERE id = $1",
    [id],
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
