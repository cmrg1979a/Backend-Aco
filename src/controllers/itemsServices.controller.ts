import { Request, Response } from "express";
import { convertToObject, isConstructorDeclaration } from "typescript";
// import { connect } from "../routes/database";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { container } from "googleapis/build/src/apis/container";
const { Pool } = pg;
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
export const getItemsServices = async (req: Request, res: Response) => {
  const { id_modality, id_shipment, id_incoterms, id_branch } = req.body;
  await pool.query(
    "SELECT * FROM TABLE_ITEMSSERVICES_listar($1,$2,$3,$4)",
    [id_modality, id_shipment, id_incoterms, id_branch],
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

export const getItemsServicesDetails = async (req: Request, res: Response) => {
  const {
    id_modality,
    id_shipment,
    id_incoterms,
    id_branch,
    services,
    containers,
  } = req.body;

  await pool.query(
    " SELECT * FROM table_itemsservices_listardetails($1,$2,$3,$4,$5,$6)",
    [
      id_modality,
      id_shipment,
      id_incoterms,
      id_branch,
      services.map((item) => {
        return item.id_groupservices;
      }),

      containers.map((item) => {
        return item.id_containers;
      }),
    ],
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

export const getItemsServicesList = async (req: Request, res: Response) => {
  const { id_modality, id_shipment, id_incoterms, id_branch } = req.body;
  await pool.query(
    " SELECT * FROM TABLE_ITEMSSERVICES_listar($1,$2,$3,$4)",
    [id_modality, id_shipment, id_incoterms, id_branch],
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
