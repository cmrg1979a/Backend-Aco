import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getNroMaster = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query("SELECT * FROM view_nroMaster", (err, rows, fields) => {
    if (!err) {
      res.json({
        status: 200,
        statusBol: true,
        data: rows,
      });
    } else {
      console.log(err);
    }
  });
};
