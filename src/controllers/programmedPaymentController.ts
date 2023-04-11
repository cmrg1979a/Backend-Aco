import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

import { programmedPaymentInterface } from "interface/programmedPaymentInterface";

export const setProgrammedPayment = async (req: Request, res: Response) => {
  const dataObj: programmedPaymentInterface = req.body;
  console.log(dataObj);
  await pool.query(
    "select * from programmed_payment_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      dataObj.fecha,
      dataObj.STATUS ? 1 : 0,
      dataObj.nuevoflag,
      dataObj.id,
      dataObj.id_detailspayinvoicecxp,
      dataObj.id_controlgastosegresos,
      dataObj.controlgastoegreso ? 1 : 0,
      dataObj.id_master ? dataObj.id_master : null,
      dataObj.id_proveedor ? dataObj.id_proveedor : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
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

export const ListProgrammedPayment = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM programmed_payment_listar($1);",
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
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

export const updateProgrammedPayment = async (req: Request, res: Response) => {
  await pool.query(
    "UPDATE details_programendpaymet SET status = $1 where id = $2",
    [0, req.params.id],
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

export const ListProgrammedPaymentDetails = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM programmed_payment_listar($1)",
    [req.params.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
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

export const deleteProgrammedPayment = async (req: Request, res: Response) => {
  await pool.query(
    "UPDATE details_programendpaymet SET elimado = 1 where id = $1",
    [req.body.id],
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
