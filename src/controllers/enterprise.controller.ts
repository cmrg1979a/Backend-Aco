import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getBracnh = async (req: Request, res: Response) => {
  const conn = await connect();
  const {id_branch } = req.params;
  await conn.query(
    "SELECT * FROM view_branch where id = ?", [id_branch],
    (err, rows) => {
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
