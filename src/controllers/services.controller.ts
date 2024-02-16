import { Request, Response } from "express";

import { postServices } from "../interface/services";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const setServices = async (req: Request, res: Response) => {
  const dataObj: postServices = req.body;

  await pool.query(
    "INSERT INTO House_Services (id_house,id_begend,nameservice,price_services,status) values ($1,$2,$3,$4,$5);",
    [
      dataObj.id_house,
      dataObj.id_begend,
      dataObj.nameservice,
      dataObj.price_services,
      dataObj.status,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const deleteServices = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query(
    "DELETE FROM House_Services WHERE id = $1",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const activeServices = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query(
    "UPDATE House_Services set status = 1 WHERE id = $1",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const inactiveServices = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query(
    "UPDATE House_Services set status = 0 WHERE id = $1",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const editServices = async (req: Request, res: Response) => {
  const { id, status } = req.body;
  await pool.query(
    "UPDATE House_Services set status = $1 WHERE id = $2",
    [status, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
