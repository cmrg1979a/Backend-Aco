import { Request, Response } from "express";

import { postContainers } from "../interface/containers";
import { conexion } from "../routes/databasePGOp";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getContainers = async (req: Request, res: Response) => {
  let { id_branch } = req.body;
  await pool.query(
    `SELECT * FROM Table_Containers_listar($1);`,
    [id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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
  console.log(dataObj);
  await pool.query(
    "select * from function_housecontainer_insertar($1,$2,$3,$4,$5);",
    [
      dataObj.id_house,
      dataObj.id_containers,
      dataObj.nro_containers,
      dataObj.nro_precinto,
      dataObj.quantity,
    ],
    (err, response, fields) => {
      let rows = response.rows;
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getListContainersByBranch = async (
  req: Request,
  res: Response
) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_containers_listar($1,$2, $3, $4, $5);",
    [
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
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const insertContainers = async (req: Request, res: Response) => {
  const dataObj: postContainers = req.body;

  await pool.query(
    "SELECT *from function_containers_insertar($1,$2, $3, $4, $5, $6, $7, $8, $9);",
    [
      dataObj.id_branch,
      dataObj.name,
      dataObj.description,
      dataObj.long,
      dataObj.width,
      dataObj.height,
      dataObj.maximumweight,
      dataObj.maximunvolumen,
      dataObj.status,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const readContainers = async (req: Request, res: Response) => {
  const data = req.query;

  await pool.query(
    "SELECT *from function_containers_ver($1);",
    [data.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const updateContainers = async (req: Request, res: Response) => {
  const dataObj: postContainers = req.body;

  await pool.query(
    "SELECT *from function_containers_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9);",
    [
      dataObj.id,
      dataObj.name,
      dataObj.description,
      dataObj.long,
      dataObj.width,
      dataObj.height,
      dataObj.maximumweight,
      dataObj.maximunvolumen,
      dataObj.status,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
