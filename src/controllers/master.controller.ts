import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postMaster } from "../interface/master";

export const setMaster = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postMaster = req.body;

  await conn.query(
    "INSERT INTO Table_MasterControl SET ?",
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

export const editMaster = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postMaster = req.body;
  const id = req.params.id;

  await conn.query(
    "UPDATE Table_MasterControl SET ? WHERE id = ?",
    [dataObj, id],
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

export const nullMaster = async (req: Request, res: Response) => {
  const conn = await connect();

  const id = req.params.id;
  const status = req.body.status;

  await conn.query(
    "UPDATE Table_MasterControl SET status = ? WHERE id = ?",
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
      conn.end();
    }
  );
};

export const lockMaster = async (req: Request, res: Response) => {
  const conn = await connect();

  const id = req.params.id;

  await conn.query(
    "UPDATE Table_MasterControl SET statusLock = 1, dateLock = NOW() WHERE id = ?",
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

export const lockMasterAdm = async (req: Request, res: Response) => {
  const conn = await connect();

  const id = req.params.id;

  await conn.query(
    "UPDATE Table_MasterControl SET statusLockAdm = 1, dateLockAdm = NOW() WHERE id = ?",
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

export const getMasterList = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query("SELECT * FROM view_masterList", (err, rows, fields) => {
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
  });
};

export const getMasterId = async (req: Request, res: Response) => {
  const conn = await connect();
  const id = req.params.id;
  await conn.query(
    "SELECT * FROM view_masterList where id = ?",
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
