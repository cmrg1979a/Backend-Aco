import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { IRegiones } from "interface/iRegiones";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
const { Pool } = pg;
const pool = conexion();
export const getCargarState = async (req: Request, res: Response) => {
  let regiones: IRegiones = req.query;
  await pool.query(
    " SELECT * FROM function_state_cargar($1)",
    [regiones.id_pais ? regiones.id_pais : null],
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
export const ListarState = async (req: Request, res: Response) => {
  let regiones: IRegiones = req.query;
  await pool.query(
    " SELECT * FROM function_loc_state_listar($1,$2,$3,$4,$5)",
    [
      regiones.id_pais ? regiones.id_pais : null,
      regiones.code ? regiones.code : null,
      regiones.name ? regiones.name : null,
      regiones.description ? regiones.description : null,
      regiones.status ? regiones.status : null,
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

export const InsertarState = async (req: Request, res: Response) => {
  let regiones: IRegiones = req.body;
  await pool.query(
    " SELECT * FROM function_state_insertar($1,$2,$3,$4)",
    [
      regiones.id_pais,
      regiones.name,
      regiones.description ? regiones.description : regiones.description,
      regiones.status == true || regiones.status == 1 ? 1 : 0,
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
export const ActualizarState = async (req: Request, res: Response) => {
  let regiones: IRegiones = req.body;
  await pool.query(
    " SELECT * FROM function_state_actualizar($1,$2,$3,$4,$5)",
    [
      regiones.id_pais,
      regiones.name,
      regiones.description ? regiones.description : null,
      regiones.status == true || regiones.status == 1 ? 1 : 0,
      regiones.id,
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
