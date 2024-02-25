import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { postHouse } from "../interface/house";
import { postHouseEdit } from "../interface/house";

export const setHouse = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "SELECT * FROM table_housecontrol_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)",
    [
      dataObj.id_master ? dataObj.id_master : null,
      dataObj.nro_house ? dataObj.nro_house : null,
      dataObj.code_house ? dataObj.code_house : null,
      dataObj.id_cot ? dataObj.id_cot : null,
      dataObj.id_modality ? dataObj.id_modality : null,
      dataObj.id_shipment ? dataObj.id_shipment : null,
      dataObj.id_port_begin ? dataObj.id_port_begin : null,
      dataObj.id_port_end ? dataObj.id_port_end : null,
      dataObj.id_agent ? dataObj.id_agent : null,
      dataObj.id_consigner ? dataObj.id_consigner : null,
      dataObj.id_notify ? dataObj.id_notify : null,
      dataObj.id_aerolinea ? dataObj.id_aerolinea : null,
      dataObj.id_coloader ? dataObj.id_coloader : null,
      dataObj.id_naviera ? dataObj.id_naviera : null,
      dataObj.id_incoterms ? dataObj.id_incoterms : null,
      dataObj.nro_hbl ? dataObj.nro_hbl : null,
      dataObj.id_motonave ? dataObj.id_motonave : null,
      dataObj.nro_viaje ? dataObj.nro_viaje : null,
      dataObj.bultos ? dataObj.bultos : null,
      dataObj.peso ? dataObj.peso : null,
      dataObj.volumen ? dataObj.volumen : null,
      dataObj.id_conditions ? dataObj.id_conditions : null,
      dataObj.id_moneda ? dataObj.id_moneda : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.id_consigner_real ? dataObj.id_consigner_real : null,
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
  const { 
    id_branch,
    id_master,
    id_sentido,
    id_tipo_embarque,
    id_origen,
    id_destino,
    id_cliente,
    fecha_etd,
    fecha_eta,
    pagina,
    limite,    
  } = req.query;
  // console.log(req.query)

  await pool.query(
    "SELECT * FROM Table_HouseControl_listarall($1,null,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,null);",
    [
      id_branch,
      id_master || null,
      id_sentido || null,
      id_tipo_embarque || null,
      id_origen || null,
      id_destino || null,
      id_cliente || null,
      fecha_etd || null,
      fecha_eta || null,
      pagina || null,
      limite || null,
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

export const getTotalHouseListAll = async (req: Request, res: Response) => {
  const { 
    id_branch,
    id_master,
    id_sentido,
    id_tipo_embarque,
    id_origen,
    id_destino,
    id_cliente,
    fecha_etd,
    fecha_eta,
  } = req.query;
  // console.log(req.query)

  await pool.query(
    "SELECT * FROM Table_HouseControl_consultar_total($1,null,$2,$3,$4,$5,$6,$7,$8,$9);",
    [
      id_branch,
      id_master || null,
      id_sentido || null,
      id_tipo_embarque || null,
      id_origen || null,
      id_destino || null,
      id_cliente || null,
      fecha_etd || null,
      fecha_eta || null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            total: rows[0].total,
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
  const { id, id_branch } = req.body;

  await pool.query(
    "SELECT * FROM Table_HouseControl_listarall($1,$2,null,null,null,null,null,null,null,null,null,null,null)",
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
  const dataObj = req.body;
  const id = req.params.id;

  await pool.query(
    "select function_housecontrol_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)",
    [
      dataObj.id,
      dataObj.id_cot ? dataObj.id_cot : null,
      dataObj.id_agent ? dataObj.id_agent : null,
      dataObj.id_consigner ? dataObj.id_consigner : null,
      dataObj.id_notify ? dataObj.id_notify : null,
      dataObj.id_aerolinea ? dataObj.id_aerolinea : null,
      dataObj.id_coloader ? dataObj.id_coloader : null,
      dataObj.id_naviera ? dataObj.id_naviera : null,
      dataObj.id_incoterms ? dataObj.id_incoterms : null,
      dataObj.nro_hbl ? dataObj.nro_hbl : null,
      dataObj.id_motonave ? dataObj.id_motonave : null,
      dataObj.nro_viaje ? dataObj.nro_viaje : null,
      dataObj.bultos ? dataObj.bultos : null,
      dataObj.peso ? dataObj.peso : null,
      dataObj.volumen ? dataObj.volumen : null,
      dataObj.id_conditions ? dataObj.id_conditions : null,
      dataObj.id_moneda ? dataObj.id_moneda : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.id_modality ? dataObj.id_modality : null,
      dataObj.id_shipment ? dataObj.id_shipment : null,
      dataObj.id_consigner_real ? dataObj.id_consigner_real : null,
      dataObj.id_port_begin ? dataObj.id_port_begin : null,
      dataObj.id_port_end ? dataObj.id_port_end : null,
      dataObj.lstservices.map((item: any) => item.id || null),
      dataObj.lstservices.map((item: any) => item.nameservice || null),
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
          });
        } else {
          res.json({
            status: 200,
            estadoflag: rows[0].estadoflag,
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

export const insertComentarioHouse = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "SELECT * FROM function_comentariohouse_insertar($1,$2,$3,$4)",
    [
      dataObj.id_house ? dataObj.id_house : null,
      dataObj.id_entities ? dataObj.id_entities : null,
      dataObj.fecha ? dataObj.fecha : null,
      dataObj.comentario ? dataObj.comentario : null
    ],
    (err, response, fields) => {
      let rows = response.rows;
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
        });
      } else {
        console.log(err);
      }
    }
  );
};