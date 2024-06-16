import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { postMaster } from "../interface/master";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
// import { civicinfo } from "googleapis/build/src/apis/civicinfo";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const { Pool } = pg;

const pool = conexion();

export const setMaster = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "SELECT * FROM table_mastercontrol_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44)",
    [
      dataObj.nro_master,
      dataObj.code_master,
      dataObj.id_cot ? dataObj.id_cot : null,
      dataObj.id_modality ? dataObj.id_modality : null,
      dataObj.id_shipment ? dataObj.id_shipment : null,
      dataObj.id_incoterms ? dataObj.id_incoterms : null,
      dataObj.id_port_begin ? dataObj.id_port_begin : null,
      dataObj.id_port_end ? dataObj.id_port_end : null,
      dataObj.id_operador ? dataObj.id_operador : null,
      dataObj.fecha_eta ? dataObj.fecha_eta : null,
      dataObj.fecha_etd ? dataObj.fecha_etd : null,
      dataObj.fecha_disponibilidad ? dataObj.fecha_disponibilidad : null,
      dataObj.ganancia_pricing ? dataObj.ganancia_pricing : null,
      dataObj.ganancia_operaciones ? dataObj.ganancia_operaciones : null,
      dataObj.id_agent ? dataObj.id_agent : null,
      dataObj.id_consigner ? dataObj.id_consigner : null,
      dataObj.id_notify ? dataObj.id_notify : null,
      dataObj.id_aerolinea ? dataObj.id_aerolinea : null,
      dataObj.id_coloader ? dataObj.id_coloader : null,
      dataObj.id_naviera ? dataObj.id_naviera : null,
      dataObj.nro_mbl ? dataObj.nro_mbl : null,
      dataObj.id_motonave ? dataObj.id_motonave : null,
      dataObj.nro_viaje ? dataObj.nro_viaje : null,
      dataObj.bultos ? dataObj.bultos : null,
      dataObj.peso ? dataObj.peso : null,
      dataObj.volumen ? dataObj.volumen : null,
      dataObj.id_conditions ? dataObj.id_conditions : null,
      dataObj.id_moneda ? dataObj.id_moneda : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.status ? dataObj.status : null,
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.grupalflag ? dataObj.grupalflag : false,
      dataObj.nro_cuotas ? dataObj.nro_cuotas : null,
      dataObj.cuotas ? JSON.stringify(dataObj.cuotas) : null,
      dataObj.fecha_libre_almacenaje ? dataObj.fecha_libre_almacenaje : null,
      dataObj.almacen_recepcion ? dataObj.almacen_recepcion : null,
      dataObj.dias_sobreestadia ? dataObj.dias_sobreestadia : null,
      dataObj.id_canal ? dataObj.id_canal : null,
      dataObj.nro_manifiesto ? dataObj.nro_manifiesto : null,
      dataObj.namecampaign ? dataObj.namecampaign : null,
      dataObj.master_itemsContainers.map(item => item.id_container || null),
      dataObj.master_itemsContainers.map(item => item.nro_container || null),
      dataObj.master_itemsContainers.map(item => item.nro_precinto || null),
      dataObj.master_itemsContainers.map(item => item.cantidad || 0),
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const editMaster = async (req: Request, res: Response) => {
  const dataObj = req.body;
  const id      = req.params.id;

  await pool.query(
    "SELECT * FROM function_mastercontrol_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48)",
    [
      id,
      dataObj.id_branch ? dataObj.id_branch : null,
      dataObj.nro_master ? dataObj.nro_master : null,
      dataObj.code_master ? dataObj.code_master : null,
      dataObj.id_cot ? dataObj.id_cot : null,
      dataObj.id_modality ? dataObj.id_modality : null,
      dataObj.id_shipment ? dataObj.id_shipment : null,
      dataObj.id_incoterms ? dataObj.id_incoterms : null,
      dataObj.id_port_begin ? dataObj.id_port_begin : null,
      dataObj.id_port_end ? dataObj.id_port_end : null,
      dataObj.id_operador ? dataObj.id_operador : null,
      dataObj.fecha_etd ? dataObj.fecha_etd : null,
      dataObj.fecha_eta ? dataObj.fecha_eta : null,
      dataObj.fecha_disponibilidad ? dataObj.fecha_disponibilidad : null,
      dataObj.ganancia_pricing ? dataObj.ganancia_pricing : null,
      dataObj.ganancia_operaciones ? dataObj.ganancia_operaciones : null,
      dataObj.id_agent ? dataObj.id_agent : null,
      dataObj.id_consigner ? dataObj.id_consigner : null,
      dataObj.id_notify ? dataObj.id_notify : null,
      dataObj.id_aerolinea ? dataObj.id_aerolinea : null,
      dataObj.id_coloader ? dataObj.id_coloader : null,
      dataObj.id_naviera ? dataObj.id_naviera : null,
      dataObj.nro_mbl ? dataObj.nro_mbl : null,
      dataObj.id_motonave ? dataObj.id_motonave : null,
      dataObj.nro_viaje ? dataObj.nro_viaje : null,
      dataObj.bultos ? dataObj.bultos : null,
      dataObj.peso ? dataObj.peso : null,
      dataObj.volumen ? dataObj.volumen : null,
      dataObj.id_conditions ? dataObj.id_conditions : null,
      dataObj.id_moneda ? dataObj.id_moneda : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.statuslock ? dataObj.statuslock : null,
      dataObj.statuslockadm ? dataObj.statuslockadm : null,
      dataObj.status ? dataObj.status : null,
      dataObj.grupalflag ? dataObj.grupalflag : false,
      dataObj.nro_cuotas ? dataObj.nro_cuotas : null,
      dataObj.cuotas ? JSON.stringify(dataObj.cuotas) : null,
      dataObj.fecha_libre_almacenaje ? dataObj.fecha_libre_almacenaje : null,
      dataObj.almacen_recepcion ? dataObj.almacen_recepcion : null,
      dataObj.dias_sobreestadia ? dataObj.dias_sobreestadia : null,
      dataObj.id_canal ? dataObj.id_canal : null,
      dataObj.nro_manifiesto ? dataObj.nro_manifiesto : null,
      dataObj.namecampaign ? dataObj.namecampaign : null,
      dataObj.master_itemsContainers.map(item => item.id || null),
      dataObj.master_itemsContainers.map(item => item.id_container || null),
      dataObj.master_itemsContainers.map(item => item.nro_container || null),
      dataObj.master_itemsContainers.map(item => item.nro_precinto || null),
      dataObj.master_itemsContainers.map(item => item.cantidad || 0),
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
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
  const { 
    id_branch,
    id_canal,
    id_sentido,
    id_tipo_embarque,
    id_origen,
    id_destino,
    id_agente,
    fecha_etd,
    fecha_eta,
    status_op,
    status_adm,
    pagina,
    limite,
    orden,
    busqueda
  } = req.query;
  // console.log(req.query)

  await pool.query(
    "SELECT * FROM TABLE_MASTERCONTROL_listar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);",
    [
      id_branch,
      id_canal || null,
      id_sentido || null,
      id_tipo_embarque || null,
      id_origen || null,
      id_destino || null,
      id_agente || null,
      fecha_etd || null,
      fecha_eta || null,
      status_op || null,
      status_adm || null,
      pagina || null,
      limite || null,
      orden || null,
      busqueda || null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getTotalMasterList = async (req: Request, res: Response) => {
  const { 
    id_branch,
    id_canal,
    id_sentido,
    id_tipo_embarque,
    id_origen,
    id_destino,
    id_agente,
    fecha_etd,
    fecha_eta,
    status_op,
    status_adm,
    busqueda
  } = req.query;
  // console.log(req.query)

  await pool.query(
    "SELECT * FROM TABLE_MASTERCONTROL_consultar_total($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);",
    [
      id_branch,
      id_canal || null,
      id_sentido || null,
      id_tipo_embarque || null,
      id_origen || null,
      id_destino || null,
      id_agente || null,
      fecha_etd || null,
      fecha_eta || null,
      status_op || null,
      status_adm || null,
      busqueda || null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
          
        res.json({
          status: 200,
          statusBol: true,
          total: rows[0].total,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const cargarMaster = async (req: Request, res: Response) => {
  let {
    id_branch,
    id_modality,
    id_shipment,
    id_incoterms,
    id_port_begin,
    id_port_end,
  } = req.query;
  await pool.query(
    "SELECT * FROM function_cargar_masters($1,$2,$3,$4,$5,$6);",
    [
      id_branch,
      id_modality ? id_modality : null,
      id_shipment ? id_shipment : null,
      id_incoterms ? id_incoterms : null,
      id_port_begin ? id_port_begin : null,
      id_port_end ? id_port_end : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          data: rows,
          token: renewTokenMiddleware(req),
          mensaje: rows[0].mensaje,
          insertId: rows[0].insertid,
          nro_quote: rows[0].nro_quote,
          msg: "Cotización ingresada con el número " + rows[0].nro_quote,
        });
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

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getCargarHouse = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_cargar_housecontrol($1);",
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

export const updateFolderOneDrive = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_updatemaster_urlonedrive($1,$2);",
    [req.body.id, req.body.url],
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

export const insertComentarioMaster = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_comentariomaster_insert($1,$2,$3,$4);",
    [
      req.body.id_entitie,
      req.body.id_master,
      req.body.fecha,
      req.body.comentario,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const deleteMaster = async (req: Request, res: Response) => {
  const { id } = req.params;

  await pool.query(
    "SELECT * FROM function_mastercontrol_eliminar($1);",
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
          
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};