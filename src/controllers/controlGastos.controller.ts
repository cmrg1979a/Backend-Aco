import { Request, Response } from "express";

import { postControl } from "../interface/controlGastos";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

export const setControl = async (req: Request, res: Response) => {
  const dataObj: postControl = req.body;
  console.log(dataObj);
  await pool.query(
    "select * from Table_ControlGastos_Insertar($1,$2,$3)",
    [dataObj.id_house, dataObj.id_user, dataObj.status],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        console.log(rows);
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

export const setIngresos = async (req: Request, res: Response) => {
  const dataObj = req.body;
  await pool.query(
    "select * from PA_CIngresos_Insert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
    [
      dataObj.id_orders ? dataObj.id_orders : null,
      dataObj.concepto,
      dataObj.monto_pr ? dataObj.monto_pr : 0,
      dataObj.monto_op ? dataObj.monto_op : 0,
      dataObj.igv_pr ? dataObj.igv_pr : 0,
      dataObj.igv_op ? dataObj.igv_op : 0,
      dataObj.total_pr ? dataObj.total_pr : 0,
      dataObj.total_op ? dataObj.total_op : 0,
      0,
      null,
      null,
      1,
      dataObj.id_user ? dataObj.id_user : null,
      dataObj.tipo_pago ? dataObj.tipo_pago : null,
      dataObj.numero ? dataObj.numero : null,
      dataObj.fecha ? dataObj.fecha : null,
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

export const setEgresos = async (req: Request, res: Response) => {
  const dataObj = req.body;
  console.log(dataObj);
  await pool.query(
    "select * from PA_CEgresos_Insert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)",
    [
      dataObj.id_orders,
      dataObj.id_proveedor,
      dataObj.concepto,
      dataObj.monto_pr ? parseFloat(dataObj.monto_pr) : 0,
      dataObj.monto_op ? parseFloat(dataObj.monto_op) : 0,
      dataObj.igv_pr ? parseFloat(dataObj.igv_pr) : 0,
      dataObj.igv_op ? parseFloat(dataObj.igv_op) : 0,
      dataObj.total_pr ? parseFloat(dataObj.total_pr) : 0,
      dataObj.total_op ? parseFloat(dataObj.total_op) : 0,
      dataObj.id_coins ? parseFloat(dataObj.id_coins) : 0,
      dataObj.montoopcuentabanco ? parseFloat(dataObj.montoopcuentabanco) : 0,
      dataObj.igvopcuentabanco ? parseFloat(dataObj.igvopcuentabanco) : 0,
      dataObj.totalopcuentabanco ? parseFloat(dataObj.totalopcuentabanco) : 0,
      dataObj.id_user,
      dataObj.id_correlativo,
      dataObj.id_master,
      dataObj.tipocambio,
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

export const getIngresosList = async (req: Request, res: Response) => {
  const id_orders = req.params.id_orders;

  await pool.query(
    "select * from CONTROLGASTOS_INGRESOS_listarxorders($1)",
    [id_orders],
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

export const getEgresosList = async (req: Request, res: Response) => {
  const id_orders = req.params.id_orders;

  await pool.query(
    "select * from CONTROLGASTOS_EGRESOS_listar($1,null,null)",
    [id_orders],
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

export const getEgresosExpediente = async (req: Request, res: Response) => {
  const id_house = req.params.id_house;

  await pool.query(
    "SELECT * FROM CONTROLGASTOS_EGRESOS_listar(NULL,$1,null)",
    [id_house],
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

export const getEgresosProveedorList = async (req: Request, res: Response) => {
  const id_orders = req.params.id_orders;
  const id_proveedor = req.params.id_proveedor;

  await pool.query(
    "SELECT * FROM CONTROLGASTOS_EGRESOS_listar($1,null,$2)",
    [id_orders, id_proveedor],
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

export const getTotalesProveedor = async (req: Request, res: Response) => {
  const id_orders = req.params.id_orders;

  await pool.query(
    "SELECT * FROM CONTROLGASTOS_EGRESOS_totalesProveedor($1);",
    [id_orders],
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

export const delEgresos = async (req: Request, res: Response) => {
  const id = req.params.id;

  await pool.query(
    "delete from ControlGastos_Egresos where id = $1",
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

export const delIngresos = async (req: Request, res: Response) => {
  const id = req.params.id;

  await pool.query(
    "select * from function_eliminar_ingreso($1)",
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        console.log(rows);
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

export const delEgregso = async (req: Request, res: Response) => {
  const id = req.params.id;

  await pool.query(
    "select * from function_delete_egreso($1)",
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
            estadoflag: rows[0].estadoflag,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            mensaje: rows[0].mensaje,
            estadoflag: rows[0].estadoflag,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getControlList = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM TABLE_CONTROLGASTOS_listar($1);",
    [req.body.id_branch],
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

export const editIngreso = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = req.body;

  await pool.query(
    "SELECT * FROM function_edit_ingreso($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
    [
      data.concepto,
      data.monto_pr,
      data.monto_op,
      data.igv_pr ? data.igv_pr : 0,
      data.igv_op ? data.igv_op : 0,
      data.total_pr,
      data.total_op,
      data.tipo_pago,
      data.numero,
      data.fecha,
      id,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        console.log(rows);
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

export const editEgreso = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = req.body;
  console.log(data);
  await pool.query(
    "select * from function_controlgasto_edit($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13,$14,$15,$16,$17,$18)",
    [
      data.concepto,
      data.monto_pr,
      data.monto_op,
      data.igv_pr ? data.igv_pr : 0,
      data.igv_op ? data.igv_op : 0,
      data.total_pr,
      data.total_op,
      data.tipo_pago,
      data.numero ? data.numero : null,
      data.fecha ? data.fecha : null,
      data.id_coins ? data.id_coins : null,
      data.montoopcuentabanco ? data.montoopcuentabanco : null,
      data.igvopcuentabanco ? data.igvopcuentabanco : null,
      data.totalopcuentabanco ? data.totalopcuentabanco : null,
      data.id_correlativo ? data.id_correlativo : null,
      data.id_proveedor ? data.id_proveedor : null,
      data.tipocambio ? data.tipocambio : null,
      id,
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

export const ControlGastosList = async (req: Request, res: Response) => {
  const code_master = req.query.code_master;
  await pool.query(
    "select * from function_controlgastos($1)",
    [code_master],
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

export const cargarCorrelativo = async (req: Request, res: Response) => {
  const id_branch = req.query.id_branch;
  await pool.query(
    "select * from function_cargar_correlativo($1)",
    [id_branch ? id_branch : null],
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

export const listarCGECcorralativo = async (req: Request, res: Response) => {
  const id_proveedor = req.query.id_proveedor;
  await pool.query(
    "select * from function_cge_correlativo($1)",
    [id_proveedor ? id_proveedor : null],
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
export const registrarCGECcorralativo = async (req: Request, res: Response) => {
  const dataObj = req.body;
  await pool.query(
    "select * from function_cge_correlativo($1)",
    [
      dataObj.nro_operacion,
      dataObj.date,
      dataObj.payPath,
      dataObj.id_cuenta,
      dataObj.control_gasto.map((element) => {
        return element.id;
      }),
      dataObj.control_gasto.map((element) => {
        return element.total_op;
      }),
      dataObj.control_gasto.map((element) => {
        return element.totalopcuentabanco;
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
