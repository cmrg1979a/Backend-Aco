import { Request, Response } from "express";

import { postMasterContainers } from "../interface/master_containers";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const pool = conexion();

export const setMasterContainers = async (req: Request, res: Response) => {
  /*const dataObj: postMasterContainers = req.body;

  await pool.query(
    "INSERT INTO Master_Containers(id_master,id_containers,nro_containers,nro_precinto,quantity,status) VALUES($1,$2,$3,$4,$5,$6)",
    [
      dataObj.id_master,
      dataObj.id_containers,
      dataObj.nro_containers,
      dataObj.nro_precinto,
      dataObj.quantity,
      dataObj.status,
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
  );*/
};
