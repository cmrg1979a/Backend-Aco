import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postServices } from "../interface/services";

export const setServices = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postServices = req.body;

  await conn.query(
    "INSERT INTO House_Services SET ?",
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
    }
  );
};

export const deleteServices = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id } = req.body;
  await conn.query(
    "DELETE FROM House_Services WHERE id = ?",
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
    }
  );
};

export const activeServices = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id } = req.body;
  await conn.query(
    "UPDATE House_Services set status = 1 WHERE id = ?",
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
    }
  );
};

export const inactiveServices = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id } = req.body;
  await conn.query(
    "UPDATE House_Services set status = 0 WHERE id = ?",
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
    }
  );
};

export const editServices = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id, status } = req.body;
  await conn.query(
    "UPDATE House_Services set status = ? WHERE id = ?",
    [status, id],
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
