import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getDocumentsList = async (req: Request, res: Response) => {
  const conn = await connect();
  const {id_pais } = req.body;
  await conn.query(
    "SELECT * FROM view_documentsPais where statusDocuments <> 0 and id_pais = ?", [id_pais],
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
