import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { ModelAirlines } from "interface/airlines";
const { Pool } = pg;
const pool = conexion();

export const ListarAirlines = async (req: Request, res: Response) => {
  const modelAirlines: ModelAirlines = req.query;
  await pool.query(
    "SELECT * FROM function_airlines_listar($1,$2,$3,$4,$5,$6,$7)",
    [
      modelAirlines.id_branch,
      modelAirlines.code,
      modelAirlines.code_iata,
      modelAirlines.code_icao,
      modelAirlines.name,
      modelAirlines.status,
      modelAirlines.id_pais,
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

// export const getAilrines = async (req: Request, res: Response) => {
//   await pool.query(
//     "SELECT * FROM Table_Airlines_listar()",
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
