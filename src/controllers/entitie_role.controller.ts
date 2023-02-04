import { Request, Response } from "express";

import { postRoleEntities } from "../interface/postRoleEntitie";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;

const pool = conexion();

export const addEntitieRole = async (req: Request, res: Response) => {
  const dataObj: postRoleEntities = req.body;
  let id_role = parseInt(req.body.id_role);

  await pool.query(
    "INSERT INTO Entities_Role (id_entities,id_role,status) values ($1,$2,$3)",
    [dataObj.id_entities, id_role, 1],
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
