import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getChargeYear = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query("SELECT * FROM view_chargeYear;", (err, rows, fields) => {
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
  });
};