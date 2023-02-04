import { Request, Response } from "express";

import { postMaster } from "../interface/master";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { civicinfo } from "googleapis/build/src/apis/civicinfo";
const { Pool } = pg;

const pool = conexion();

export const setMaster = async (req: Request, res: Response) => {
  const dataObj: postMaster = req.body;
  console.log(dataObj)
  await pool.query(
    "SELECT * FROM Table_MasterControl_insertar($1,$2, $3,$4, $5,$6, $7,$8, $9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31)",
    [
      dataObj.nro_master ,
      dataObj.code_master ,
      dataObj.id_cot ,
      dataObj.id_modality ,
      dataObj.id_shipment ,
      dataObj.id_incoterms ,
      dataObj.id_port_begin ,
      dataObj.id_port_end ,
      dataObj.id_operador ,
      dataObj.fecha_eta ,
      dataObj.fecha_etd ,
      dataObj.fecha_disponibilidad ,
      dataObj.ganancia_pricing ,
      dataObj.ganancia_operaciones ,
      dataObj.id_agent ,
      dataObj.id_consigner ,
      dataObj.id_notify ,
      dataObj.id_aerolinea ,
      dataObj.id_coloader ,
      dataObj.id_naviera ,
      dataObj.nro_mbl ,
      dataObj.id_motonave ,
      dataObj.nro_viaje ,
      dataObj.bultos ,
      dataObj.peso ,
      dataObj.volumen ,
      dataObj.id_conditions ,
      dataObj.id_moneda ,
      dataObj.monto ,
      dataObj.status ,
      dataObj.id_branch ,
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

export const editMaster = async (req: Request, res: Response) => {
  const dataObj: postMaster = req.body;
  const id = req.params.id;
  await pool.query(
    "UPDATE Table_MasterControl SET id_branch=$1,nro_master=$2,code_master=$3,id_cot=$4,id_modality=$5,id_shipment=$6,id_incoterms=$7,id_port_begin=$8,id_port_end=$9,id_operador=$10,fecha_etd=$11,fecha_eta=$12,fecha_disponibilidad=$13,ganancia_pricing=$14,ganancia_operaciones=$15,id_agent=$16,id_consigner=$17,id_notify=$18,id_aerolinea=$19,id_coloader=$20,id_naviera=$21,nro_mbl=$22,id_motonave=$23,nro_viaje=$24,bultos=$25,peso=$26,volumen=$27,id_conditions=$28,id_moneda=$29,monto=$30,statuslock=$31,statuslockadm=$32,status=$33 WHERE id = $34",
    [
      dataObj.id_branch,
      dataObj.nro_master,
      dataObj.code_master,
      dataObj.id_cot,
      dataObj.id_modality,
      dataObj.id_shipment,
      dataObj.id_incoterms,
      dataObj.id_port_begin,
      dataObj.id_port_end,
      dataObj.id_operador,
      dataObj.fecha_etd,
      dataObj.fecha_eta,
      dataObj.fecha_disponibilidad,
      dataObj.ganancia_pricing,
      dataObj.ganancia_operaciones,
      dataObj.id_agent,
      dataObj.id_consigner,
      dataObj.id_notify,
      dataObj.id_aerolinea,
      dataObj.id_coloader,
      dataObj.id_naviera,
      dataObj.nro_mbl,
      dataObj.id_motonave,
      dataObj.nro_viaje,
      dataObj.bultos,
      dataObj.peso,
      dataObj.volumen,
      dataObj.id_conditions,
      dataObj.id_moneda,
      dataObj.monto,
      dataObj.statuslock,
      dataObj.statuslockadm,
      dataObj.status,
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
      setTimeout(() => {}, 9000);
    }
  );
};

export const nullMaster = async (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body.status;

  await pool.query(
    "UPDATE Table_MasterControl SET status = $1 WHERE id = $2",
    [status, id],
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
      setTimeout(() => {}, 9000);
    }
  );
};

export const lockMaster = async (req: Request, res: Response) => {
  const id = req.params.id;

  await pool.query(
    "UPDATE Table_MasterControl SET statusLock = 1, dateLock = NOW() WHERE id = $1",
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
      setTimeout(() => {}, 9000);
    }
  );
};

export const lockMasterAdm = async (req: Request, res: Response) => {
  const id = req.params.id;

  await pool.query(
    "UPDATE Table_MasterControl SET statusLockAdm = 1, dateLockAdm = NOW() WHERE id = $1",
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
      setTimeout(() => {}, 9000);
    }
  );
};





export const getMasterList = async (req: Request, res: Response) => {
  let id_branch = req.body.id_branch;
  await pool.query(
    "SELECT * FROM TABLE_MASTERCONTROL_listar($1);",
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

export const getMasterId = async (req: Request, res: Response) => {
  const id = req.params.id;
  await pool.query(
    "SELECT * FROM TABLE_MASTERCONTROL_ver($1);",
    [id],
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
