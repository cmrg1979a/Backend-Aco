import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getPerformances = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_transport } = req.body;
  await conn.query(
    "SELECT * FROM view_listPerfomance",
    null,
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

