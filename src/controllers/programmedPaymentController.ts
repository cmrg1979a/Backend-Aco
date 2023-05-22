import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

import { programmedPaymentInterface } from "interface/programmedPaymentInterface";

// export const setProgrammedPayment = async (req: Request, res: Response) => {
//   const dataObj: programmedPaymentInterface = req.body;
//   console.log(dataObj);
//   await pool.query(
//     "select * from programmed_payment_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9)",
//     [
//       dataObj.fecha,
//       dataObj.STATUS ? 1 : 0,
//       dataObj.nuevoflag,
//       dataObj.id,
//       dataObj.id_detailspayinvoicecxp,
//       dataObj.id_controlgastosegresos,
//       dataObj.controlgastoegreso ? 1 : 0,
//       dataObj.id_master ? dataObj.id_master : null,
//       dataObj.id_proveedor ? dataObj.id_proveedor : null,
//     ],
//     (err, response, fields) => {
//       if (!err) {
//         let rows = response.rows;
//         if (!!rows[0].estadoflag) {
//           res.json({
//             status: 200,
//             statusBol: true,
//             data: rows,
//           });
//         } else {
//           res.json({
//             status: 200,
//             statusBol: true,
//             mensaje: rows[0].mensaje,
//           });
//         }
//       } else {
//         console.log(err);
//       }
//     }
//   );
// };
export const setProgrammedPayment = async (req: Request, res: Response) => {
  const dataObj = req.body;

  console.log(dataObj);
  await pool.query(
    "select * from function_registrar_programacion($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      dataObj.id, // bigint,
      dataObj.tipo,
      dataObj.fecha, // date,
      dataObj.details.map((element) => {
        return element.id_proveedor ? element.id_proveedor : null;
      }), // int[],
      dataObj.details.map((element) => {
        return element.id_master ? element.id_master : null;
      }), // int[],
      dataObj.details.map((element) => {
        return element.id_correlativo ? element.id_correlativo : null;
      }), // int[],
      dataObj.details.map((element) => {
        return element.id ? element.id : null;
      }), // bigint[]
      dataObj.details.map((element) => {
        return element.controlgastoegreso;
      }), // bigint[]
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
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
            mensaje: rows[0].mensaje,
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

export const CargarProgramacion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_cargarprogramacion($1)",
    [req.query.id_branch],
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

export const PagosProgramadosPorProveedor = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM programmed_payment_x_proveedor($1,$2,$3)",
    [req.query.id_branch, req.query.id_proveedor, req.query.id_programend],
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

export const RegistrarPagosProgramados = async (
  req: Request,
  res: Response
) => {
  let dataObj = req.body;
  let details = req.body.details;
  console.log(details);
  await pool.query(
    "SELECT * FROM function_registrar_pagoprogramado($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      dataObj.id_path, // int,
      dataObj.id_cuentas, // int,
      dataObj.fecha, // date,
      dataObj.nro_operacion, // varchar,
      dataObj.tipocambio, // numeric,
      dataObj.id_coins, // int,
      details.map((element) => {
        return element.id;
      }), // int[],
      details.map((element) => {
        return element.monto;
      }), // numeric[],
      details.map((element) => {
        return element.monto_mon_ext;
      }), // numeric[]
      dataObj.comentarios,
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

export const eliminarProgramacion = async (req: Request, res: Response) => {
  console.log(req);
  await pool.query(
    "SELECT * FROM function_eliminarprogramacion($1)",
    [req.body.id_details],
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
export const eliminarProgramacionDetalle = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);
  await pool.query(
    "SELECT * FROM eliminar_programacion_detalle($1)",
    [req.body.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estadoflag: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
