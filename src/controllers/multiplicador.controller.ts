import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const getMultiplicador = async (req: Request, res: Response) => {
  const { id_shipment, containers, id_branch } = req.body;
  let code7;
  let code8;
  let code9;
  let code10;
  // console.log(containers);
  code7 = 7;
  code8 = 8;
  code9 = 9;
  code10 = 10;

  if (containers) {
    containers.map((item: any) => {
      if (item.id_containers == 1) {
        code7 = null;
      }
      if (item.id_containers == 2) {
        code10 = null;
      }
      if (item.id_containers == 3) {
        code9 = null;
      }
      if (item.id_containers == 4) {
        code8 = null;
      }
    });
  }

  await pool.query(
    "SELECT * FROM TABLE_MULTIPLICADOR_listar($1,$2,$3,$4,$5,$6)",
    [id_branch, id_shipment, code7, code10, code9, code8],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getListMultiplicador = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_multiplicador_listar($1,$2, $3, $4, $5, $6);", [
    data.id_branch,
    data.code ? data.code : null,
    data.name ? data.name : null,
    data.description ? data.description : null,
    data.id_shipment ? data.id_shipment : null,
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

export const readMultiplicador = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_multiplicador_ver($1);", [
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

export const updateMultiplicador = async (req: Request, res: Response) => {
  let data = req.body;
  
  await pool.query("SELECT *from function_multiplicador_actualizar($1,$2,$3,$4,$5, $6);", [
    data.id,
    data.name,
    data.description,
    data.id_shipment,
    data.valor,
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

export const getCargarShipment = async (req: Request, res: Response) => {
  let data = req.query;
  await pool.query("SELECT *from function_shipment_cargar($1);", [
    data.id_branch
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
