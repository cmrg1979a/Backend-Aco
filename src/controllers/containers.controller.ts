import { Request, Response } from "express";
import { connect } from "../routes/database";
import { postContainers } from "../interface/containers";

export const getContainers = async (req: Request, res: Response) => {
  const conn = await connect();
  await conn.query(
    `SELECT * FROM view_containersList where status <> 0  `,
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

export const setHouseContainers = async (req: Request, res: Response) => {
  const conn = await connect();
  const dataObj: postContainers = req.body;
  await conn.query(
    "INSERT INTO House_Containers SET ?",
    [dataObj],
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

export const deleteContainers = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id } = req.body;
  await conn.query(
    "DELETE FROM House_Containers WHERE id = ?",
    [id],
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
