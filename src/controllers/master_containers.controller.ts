import { Request, Response } from "express";

import { postMasterContainers } from "../interface/master_containers";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const setMasterContainers = async (req: Request, res: Response) => {
  const dataObj: postMasterContainers = req.body;

  await pool.query(
    "INSERT INTO Master_Containers SET $1",
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
