import { Request, response, Response } from "express";
import { conexion } from "../routes/databasePGOp";
const pool = conexion();

export const cargarPuertos = async (req: Request, res: Response) => {
  let { search, tipo } = req.query;
  await pool.query(
    "SELECT * FROM function_calc_puerto($1,$2,$3)",
    [!!search ? search : null, null, tipo],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const cargarPaises = async (req: Request, res: Response) => {
  let { search } = req.query;
  await pool.query(
    "SELECT * FROM function_pais_cargar($1)",
    [!!search ? search : null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getTipoCosto = async (req: Request, res: Response) => {
  let { id_pais, shimpent, id_modality } = req.query;

  await pool.query(
    `SELECT * FROM function_cal_tipocostos($1,$2,$3);`,
    [id_pais, shimpent, id_modality],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const getCalcServicio = async (req: Request, res: Response) => {
  let { id_pais } = req.query;
  await pool.query(
    `SELECT * FROM function_calc_services($1);`,
    [id_pais],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getCalcServicioInsert = async (req: Request, res: Response) => {
  let { id_modality, id_pais, code, descripcion, orden, opcionalflag, user } =
    req.body;
  await pool.query(
    `SELECT * FROM function_calc_servicios_insert($1,$2,$3,$4,$5,$6,$7);`,
    [id_modality, id_pais, code, descripcion, orden, opcionalflag, user],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getCalcMultiplicador = async (req: Request, res: Response) => {
  let { id_branch, shimpent } = req.query;
  await pool.query(
    `select * From function_calc_multiplicador($1,$2);`,
    [id_branch, shimpent],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const postCalcCostosInsert = async (req: Request, res: Response) => {
  let {
    id_pais,
    id_service,
    id_tipocosto,
    id_proveedor,
    concepto,
    id_multiplicador,
    unitario,
    fechavalidez,
    opcion,
    users,
    EsCostoFlag,
    EsVentaFlag,
  } = req.body;

  await pool.query(
    `select * From function_calc_costoinsert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);`,
    [
      id_pais,
      id_service,
      id_tipocosto,
      id_proveedor,
      id_multiplicador,
      concepto,
      unitario,
      fechavalidez,
      opcion,
      users,
      typeof EsCostoFlag === "boolean" ? EsCostoFlag : false,
      typeof EsVentaFlag === "boolean" ? EsVentaFlag : false,
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
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getCalcCostos = async (req: Request, res: Response) => {
  let { id_pais } = req.query;

  await pool.query(
    `select * From function_calc_costos($1);`,
    [id_pais],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getValDataLCL = async (req: Request, res: Response) => {
  let { data } = req.body;

  await pool.query(
    `select * From function_calc_val_lcl($1);`,
    [JSON.stringify(data)],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const postCalcCostos = async (req: Request, res: Response) => {
  let { costos, user, shipment, id_modality } = req.body;
  await pool.query(
    `SELECT * FROM function_calc_costo_insert($1,$2,$3,$4);`,
    [JSON.stringify(costos), user, id_modality, shipment],
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

export const getCalcCostosLis = async (req: Request, res: Response) => {
  let { id_pais, shimpent, id_modality } = req.query;
  await pool.query(
    `SELECT * FROM function_calc_costos_list($1,$2,$3);`,
    [shimpent, id_pais, id_modality],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          // token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const postCalcProfit = async (req: Request, res: Response) => {
  let {
    id_modality,
    id_pais,
    shimpent,
    profit,
    peso,
    volumen,
    valor,
    estado,
    user,
  } = req.body;
  await pool.query(
    `SELECT * FROM function_calc_profit($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
    [
      id_modality,
      id_pais,
      shimpent,
      profit,
      peso,
      volumen,
      valor,
      estado,
      user,
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
          // token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getCalcProfitList = async (req: Request, res: Response) => {
  let { id_pais, shimpent, id_modality } = req.query;
  await pool.query(
    `SELECT * FROM function_calc_profit_list($1,$2,$3);`,
    [id_pais, shimpent, id_modality],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          // token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
