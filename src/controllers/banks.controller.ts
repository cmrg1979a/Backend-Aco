import { Request, Response } from "express";
import { logging } from "googleapis/build/src/apis/logging";
import { connect } from "../routes/database";

export const getBanksList = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_banksList where status <> 0",
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
      conn.end();
    }
  );
};

export const getListaPagosXProveedorCxP = async (
  req: Request,
  res: Response
) => {
  let id = req.params.id_proveedor;
  const conn = await connect();
  await conn.query(
    `SELECT * FROM (SELECT @pid:=${id}) alias,view_listado_banco_proveedor`,
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
        conn.end();
      } else {
        console.log(err);
        conn.end();
      }
    }
  );
};

export const setPayForProveedor = async (req: Request, res: Response) => {
  const conn = await connect();
  const dataObj = req.body.details;
  const id_path = req.body.id_path;
  const id_cuenta = req.body.id_cuenta;
  dataObj.map((item: any) => {
    conn.query(
      "INSERT INTO detailsPaysInvoiceAdmin (id_invoiceadmin,id_pago,monto,id_cuenta,status) values (?,?,?,?,?)",
      [item.id, id_path, item.max_pagar, id_cuenta, 1],
      (err, rows, fields) => {
        if (!err) {
        } else {
          console.log(err);
        }
      }
    );
  });
  // dataObj.map((item: any) => {
  //   conn.query(
  //     "UPDATE Table_InvoiceAdmin set status = 2 where id = ? and 1 = ?"
  //   ),
  //     [item.id, item.cktotal],
  //     (err, rows, fields) => {
  //       if (!err) {
  //       } else {
  //         console.log(err);
  //       }
  //     };
  // });
  // dataObj.forEach((element) => {
  //   if (element.cktotal == 1) {
  //     conn.query(`
  //     UPDATE Table_InvoiceAdmin set status = 2 where id = ${element.id}
  //     `);
  //   }

  // });
  setTimeout(() => {
    res.json({
      status: 200,
      statusBol: true,
      data: {
        msg: "Registro completo",
      },
    });
    // conn.end();
  }, 600);
};

