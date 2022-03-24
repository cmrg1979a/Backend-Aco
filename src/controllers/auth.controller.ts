import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postUser } from "../interface/postUser";

import jwt from "jsonwebtoken";

export const singin = async (req: Request, res: Response) => {
  const conn = await connect();
  const { user, password } = req.body;
  await conn.query(
    "SELECT * FROM view_auth where user = ? AND password = MD5(?)",
    [user, password],
    (err, rows, fields) => {
      if (!err) {
        const token: string = jwt.sign(
          { rows },
          process.env.TOKEN_SECRET || "tokentest",
          {
            expiresIn: 60 * 60 * 24,
          }
        );
        if (Object.keys(rows).length > 0) {
          res.json({
            status: 200,
            statusBol: true,
            token: token,
            data: rows,
          });
        } else {
          res.json({
            status: 400,
            statusBol: false,
          });
        }
      } else {
        console.log(err);
      }
      conn.end();
    }
  );
};

export const singup = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postUser = req.body;

  await conn.query(
    "INSERT INTO Table_Users SET ?",
    [dataObj],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
        });
      } else {
        console.log(err);
      }
      conn.end();
    }
  );
};

export const validToken = async (req: Request, res: Response) => {
  try {
    res.json({
      status: 200,
      statusBol: true,
      msg: "Token active",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      statusBol: true,
      msg: "Token inactive",
    });
  }
};
