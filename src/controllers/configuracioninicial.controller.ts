import { Request, Response } from "express";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { conexion } from "../routes/databasePGOp";
const pool = conexion();

export const actualizarDatosEmpresaConfig = async (
  req: Request,
  res: Response
) => {
  const {
    id,
    id_document,
    document,
    trade_name,
    logo,
    id_pais,
    id_logo,
    address,
  } = req.body;
  await pool.query(
    "select * from function_config_actualizardatosempresa($1,$2,$3,$4,$5,$6,$7,$8);",
    [id, id_document, document, trade_name, logo, id_pais, id_logo, address],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const actualizarDatosAdministradorConfig = async (
  req: Request,
  res: Response
) => {
  const { id, id_user, names, surname, second_surname, phone, email } =
    req.body;
  await pool.query(
    "select * from function_config_actualizardatosadmin($1,$2,$3,$4,$5,$6,$7);",
    [id, id_user, names, surname, second_surname, phone, email],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const actualizarDatosCMProveedor = async (
  req: Request,
  res: Response
) => {
  const { id_branch, lstProveedor } = req.body;

  await pool.query(
    "select * from function_config_cargamasivaproveedor($1,$2);",
    [id_branch, JSON.stringify(lstProveedor)],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const actualizarDatosCMCliente = async (req: Request, res: Response) => {
  const { id_branch, lstClientes } = req.body;

  await pool.query(
    "select * from function_config_cargamasivacliente($1,$2);",
    [id_branch, JSON.stringify(lstClientes)],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const obtenerConfigCostos = async (req: Request, res: Response) => {
  const { id_branch, id_modality, shipment } = req.query;

  await pool.query(
    "select * from function_config_costos($1,$2,$3);",
    [id_branch, id_modality, shipment],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const guardarCostosConfig = async (req: Request, res: Response) => {
  const { id_branch, id_modality, id_shipment, lstCostos } = req.body;  
  await pool.query(
    "select * from function_config_guardar_costos($1,$2,$3,$4);",
    [id_branch, id_modality, id_shipment, JSON.stringify(lstCostos)],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          estadoflag: rows[0].estadoflag,
          mensaje: rows[0].mensaje,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
