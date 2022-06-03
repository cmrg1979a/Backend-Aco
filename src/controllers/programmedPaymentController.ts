import { Request, Response } from "express";
import { connect } from "../routes/database";

import { programmedPaymentInterface } from "interface/programmedPaymentInterface";

export const setProgrammedPayment = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: programmedPaymentInterface = req.body;

  if (dataObj.nuevoflag == true) {
    await conn.query(
      `INSERT INTO programmed_payment 
      (fecha,status)
      values
      (?,?)`,
      [dataObj.fecha, dataObj.STATUS],

      (err, rows, fields) => {
        if (!err) {
          let datanew = JSON.parse(JSON.stringify(rows));
          new Promise<void>((resolver, rechazar) => {
            conn.query(
              `INSERT INTO details_programendpaymet
            (id_programendpaymed,id_detailspayinvoicecxp,id_controlgastosegresos,controlgastoegreso,STATUS)
            values 
            (?,?,?,?,?)
            `,
              [
                datanew.insertId,
                dataObj.id_detailspayinvoicecxp,
                dataObj.id_controlgastosegresos,
                dataObj.controlgastoegreso,
                dataObj.STATUS,
              ],
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
            resolver();
          });
        } else {
          console.log(err);
          conn.end();
        }
      }
    );
  } else {
    await conn.query(
      `INSERT INTO details_programendpaymet
    (id_programendpaymed,id_detailspayinvoicecxp,id_controlgastosegresos,controlgastoegreso,STATUS)
    values 
    (?,?,?,?,?)
    `,
      [
        dataObj.id,
        dataObj.id_detailspayinvoicecxp,
        dataObj.id_controlgastosegresos,
        dataObj.controlgastoegreso,
        dataObj.STATUS,
      ],
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
  }
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
    "UPDATE details_programendpaymet SET status = 0 where id = ?",
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

export const ListProgrammedPaymentDetails = async (
  req: Request,
  res: Response
) => {
  const conn = await connect();

  await conn.query(
    "SELECT distinct * FROM view_programmed_payment",
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let details;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              "select distinct * from  view_details_programendpaymet WHERE id_programendpaymed= ?",
              [item.id],
              (err, rowss, fields) => {
                details = JSON.parse(JSON.stringify(rowss));
                let dataTes = [];
                let dataPre = [];
                dataTes.push(details);
                dataPre.push({
                  id: item.id,
                  correlativo: item.correlativo,
                  fecha: item.fecha,
                  details: dataTes[0],
                });

                req.app.locals.itemsService.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsService = [];
          resolver();
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsService,
            });
            conn.end();
          }, 5000);
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const deleteProgrammedPayment = async (req: Request, res: Response) => {
  const conn = await connect();
  console.log(req.body.id);

  await conn.query(
    "UPDATE details_programendpaymet SET elimado = 1 where id = ?",
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
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};
