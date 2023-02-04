import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { postHouse } from "../interface/house";
import { postHouseEdit } from "../interface/house";


export const setHouse = async (req: Request, res: Response) => {
  const dataObj: postHouse = req.body;

  await pool.query(
    "INSERT INTO Table_HouseControl (id_master,nro_house,code_house,id_cot,id_agent,id_consigner,id_notify,id_aerolinea,id_coloader,id_naviera,id_incoterms,nro_hbl,id_motonave,nro_viaje,bultos,peso,volumen,id_conditions,id_moneda,monto,status,id_branch) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)",
    [
      dataObj.id_master,
      dataObj.nro_house,
      dataObj.code_house,
      dataObj.id_cot,
      dataObj.id_agent,
      dataObj.id_consigner,
      dataObj.id_notify,
      dataObj.id_aerolinea,
      dataObj.id_coloader,
      dataObj.id_naviera,
      dataObj.id_incoterms,
      dataObj.nro_hbl,
      dataObj.id_motonave,
      dataObj.nro_viaje,
      dataObj.bultos,
      dataObj.peso,
      dataObj.volumen,
      dataObj.id_conditions,
      dataObj.id_moneda,
      dataObj.monto,
      dataObj.status,
      dataObj.id_branch,
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
    }
  );
};

export const getHouseList = async (req: Request, res: Response) => {
  const { id_master } = req.body;
  const { id_branch } = req.body;

  await pool.query(
    "SELECT * FROM TABLE_HOUSECONTROL_listar($1,$2);",
    [id_branch, id_master],
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
            data: [],
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getHouseListAll = async (req: Request, res: Response) => {
  const { id_branch } = req.body;

  await pool.query(
    "SELECT * FROM Table_HouseControl_listarall($1,null);",
    [id_branch],
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

export const getHouseListId = async (req: Request, res: Response) => {
  const { id } = req.body;
  const { id_branch } = req.body;

  await pool.query(
    "SELECT * FROM Table_HouseControl_listarall($1,$2)",
    [id_branch, id],
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

export const getHouseServices = async (req: Request, res: Response) => {
  const { id } = req.body;

  await pool.query(
    "SELECT * FROM HOUSE_SERVICES_LISTArxhouse($1) ",
    [id],
    // [req.body.id_branch],
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

export const getHouseBitacora = async (req: Request, res: Response) => {
  const { id } = req.body;

  await pool.query(
    "SELECT * FROM HOUSE_BITACORA_listarxhouse($1);",
    [id],
    // [req.body.id_branch],
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

export const getHouseContainers = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query(
    " select * from HOUSE_CONTAINERS_listarxhouse($1)",
    [id],
    // [req.body.id_branch],
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

export const setHouseEdit = async (req: Request, res: Response) => {
  const dataObj: postHouseEdit = req.body;
  const id = req.params.id;

  await pool.query(
    "UPDATE Table_HouseControl SET id_agent=$1, id_consigner=$2, id_notify=$3, id_aerolinea=$4, id_coloader=$5, id_naviera=$6, id_incoterms=$7, nro_hbl=$8,id_motonave=$9, nro_viaje=$10, bultos=$11, peso=$12, volumen=$13, id_conditions=$14, id_moneda=$15, monto=$16, status=$17, id_branch=$18 WHERE id = $19",
    [
      dataObj.id_agent,
      dataObj.id_consigner,
      dataObj.id_notify,
      dataObj.id_aerolinea,
      dataObj.id_coloader,
      dataObj.id_naviera,
      dataObj.id_incoterms,
      dataObj.nro_hbl,
      dataObj.id_motonave,
      dataObj.nro_viaje,
      dataObj.bultos,
      dataObj.peso,
      dataObj.volumen,
      dataObj.id_conditions,
      dataObj.id_moneda,
      dataObj.monto,
      dataObj.status,
      dataObj.id_branch,
      id,
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
    }
  );
};
export const setHouseDelete = async (req: Request, res: Response) => {
  // const dataObj: postHouseEdit = req.body;
  const id = req.params.id;

  await pool.query(
    "UPDATE Table_HouseControl SET status = 0  WHERE id = $1",
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
    }
  );
};
