import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postRoleEntities } from "../interface/postRoleEntitie";

export const addEntitieRole = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postRoleEntities = req.body;

  await conn.query(
    "INSERT INTO Entities_Role SET ?",
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
