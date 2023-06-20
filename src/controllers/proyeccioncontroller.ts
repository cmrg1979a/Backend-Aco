import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import path from "path";
var xl = require("excel4node");

export const setProyeccion = async (req: Request, res: Response) => {
  let data = req.body;
  await pool.query(
    "SELECT * FROM function_proyeccion_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);",
    [
      data.id_branch,
      data.id_month,
      data.id_year,
      data.id_user,
      data.tipocambio,
      data.total_monlocal,
      data.total_conversionext,
      data.total_monext,
      data.total_proyectado_ext,
      data.details.map((item) => {
        return item.id_tiposubgasto;
      }),
      data.details.map((item) => {
        return item.id_entitie;
      }),
      data.details.map((item) => {
        return item.id_coin;
      }),
      data.details.map((item) => {
        return item.description;
      }),
      data.details.map((item) => {
        return item.monto_monlocal;
      }),
      data.details.map((item) => {
        return item.monto_monext;
      }),
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const listProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_list_proyeccion($1,$2,$3,$4,$5,$6,$7,$8,$9);",
    [
      req.query.id_branch ? req.query.id_branch : null,
      req.query.id_month ? req.query.id_month : null,
      req.query.id_year ? req.query.id_year : null,
      req.query.id_user ? req.query.id_user : null,
      req.query.tipocambio ? req.query.tipocambio : null,
      req.query.total_monlocal ? req.query.total_monlocal : null,
      req.query.total_conversionext ? req.query.total_conversionext : null,
      req.query.total_monext ? req.query.total_monext : null,
      req.query.total_proyectado_ext ? req.query.total_proyectado_ext : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const verProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_ver($1);",
    [req.query.id ? req.query.id : null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const updateProyeccion = async (req: Request, res: Response) => {
  let data = req.body;
  console.log(data);
  await pool.query(
    "SELECT * FROM function_proyeccion_editar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);",
    [
      data.id,
      data.id_branch,
      data.id_month,
      data.id_year,
      data.id_user,
      data.tipocambio,
      data.total_monlocal,
      data.total_conversionext,
      data.total_monext,
      data.total_proyectado_ext,
      data.details.map((item) => {
        return item.id ? item.id : null;
      }),
      data.details.map((item) => {
        return item.id_tiposubgasto;
      }),
      data.details.map((item) => {
        return item.id_entitie;
      }),
      data.details.map((item) => {
        return item.id_coin;
      }),
      data.details.map((item) => {
        return item.description ? item.description : null;
      }),
      data.details.map((item) => {
        return item.monto_monlocal;
      }),
      data.details.map((item) => {
        return item.monto_monext;
      }),
      data.details.map((item) => {
        return item.estado;
      }),
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const validateProyeccionAprob = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_validar_aprob($1,$2);",
    [req.query.id_month, req.query.id_year],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const copiarProyeccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_proyeccion_copiar($1,$2,$3,$4,$5);",
    [
      req.body.id,
      req.body.id_month,
      req.body.id_year,
      req.body.id_user,
      req.body.id_branch,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const aprobarProyeccion = async (req: Request, res: Response) => {
  console.log(req.body.id);
  await pool.query(
    "SELECT * FROM function_proyeccion_aprobar($1);",
    [req.body.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
export const eliminarProyeccion = async (req: Request, res: Response) => {
  console.log(req.body.id);
  await pool.query(
    "SELECT * FROM function_proyeccion_eliminar($1);",
    [req.body.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,

            mensaje: rows[0].mensaje,
            estado: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};
