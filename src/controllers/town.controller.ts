import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getTown = async (req: Request, res: Response) => {
  const conn = await connect();
  const { idCity } = req.body;
  await conn.query(
    "SELECT * FROM view_townList where id_city = ? and status <> 0",
    [idCity],
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