export const getListBanksDetailsCargar = async (
  req: Request,
  res: Response
) => {
  const conn = await connect();
  conn.query(`SELECT * FROM view_bank_details_cargar;`, (err, rows, fields) => {
    if (!err) {
      res.json({
        status: 200,
        statusBol: true,
        data: rows,
      });
      conn.end();
    } else {
      console.log(err);
      conn.end();
    }
  });
};
export const getListar = async (req: Request, res: Response) => {
  const conn = await connect();
  conn.query(
    `
    SELECT 
      distinct
      ia.id id,
       dia.id_pago as id_pago,
       substring(dia.created_at,1,10) AS fecha,
       substring(dia.created_at,12,17) AS hora,
       CASE when e.tradename IS NULL then e.names when e.tradename = '' then e.names ELSE e.tradename end proveedor,
       ia.monto AS monto,
       b.name banco,
       bd.nrocuenta nrocuenta,
       c.symbol moneda_simbolo,
       c.name moneda
       FROM detailsPaysInvoiceAdmin dia
       INNER JOIN Table_InvoiceAdmin ia ON dia.id_invoiceadmin = ia.id 
       INNER JOIN Table_Entities e ON e.id = ia.id_proveedor
       LEFT JOIN bank_details bd ON dia.id_cuenta = bd.id 
       LEFT JOIN Table_Banks b ON bd.id_bank = b.id
       LEFT JOIN Table_Coins c ON ia.id_coins = c.id
       ORDER BY fecha DESC;
     
  `,
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let details;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any, index) => {
            conn.query(
              ` SELECT 
                hc.code_house expediente,
                CASE when e.tradename IS NULL then e.names when e.tradename = '' then e.names ELSE e.tradename end cliente,
                dia.monto,
                ia.nro_factura factura,
                ia.nro_serie serie,
                c.symbol moneda_simbolo,
                c.name moneda
                FROM Table_InvoiceAdmin ia
                LEFT JOIN Table_Coins c ON ia.id_coins = c.id
                INNER JOIN detailsPaysInvoiceAdmin dia  ON dia.id_invoiceadmin = ia.id 
                LEFT JOIN Table_HouseControl hc ON ia.id_expediente = hc.id
                LEFT JOIN Table_Entities e ON e.id = hc.id_consigner
                WHERE dia.id_pago = ${item.id_pago} `,
              (err, rows, fields) => {
                details = JSON.parse(JSON.stringify(rows));
                let dataTes = [];
                let dataPre = [];
                dataTes.push(details);
                dataPre.push({
                  id: item.id,
                  index: index,
                  id_pago: item.id_pago,
                  fecha: item.fecha,
                  hora: item.hora,
                  proveedor: item.proveedor,
                  monto: item.monto,
                  banco: item.banco,
                  nrocuenta: item.nrocuenta,
                  moneda_simbolo: item.moneda_simbolo,
                  moneda: item.moneda,
                  details: dataTes[0],
                });
                req.app.locals.itemsdp.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsdp = [];
          resolver();
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsdp,
            });
            conn.end();
          }, 7000);
        });

        // conn.end();
      } else {
        console.log(err);
        conn.end();
      }
    }
  );
};
export const getVerPagosPorProveedor = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id } = req.query;
  conn.query(
    `
    SELECT 
		distinct
		bd.id id_bank,
		p.name documento,
		p.path link_documento,
		e.id id_proveedor,
    dia.id_pago as id_pago,
    substring(dia.created_at,1,10) AS fecha,
    CASE when e.tradename IS NULL then e.names when e.tradename = '' then e.names ELSE e.tradename end proveedor,
    b.name banco,
    bd.nrocuenta nrocuenta,
    c.symbol moneda_simbolo,
    dia.id_pago,
    c.name moneda
    FROM detailsPaysInvoiceAdmin dia
    INNER JOIN Table_InvoiceAdmin ia ON dia.id_invoiceadmin = ia.id 
    INNER JOIN Table_Entities e ON e.id = ia.id_proveedor
    LEFT JOIN bank_details bd ON dia.id_cuenta = bd.id 
    LEFT JOIN Table_Banks b ON bd.id_bank = b.id
    LEFT JOIN Table_Coins c ON ia.id_coins = c.id
    LEFT JOIN Table_AllPath p ON dia.id_pago = p.id
    WHERE dia.id_pago = ${id}
    ORDER BY fecha DESC;
     
  `,
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));

        let details;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              ` select e.id AS id_proveedor,
              e.tradename AS tradename_proveedor,
              hc.id AS id_house,
              hc.code_house AS codigo_house,
              ec.id AS id_cliente,
              ec.tradename AS tradename_cliente,
              ap.id AS id_pago,
              ap.name AS descripcion_pago,
              ap.path AS documento_pago,
              ia.id AS id,
              ia.id_expediente AS id_expediente,
              substr(ia.fecha,1,10) AS fecha,
              ia.monto AS monto_pagar,
              (select if((sum(dpiv.monto) is null),0,sum(dpiv.monto)) from detailsPaysInvoiceAdmin dpiv where (dpiv.id_invoiceadmin = ia.id)) AS monto_pagado,(ia.monto - (select if((sum(dpiv.monto) is null),0,sum(dpiv.monto)) from detailsPaysInvoiceAdmin dpiv where (dpiv.id_invoiceadmin = ia.id))) AS monto_deuda,(ia.monto - (select if((sum(dpiv.monto) is null),0,sum(dpiv.monto)) from detailsPaysInvoiceAdmin dpiv where (dpiv.id_invoiceadmin = ia.id))) AS max_pagar,(case when (tsp.status = 3) then 'Pagado' when (tsp.status = 2) then 'Pendiente' else 'Activo' end) AS statusPago,if((tsp.monto is null),0,tsp.monto) AS monto_cobrado_cliente,true AS cktotal from (((((Table_InvoiceAdmin ia left join Table_Entities e on((ia.id_proveedor = e.id))) left join Table_HouseControl hc on((ia.id_expediente = hc.id))) left join Table_Entities ec on((hc.id_consigner = ec.id))) left join Table_AllPath ap on((ia.id_path = ap.id))) left join Table_SPaymentPro tsp on((tsp.id_house = hc.id))) where ( (0 <> ia.status) AND 
              ia.id IN (SELECT pays.id_invoiceadmin FROM detailsPaysInvoiceAdmin pays WHERE pays.id_pago =  ${item.id_pago}))`,
              //
              (err, rows, fields) => {
                details = JSON.parse(JSON.stringify(rows));
                let dataTes = [];
                let dataPre = [];
                dataTes.push(details);
                dataPre.push({
                  id_bank: item.id_bank,
                  documento: item.documento,
                  link_documento: item.link_documento,
                  id_proveedor: item.id_proveedor,
                  id_pago: item.id_pago,
                  fecha: item.fecha,
                  proveedor: item.proveedor,
                  banco: item.banco,
                  nrocuenta: item.nrocuenta,
                  moneda_simbolo: item.moneda_simbolo,
                  moneda: item.moneda,
                  details: dataTes[0],
                });
                req.app.locals.itemsdp.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsdp = [];
          resolver();
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsdp,
            });
            conn.end();
          }, 800);
        });
        // conn.end();
      } else {
        console.log(err);
        conn.end();
      }
    }
  );
};
