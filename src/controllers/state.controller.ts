import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getState = async (req: Request, res: Response) => {
  const conn = await connect();
  const { idPais } = req.body;
  await conn.query(
    "SELECT * FROM view_stateList where id_pais = ? and status <> 0",
    [idPais],
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

export const getStatePricing = async (req: Request, res: Response) => {
  const conn = await connect();
  const { idPais } = req.body;
  await conn.query(
    "SELECT * FROM view_stateList where id_pais = ? and status <> 0 and code = 2015",
    [idPais],
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
