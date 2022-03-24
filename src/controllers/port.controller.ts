import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getPortBegin = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_transport } = req.body;
  await conn.query(
    "SELECT * FROM view_portList where status <> 0 and id_begend = 1 and id_transport = ?",
    [id_transport],
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

export const getPortEnd = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_transport } = req.body;
  await conn.query(
    "SELECT * FROM view_portList where status <> 0 and id_begend = 2 and id_transport = ?",
    [id_transport],
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
