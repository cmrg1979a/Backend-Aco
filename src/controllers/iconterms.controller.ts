import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getIncoterms = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    `SELECT * FROM view_incotermsList where status <> 0
    and id_branch = ${req.body.id_branch ? req.body.id_branch : 'id_branch'}  
    `,
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
