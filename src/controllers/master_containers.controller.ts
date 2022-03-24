import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postMasterContainers } from "../interface/master_containers";

export const setMasterContainers = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postMasterContainers = req.body;

  await conn.query(
    "INSERT INTO Master_Containers SET ?",
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
      conn.end();
    }
  );
};
