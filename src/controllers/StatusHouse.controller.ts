import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
import { statusHouseInterface } from "interface/StatusHouse";
const pool = conexion();

export const getListadoStatusHouse = async (req: Request, res: Response) => {
  let {
    id_branch,
    id_modalidad,
    id_shipment,
    name,
    exwflag,
    fcaflag,
    fobflag,
    cfrflag,
    cifflag,
    ddpflag,
    estado,
  } = req.query;
  await pool.query(
    "SELECT * FROM function_bitaco_listar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
    [
      id_branch,
      id_modalidad,
      id_shipment,
      name,
      exwflag,
      fcaflag,
      fobflag,
      cfrflag,
      cifflag,
      ddpflag,
      estado,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const getObtenerOrden = async (req: Request, res: Response) => {
  let { id_modalidad, id_shipment } = req.query;
  await pool.query(
    "SELECT * FROM function_statusbitacora_orden($1,$2)",
    [id_modalidad, id_shipment],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const setGuardarStatusHouse = async (req: Request, res: Response) => {
  let statusHouseInterface: statusHouseInterface = req.body;
  let { lstComentatios } = req.body;
  await pool.query(
    "SELECT * FROM fuction_statushouse_insert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
    [
      statusHouseInterface.id_branch,
      statusHouseInterface.id_modality,
      statusHouseInterface.id_shipment,
      statusHouseInterface.name,
      Boolean(statusHouseInterface.exw) ? statusHouseInterface.exw : false,
      Boolean(statusHouseInterface.fca) ? statusHouseInterface.fca : false,
      Boolean(statusHouseInterface.fob) ? statusHouseInterface.fob : false,
      Boolean(statusHouseInterface.cfr) ? statusHouseInterface.cfr : false,
      Boolean(statusHouseInterface.cif) ? statusHouseInterface.cif : false,
      Boolean(statusHouseInterface.ddp) ? statusHouseInterface.ddp : false,
      statusHouseInterface.nroorden,
      JSON.stringify(lstComentatios),
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const guardarOrdenEstatus = async (req: Request, res: Response) => {
  let { lstStatus } = req.body;
  await pool.query(
    "SELECT * FROM function_statusbitacora_actualizarorden($1)",
    [JSON.stringify(lstStatus)],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
