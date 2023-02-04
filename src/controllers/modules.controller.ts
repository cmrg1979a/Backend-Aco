import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const getModules = async (req: Request, res: Response) => {
  const { branch } = req.params;
  await pool.query(
    "SELECT * FROM ENTERPRISE_MODULES_LISTar($1);",
    [branch],
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

export const getEntitieModules = async (req: Request, res: Response) => {
  const { id_entitie } = req.body;
  // var datanew = new Array();

  await pool.query(
    "SELECT * FROM ENTITIE_MODULES_listarxentitie($1);",
    [id_entitie],
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

export const getMenuModules = async (req: Request, res: Response) => {
  const { id_entitie, id_group } = req.body;
  let id_module = parseInt(req.body.id_module);
  await pool.query(
    "SELECT * FROM ENTITIE_MENU_cargar($1,$2,$3);",
    [id_entitie, id_module, id_group],
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


export const getGroupList = async (req: Request, res: Response) => {
  const { id_entitie, id_module } = req.body;
  await pool.query(
    "SELECT * FROM ENTITIE_MENU_cargar($1,$2,null);",
    [id_entitie, id_module],
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
