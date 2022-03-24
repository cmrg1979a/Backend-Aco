import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getCity = async (req: Request, res: Response) => {
  const conn = await connect();
  const { idState } = req.body;
  await conn.query(
    "SELECT * FROM view_cityList where id_state = ? and status <> 0",
    [idState],
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

export const getCityPricing = async (req: Request, res: Response) => {
  const conn = await connect();
  const { idState } = req.body;
  await conn.query(
    "SELECT * FROM view_cityList where id_state = ? and status <> 0 and code = 3128",
    [idState],
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
