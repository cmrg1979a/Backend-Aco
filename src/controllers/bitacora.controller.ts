import { Request, Response } from "express";
import { postBitacora } from "../interface/bitacora";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const setBitacora = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "SELECT * FROM house_bitacora_insertar($1,$2,$3,$4,$5,$6)",
    [
      dataObj.id_house ? dataObj.id_house : null,
      dataObj.id_bitacora ? dataObj.id_bitacora : null,
      dataObj.id_comentario ? dataObj.id_comentario : null,
      dataObj.comentario ? dataObj.comentario : null,
      dataObj.fecha ? dataObj.fecha : null,
      dataObj.visible_cliente ? 1 : 0,
    ],
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

export const deleteBitacora = async (req: Request, res: Response) => {
  const { id } = req.body;

  await pool.query(
    "SELECT * FROM house_bitacora_eliminar($1)",
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
export const changeStatusBitacora = async (req: Request, res: Response) => {
  const { id, status } = req.body;

  await pool.query(
    "SELECT * FROM house_bitacora_cambiarstatus($1,$2)",
    [ 
      id, 
      status ? 1 : 0
    ],
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
