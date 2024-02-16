import { Request, response, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
export const getTypeAccount = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM table_type_account_listar($1)",
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const setAccount = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "INSERT INTO Entities_Accounts (id_entities, id_account, id_banks, id_coins, accountNumber, status,id_branch) values ($1,$2,$3,$4,$5,$6,$7)",
    [
      dataObj.id_entities,
      dataObj.id_account,
      dataObj.id_banks,
      dataObj.id_coins,
      dataObj.accountNumber,
      dataObj.status,
      dataObj.id_branch,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows.rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getAccountsNumber = async (req: Request, res: Response) => {
  let id_branch = req.body.id_branch;
  let id_entities = req.params.id_entities;

  await pool.query(
    "SELECT * FROM entities_accounts_list($1,$2)",
    [id_branch, id_entities === "undefined" ? 0 : id_entities],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const delAccount = async (req: Request, res: Response) => {
  const id = req.params.id;

  await pool.query(
    "UPDATE Entities_Accounts SET status = 0  where id = $1",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows.rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
