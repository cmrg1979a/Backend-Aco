import { Request, Response } from "express";
import { convertToObject, isConstructorDeclaration } from "typescript";
// import { connect } from "../routes/database";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

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
  const { id_modality, id_shipment, id_incoterms, id_branch } = req.body;
  await pool.query(
    " SELECT * FROM table_itemsservices_listardetails($1,$2,$3,$4)",
    [id_modality, id_shipment, id_incoterms, id_branch],
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
