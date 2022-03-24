import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getFilesQuote = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id_quote } = req.params;

  await conn.query(
    "SELECT * FROM view_pathQuote where status <> 0 and id_quote = ?",
    [id_quote],
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
