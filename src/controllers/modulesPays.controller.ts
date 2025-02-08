import { Request, Response } from "express";

import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
import { InvoiceAdminCxC } from "interface/InvoiceAdminCxC";
const { Pool } = pg;
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";
export const setInvoiceAdmin = async (req: Request, res: Response) => {
  const dataObj = req.body;
  const dataDetails = req.body.detalle;
  let concepto = dataDetails.map((item: any) => {
    return item.concepto;
  });
  let monto = dataDetails.map((item: any) => {
    return `${parseFloat(item.monto)}`;
  });
  let igv = dataDetails.map((item: any) => {
    return `${parseFloat(item.igv)}`;
  });
  let total = dataDetails.map((item: any) => {
    return `${parseFloat(item.total)}`;
  });
  let afecto = dataDetails.map((item: any) => {
    return item.afecto == true || item.afecto == "true" ? 1 : 0;
  });

  await pool.query(
    "select * from table_invoiceadmin_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)",
    [
      dataObj.type_payment,
      dataObj.id_expediente,
      dataObj.id_proveedor,
      dataObj.fecha,
      dataObj.nro_factura,
      dataObj.nro_serie,
      dataObj.id_coins,
      dataObj.monto,
      dataObj.type_igv,
      dataObj.igv,
      dataObj.status,
      dataObj.id_path,
      dataObj.id_proformance,
      dataObj.id_month,
      dataObj.id_year,
      dataObj.montodolar,
      dataObj.tipocambio,
      dataDetails.map((item: any) => {
        return item.concepto;
      }),
      dataDetails.map((item: any) => {
        return item.monto;
      }),
      dataDetails.map((item: any) => {
        return item.igv;
      }),
      dataDetails.map((item: any) => {
        return item.total;
      }),

      dataDetails.map((item: any) => {
        return item.afecto == true ? 1 : 0;
      }),
      dataDetails.map((item: any) => {
        return item.montodolar;
      }),
      dataDetails.map((item: any) => {
        return item.igvdolar;
      }),
      dataDetails.map((item: any) => {
        return item.totaldolar;
      }),
      dataObj.id_gastos,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        console.log(err);
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: "Registro no aceptado",
          },
        });
      }
    }
  );
};

export const putPro = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "UPDATE Table_Invoice SET type_pago = $1, id_path = $2 where id = $3",
    [dataObj.id_path, dataObj.id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: "Registro no aceptado",
          },
        });
      }
    }
  );
};

export const paymentInvoiceAdmin = async (req: Request, res: Response) => {
  const id = req.params.id;
  const dataObj = req.body;
  await pool.query(
    "UPDATE Table_InvoiceAdmin SET id_pago = ?, fecha_pago = ?, factura_pago = ?, serie_pago = ?, id_bank_pago = ?, id_coin_pago = ?, monto_pago = ?, status = ? where id = ?",
    [
      dataObj.id_pago,
      dataObj.fecha_pago,
      dataObj.factura_pago,
      dataObj.serie_pago,
      dataObj.id_bank_pago,
      dataObj.id_coin_pago,
      dataObj.monto_pago,
      dataObj.status,
      id,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: "Registro no aceptado",
          },
        });
      }
    }
  );
};

