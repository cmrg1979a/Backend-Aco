import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postBitacora } from "../interface/bitacora";

export const setBitacora = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postBitacora = req.body;

  await conn.query(
    "INSERT INTO House_Bitacora SET ?",
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

export const deleteBitacora = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id } = req.body;
  await conn.query(
    "DELETE FROM House_Bitacora WHERE id = ?",
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
