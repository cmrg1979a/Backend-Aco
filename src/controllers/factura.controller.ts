import { Request, Response } from "express";
import { factura } from "interface/factura";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";

export const datosFactura = async (req: Request, res: Response) => {
  let id_house = req.params.id_house;
  let id_branch = req.params.id_branch;

  await pool.query(
    "select * from  generar_factura($1,$2);",
    [id_branch, id_house],
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

export const generarFactura = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");

  const fecha = new Date();

  const {
    nombreProforma,
    cliente_nombre,
    cliente_phone,
    cliente_document,
    cliente_address,
    proveedor_nombre,
    proveedor_phone,
    proveedor_address,
    proveedor_document,
    bultos,
    volumen,
    peso,
    puerto,
    pais,
    details,
    total_monto,
    total_igv,
    total,
    code_master,
    factura,
    branch_nombre,
    branch_address,
    branch_phone,
    branch_documento,
    tipo_emisor,
    cuenta_descripcion,
    cuenta_beneficiario,
    cuenta_numero,
    cuenta_cci,
    cuenta_tienecci,
    tipo_imp,
    coins,
    url_logo,
  } = req.body;

  let fechaActual = `${fecha.getUTCDay()}_${fecha.getMonth()}_${fecha.getFullYear()}_${fecha.getTime()}`;
  let fechaRegistro = fecha.toLocaleDateString();

  ejs.renderFile(
    path.join(__dirname, "../views", "pdf-factura.ejs"),
    {
      nombreProforma,
      cliente_nombre,
      cliente_phone,
      cliente_document,
      cliente_address,
      proveedor_nombre,
      proveedor_phone,
      proveedor_address,
      proveedor_document,
      bultos,
      volumen,
      peso,
      puerto,
      pais,
      total_monto,
      total_igv,
      total,
      details,
      fechaRegistro,
      code_master,
      factura,
      branch_nombre,
      branch_address,
      branch_phone,
      branch_documento,
      tipo_emisor,
      cuenta_descripcion,
      cuenta_beneficiario,
      cuenta_numero,
      cuenta_cci,
      cuenta_tienecci,
      tipo_imp,
      coins,
      url_logo,
    },
    (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          page_size: "A4",
          margin: "1mm",
          header: {
            height: "5mm",
          },
          footer: {
            height: "5mm",
          },
        };

        pdf
          .create(data, options)
          .toFile(
            "files/" + nombreProforma + "_" + fechaActual + ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download("/" + nombreProforma + "_" + fechaActual + ".pdf");
                res.send({
                  statusBol: true,
                  msg: "File created successfully",
                  path: path.join(nombreProforma + "_" + fechaActual + ".pdf"),
                  nro_factura: factura,
                });
              }
            }
          );
      }
      //
    }
  );
};

export const registrarFactura = async (req: Request, res: Response) => {
  const datos: factura = req.body;
  const details = req.body.details;

  await pool.query(
    "SELECT * FROM table_Factura_insertar($1,$2,$3,$4,$5,$6,$7,1,$8,$9,$10,$11,$12)",
    [
      datos.id_house,
      datos.nro_factura,
      datos.url_documento,
      datos.estatus,
      datos.total_monto,
      datos.total_igv,
      datos.total,
      details.map((element) => {
        return element.id;
      }),
      details.map((element) => {
        return element.monto_op;
      }),
      details.map((element) => {
        return element.igv_op;
      }),
      details.map((element) => {
        return element.total_op;
      }),
      datos.id_coins,
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

export const listarFactura = async (req: Request, res: Response) => {
  await pool.query(
    " SELECT * FROM table_Factura_listar($1)",
    [req.params.id_branch],
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

export const AnularFacutar = async (req: Request, res: Response) => {
  let id = req.body.id;

  await pool.query(
    " UPDATE table_Factura set estatus = false where id = $1 ",
    [id],
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
    }
  );
};
export const verFacturaHouse = async (req: Request, res: Response) => {
  let id = req.query.id;

  await pool.query(
    " SELECT * FROM function_factura_listadoxhouse($1);",
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
