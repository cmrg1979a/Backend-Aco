import { Request, Response } from "express";
import { postBitacora } from "../interface/bitacora";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const setBitacora = async (req: Request, res: Response) => {
  const dataObj: postBitacora = req.body;
  await pool.query(
    "INSERT INTO House_Bitacora (id_house,id_bitacora,ic,comentario,date,status)values ($1,$2,$3,$4,$5,$6)",
    [
      dataObj.id_house,
      dataObj.id_bitacora,
      dataObj.ic,
      dataObj.comentario,
      dataObj.date,
      dataObj.status == true ? 1 : 0,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
         data: rows,          token: renewTokenMiddleware(req),
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
    "DELETE FROM House_Bitacora WHERE id = $1",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
         data: rows,          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