export const getInvoiceAdmin = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM table_invoiceadmin_listar($1);",
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const delPro = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "select * from function_del_pro($1)",
    [dataObj.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const getRegularizar = async (req: Request, res: Response) => {
  await pool.query(
    " SELECT * FROM TABLE_INVOICE_pro($1)",
    [req.body.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const getVerInvoiceAdmin = async (req: Request, res: Response) => {
  let objData = req.params;
  await pool.query(
    "SELECT * FROM TABLE_INVOICEADMIN_ver($1);",
    [objData.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const setUpdateInvoiceAdmin = async (req: Request, res: Response) => {
  const dataObj = req.body;
  const dataDetails = req.body.detalle;
  let path = isNaN(+dataObj.id_path);

  await pool.query(
    "SELECT * FROM  table_DetailsInvoiceAdmin_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)",
    [
      dataObj.id,
      dataObj.id_proveedor,
      dataObj.fecha,
      dataObj.nro_factura,
      dataObj.nro_serie,
      dataObj.id_coins,
      dataObj.monto,
      dataObj.status,
      dataObj.id_proformance,
      dataObj.id_month,
      dataObj.id_year,
      dataObj.id_expediente,
      dataObj.id_path,
      dataObj.tipocambio,
      dataDetails.map((item: any) => {
        return item.concepto;
      }),
      dataDetails.map((item: any) => {
        return item.monto;
      }),
      dataDetails.map((item: any) => {
        return item.igv;
      }),
      dataDetails.map((item: any) => {
        return item.total;
      }),
      dataDetails.map((item: any) => {
        return item.montodolar;
      }),
      dataDetails.map((item: any) => {
        return item.igvdolar;
      }),
      dataDetails.map((item: any) => {
        return item.totaldolar;
      }),
      dataDetails.map((item: any) => {
        return item.afecto == true || item.afecto == 1 ? 1 : 0;
      }),
      dataDetails.map((item: any) => {
        return item.status == true || item.status == 1 ? 1 : 0;
      }),
      dataDetails.map((item: any) => {
        return item.id ? item.id : null;
      }),
      dataObj.id_gastos,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

// CxC
export const getInvoiceAdminCxC = async (req: Request, res: Response) => {
  await pool.query(
    "SELECT * FROM table_invoiceadmincxc_listar($1)",
    [req.body.id_branch],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const setInvoiceAdminCxC = async (req: Request, res: Response) => {
  const dataObj = req.body;
  const dataDetails = req.body.detalle;

  await pool.query(
    "SELECT * FROM table_invoiceadmincxc_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)",
    [
      dataObj.type_payment ? dataObj.type_payment : null,
      dataObj.id_expediente ? dataObj.id_expediente : null,
      dataObj.id_cliente ? dataObj.id_cliente : null,
      dataObj.fecha ? dataObj.fecha : null,
      dataObj.nro_factura ? dataObj.nro_factura : null,
      dataObj.nro_serie ? dataObj.nro_serie : null,
      dataObj.id_coins ? dataObj.id_coins : null,
      dataObj.monto ? dataObj.monto : null,
      dataObj.montodolar ? dataObj.montodolar : null,
      dataObj.type_igv ? dataObj.type_igv : null,
      dataObj.igv ? dataObj.igv : null,
      dataObj.status ? dataObj.status : null,
      dataObj.id_path ? dataObj.id_path : null,
      dataObj.id_proformance ? dataObj.id_proformance : null,
      dataObj.id_month ? dataObj.id_month : null,
      dataObj.id_year ? dataObj.id_year : null,
      dataObj.tipocambio ? dataObj.tipocambio : null,
      dataObj.id_tipoingreso ? dataObj.id_tipoingreso : null,
      dataDetails.map((item: any) => {
        return item.concepto;
      }),
      dataDetails.map((item: any) => {
        return item.monto ?? 0;
      }),
      dataDetails.map((item: any) => {
        return item.total ?? 0;
      }),
      dataDetails.map((item: any) => {
        return item.igv ?? 0;
      }),
      dataDetails.map((item: any) => {
        return item.montodolar ?? 0;
      }),
      dataDetails.map((item: any) => {
        return item.totaldolar ?? 0;
      }),
      dataDetails.map((item: any) => {
        return item.igvdolar ?? 0;
      }),
      dataDetails.map((item: any) => {
        return item.afecto == "true" ? 1 : 0;
      }),
      dataDetails.map((item: any) => {
        return item.status == "true" ? 1 : 0;
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
            token: renewTokenMiddleware(req),
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

export const getVerInvoiceAdminCxC = async (req: Request, res: Response) => {
  let objData = req.params;
  await pool.query(
    `SELECT * FROM TABLE_INVOICEADMINCXC_ver($1);`,
    [objData.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const setUpdateInvoiceAdminCxC = async (req: Request, res: Response) => {
  const dataObj = req.body;
  const dataDetails = dataObj.detalle;

  await pool.query(
    "select * from Table_InvoiceAdminCxC_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29)",
    [
      dataObj.type_payment,
      dataObj.id_expediente,
      dataObj.id_cliente,
      dataObj.fecha,
      dataObj.nro_factura,
      dataObj.nro_serie,
      dataObj.id_coins,
      dataObj.monto,
      dataObj.montodolar,
      dataObj.type_igv ? dataObj.type_igv : null,
      dataObj.igv,
      dataObj.status,
      dataObj.id_path,
      dataObj.id_proformance,
      dataObj.id_month,
      dataObj.id_year,
      dataObj.tipocambio,
      dataObj.id_tipoingreso,
      dataDetails.map((item: any) => {
        return item.concepto;
      }),
      dataDetails.map((item: any) => {
        return item.monto;
      }),
      dataDetails.map((item: any) => {
        return item.igv;
      }),
      dataDetails.map((item: any) => {
        return item.total;
      }),
      dataDetails.map((item: any) => {
        return item.montodolar;
      }),
      dataDetails.map((item: any) => {
        return item.igvdolar;
      }),
      dataDetails.map((item: any) => {
        return item.totaldolar;
      }),
      dataDetails.map((item: any) => {
        return item.afecto == 1 || item.afecto ? 1 : 0;
      }),
      dataDetails.map((item: any) => {
        return item.status == 1 || item.status == true ? 1 : 0;
      }),
      dataDetails.map((item: any) => {
        return item.id;
      }),
      dataObj.id,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
            token: renewTokenMiddleware(req),
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

export const paymentInvoiceAdminCxC = async (req: Request, res: Response) => {
  const id = req.params.id;
  const dataObj = req.body;

  await pool.query(
    "UPDATE Table_InvoiceAdminCxC SET id_pago = ?, fecha_pago = ?, factura_pago = ?, serie_pago = ?, id_bank_pago = ?, id_coin_pago = ?, monto_pago = ?, status = ? where id = ?",
    [
      dataObj.id_pago,
      dataObj.fecha_pago,
      dataObj.factura_pago,
      dataObj.serie_pago,
      dataObj.id_bank_pago,
      dataObj.id_coin_pago,
      dataObj.monto_pago,
      dataObj.status,
      id,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: "Registro no aceptado",
          },
        });
      }
    }
  );
};

export const delProCxC = async (req: Request, res: Response) => {
  const dataObj = req.body;

  await pool.query(
    "UPDATE Table_InvoiceAdminCxC SET status = 0 where id = $1",
    [dataObj.id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: {
            msg: "Registro completo",
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: {
            msg: err,
          },
        });
      }
    }
  );
};
