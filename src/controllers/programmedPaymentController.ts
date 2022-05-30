import { Request, Response } from "express";
import { connect } from "../routes/database";

import { programmedPaymentInterface } from "interface/programmedPaymentInterface";

export const setProgrammedPayment = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: programmedPaymentInterface = req.body;
  console.log(dataObj);

  await conn.query(
    "INSERT INTO programmed_payment SET ?",
    [dataObj],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
        conn.end();
      } else {
        console.log(err);
        conn.end();
      }
    }
  );
};

export const ListProgrammedPayment = async (req: Request, res: Response) => {
  const conn = await connect();
  await conn.query(
    "SELECT * FROM view_programmed_payment",
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
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};
export const updateProgrammedPayment = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "UPDATE programmed_payment SET status = 0 where id = ?",
    [req.params.id],
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
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};
