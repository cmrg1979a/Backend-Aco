import { Request, Response } from "express";

import { connect } from "../routes/database";

import axios from "axios";

export const getFile = async (req: Request, res: Response) => {};
//Preuba
export const setFile = async (req: Request, res: Response) => {
  const conn = await connect();
  const { names, email, phone, pais } = req.body;
  console.log(req.file);
  await conn.query(
    "INSERT INTO Table_FilesPayments (names, email, phone, pathFile, pais, status) values(?,?,?,?,?,?)",
    [names, email, phone, req.file?.path, pais, 1],
    (err, rows, fields) => {
      if (!err) {
        var data = JSON.stringify({
          Data: {
            Email: email,
            FirstName: names,
            LastName: "",
            EmailPerm: "1",
          },
        });

        axios({
          method: "post",
          url: "https://clientapi.benchmarkemail.com/Contact/18760272/ContactDetails",
          headers: {
            AuthToken: "BBDD0A35-E47F-4025-958A-F21CE56CFEFC",
            "Content-Type": "application/json",
          },
          data: data,
        })
          .then(function () {
            res.json({
              status: 200,
              statusBol: true,
              msg: "Depósito cargado con éxito",
            });
          })
          .catch(function (error) {
            res.json({
              status: 200,
              statusBol: true,
              msg: error,
            });
          });
      } else {
        console.log(err);
      }
    }
  );
};
