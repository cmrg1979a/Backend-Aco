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

export const getListContainersByBranch = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_listar_containers($1,$2, $3, $4, $5);", [
    data.id_branch,
    data.code ? data.code : null,
    data.name ? data.name : null,
    data.description ? data.description : null,
    data.status ? data.status : null,
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const insertContainers = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query("SELECT *from function_insertar_containers($1,$2, $3, $4, $5, $6, $7, $8, $9);", [
    data.id_branch,
    data.name,
    data.description,
    data.long,
    data.width,
    data.height,
    data.maximumweight,
    data.maximunvolumen,
    data.status,
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const readContainers = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_ver_containers($1);", [
    data.id
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}

export const updateContainers = async (req: Request, res: Response) => {
  let data = req.body;
  
  await pool.query("SELECT *from function_actualizar_containers($1,$2,$3,$4,$5,$6,$7,$8,$9);", [
    data.id,
    data.name,
    data.description,
    data.long,
    data.width,
    data.height,
    data.maximumweight,
    data.maximunvolumen,
    data.status
  ],
  (err, response, fields) => {
    if (!err) {
      let rows = response.rows;
      res.json({
        status: 200,
        estadoflag: rows[0].estadoflag,
        mensaje: rows[0].mensaje,
        data: rows
      })
    } else {
      console.log(err);
    }
  });
}
