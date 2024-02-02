import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import { IMasterDetalle } from "interface/iMasterDetalle";
const pool = conexion();

export const cargarMasterDetalleRecibido = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'RCP')",
    [req.query.id_branch],
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
export const cargarMasterDetalleEnviado = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'EC')",
    [req.query.id_branch],
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
export const cargarMasterDetalleNotasCotizacion = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'NQ')",
    [req.query.id_branch],
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
export const cargarMasterDetalleCanal = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'CNL')",
    [req.query.id_branch],
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
export const cargarMasterDetalleTipoProveedor = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'TP')",
    [req.query.id_branch],
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
export const cargarPercepcionAduana = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'PA')",
    [req.query.id_branch],
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
export const cargarTipoTransaccion = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'TT')",
    [req.query.id_branch],
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
export const cargarTipoTelefonoPersona = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'TPP')",
    [req.query.id_branch],
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

export const cargarMasterDetalleImpuestos = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "SELECT * FROM function_masterdetalle_cargar($1,'IMP')",
    [req.query.id_branch],
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

export const ListarMasterDetalleImpuestos = async (
  req: Request,
  res: Response
) => {
  let iMasterDetalle: IMasterDetalle = req.query;

  await pool.query(
    "SELECT * FROM function_masterdetalle_listar('IMP',$1,$2,$3,$4)",
    [
      iMasterDetalle.id_branch,
      iMasterDetalle.valorcodigo,
      iMasterDetalle.description,
      iMasterDetalle.status === "null" ? null : iMasterDetalle.status,
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

export const InsertarMasterDetalleImpuestos = async (
  req: Request,
  res: Response
) => {
  let iMasterDetalle: IMasterDetalle = req.body;
  await pool.query(
    "SELECT * FROM function_masterdetalle_insertar('IMP',$1,$2,$3,$4,$5,$6,$7,$8)",
    [
      iMasterDetalle.valorcodigo ? iMasterDetalle.valorcodigo : null,
      iMasterDetalle.codigo01 ? iMasterDetalle.codigo01 : null,
      iMasterDetalle.codigo02 ? iMasterDetalle.codigo02 : null,
      iMasterDetalle.description ? iMasterDetalle.description : null,
      iMasterDetalle.status ? iMasterDetalle.status : null,
      iMasterDetalle.id_branch ? iMasterDetalle.id_branch : null,
      iMasterDetalle.escomunflag ? iMasterDetalle.escomunflag : null,
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
export const ActualizarMasterDetalleImpuestos = async (
  req: Request,
  res: Response
) => {
  let iMasterDetalle: IMasterDetalle = req.body;

  await pool.query(
    "SELECT * FROM function_masterdetalle_actualizar($1,$2,$3,$4,$5,$6)",
    [
      iMasterDetalle.codigo01 ? iMasterDetalle.codigo01 : null,
      iMasterDetalle.codigo02 ? iMasterDetalle.codigo02 : null,
      iMasterDetalle.description ? iMasterDetalle.description : null,
      iMasterDetalle.status,
      iMasterDetalle.escomunflag,
      iMasterDetalle.id ? iMasterDetalle.id : null,
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
