import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getTypeAccount = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_typeAccount where status <> 0",
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

export const setAccount = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  await conn.query(
    "INSERT INTO Entities_Accounts (id_entities, id_account, id_banks, id_coins, accountNumber, status) values (?,?,?,?,?,?)",
    [
      dataObj.id_entities,
      dataObj.id_account,
      dataObj.id_banks,
      dataObj.id_coins,
      dataObj.accountNumber,
      dataObj.status,
    ],
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

export const getAccountsNumber = async (req: Request, res: Response) => {
  const conn = await connect();

  const id_entities = req.params.id_entities;

  await conn.query(
    "SELECT * FROM view_accountsNumberList where status <> 0 and id_entities = ?",
    [id_entities],
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

export const delAccount = async (req: Request, res: Response) => {
  const conn = await connect();

  const id = req.params.id;

  await conn.query(
    "DELETE FROM Entities_Accounts where id = ?",
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
