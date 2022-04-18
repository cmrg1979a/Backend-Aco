import { Request, response, Response } from "express";
import { convertToObject } from "typescript";
import { connect } from "../routes/database";

export const setSPaymentPro = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  let number;
  await conn.query(
    "INSERT INTO Table_SPaymentPro (id_house, id_proveedor, monto, status) values (?,?,?,?)",
    [dataObj.id_house, dataObj.id_proveedor, dataObj.monto, dataObj.status],
    (err, rows, fields) => {
      if (!err) {
        var datar = JSON.parse(JSON.stringify(rows));
        dataObj.conceptos.map((item: any) => {
          conn.query(
            "INSERT INTO SPaymentPro_Conceptos (id_sPayment, id_egreso, status) values (?,?,?)",
            [datar.insertId, item.id, item.status],
            (err, rows, fields) => {
              if (!err) {
              } else {
                console.log(err);
              }
            }
          );
        });

        conn.query(
          "SELECT max(number) as number FROM Table_SPaymentPro",
          (err, rowss, fields) => {
            if (!err) {
              res.json({
                status: 200,
                statusBol: true,
                data: rows,
                number: rowss,
              });
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};

export const putSPaymentPro = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id } = req.params;
  const { status, fecha_sol } = req.body;

  let fecha_solicitud;
  if (fecha_sol != "") {
    fecha_solicitud = fecha_sol;
  } else {
    fecha_solicitud = "";
  }
  await conn.query(
    "UPDATE Table_SPaymentPro set fecha_sol = ?, status = ? where id = ?",
    [fecha_solicitud, status, id],
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
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

export const getSPaymentPro = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id_house, id_proveedor } = req.params;
  await conn.query(
    "SELECT * FROM view_SPaymentPro where id_house = ? and id_proveedor = ?",
    [id_house, id_proveedor],
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
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

export const getListInvoice = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id_house, id_proveedor } = req.body;
  await conn.query(
    "SELECT * FROM view_listInvoice where id_house = ? and id_proveedor = ?",
    [id_house, id_proveedor],
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
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

export const getListInvoiceExp = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id_house } = req.body;
  await conn.query(
    "SELECT * FROM view_listInvoice where id_house = ? and type_pago = 2",
    [id_house],
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
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

export const delInvoice = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id } = req.params;
  await conn.query(
    "UPDATE Table_Invoice set status = 0 where id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
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

export const delDebsClient = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id } = req.params;
  await conn.query(
    "UPDATE Table_DebsClient set status = 0 where id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
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

export const getRequestPayment = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_requestPayment where status <> 0 and status <> 1 ",
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
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

export const getRequestPaymentConceptos = async (
  req: Request,
  res: Response
) => {
  const conn = await connect();

  const { id } = req.params;
  await conn.query(
    "SELECT * FROM view_sPaymentProConceptos where id_sPayment = ? ",
    [id],
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
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

export const getDebsToPayAdmin = async (req: Request, res: Response) => {
  const conn = await connect();

  conn.query(
    `
      SELECT 
      vli.*, 
      sum(vli.total) as total_deuda, 
      if(SUM(monto_pago) IS NULL,0,SUM(monto_pago) ) AS total_pagado,
      sum(vli.total) - if(SUM(monto_pago) IS NULL,0,SUM(monto_pago) )  AS pendiente_pago
      FROM view_listInvoiceAdmin vli where vli.status = 1 group by vli.id_proveedor;
    `,
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              `SELECT vli.* FROM view_listInvoiceAdmin vli where vli.id_proveedor = ${item.id_proveedor} and vli.status = 1 `,
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));
                dataServiceList.sort((a: any, b: any) => {
                  if (a.fecha_disponibilidad < b.fecha_disponibilidad) {
                    return -1;
                  }
                  if (a.fecha_disponibilidad > b.fecha_disponibilidad) {
                    return 1;
                  }
                  return 0;
                });
                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  id: item.id,
                  type_payment: item.type_payment,
                  id_expediente: item.id_expediente,
                  id_proveedor: item.id_proveedor,
                  fecha: item.fecha,
                  id_path: item.id_path,
                  nro_factura: item.nro_factura,
                  nro_serie: item.nro_serie,
                  id_coins: item.id_coins,
                  monto: item.monto,
                  type_igv: item.type_igv,
                  igv: item.igv,
                  total: item.total,
                  status: item.status,
                  created_at: item.created_at,
                  updated_at: item.updated_at,
                  paymentName: item.paymentName,
                  total_pagado: item.total_pagado,
                  pendiente_pago: item.pendiente_pago,
                  nro_master: item.nro_master,
                  nameConsigner: item.nameConsigner,
                  nameCoins: item.nameCoins,
                  total_deuda: item.total_deuda,
                  details: dataTes[0],
                });
                req.app.locals.itemsdpa.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsdpa = [];
          resolver();
          console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsdpa,
            });
            conn.end();
          }, 3000);
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getDebsToPay = async (req: Request, res: Response) => {
  const conn = await connect();

  conn.query(
    `select * from view_reportDebsToPay where restante_pagar > 0 and pagado = 0`,
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              `SELECT cpt.*,
              IF (cpt.ajusteflag =1,0,SUM(cpt.total)) AS total_pagar, 
              (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND  cpp.pagado = 1 AND cpp.llegada LIKE '%%') AS total_pagado,
              (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND  cpp.llegada LIKE '1') AS total_pagar_llegada,
              (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND  cpp.pagado = 1 AND cpp.llegada LIKE '1') AS total_pagado_llegada,
              (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.llegada LIKE '0') AS total_pagar_no_llegada,
              (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '0') AS total_pagado_no_llegada,
              (IF (cpt.ajusteflag =1,0,SUM(cpt.total))  - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '%%')) AS restante_pagar,
              ((SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.llegada LIKE '1') - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp 
              WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '1')) AS restante_llegada,
              ((SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.llegada LIKE '0') - (SELECT if(SUM(total) IS NULL,0,
              SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '0')) AS restante_no_llegada
              FROM view_cppro_totales cpt WHERE cpt.llegada LIKE '%%' and cpt.id_proveedor = ${item.id_proveedor} and cpt.pagado =0
              GROUP BY cpt.id_proveedor, cpt.id_house order by total_pagar desc`,
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));
                dataServiceList.sort((a: any, b: any) => {
                  if (a.fecha_disponibilidad < b.fecha_disponibilidad) {
                    return -1;
                  }
                  if (a.fecha_disponibilidad > b.fecha_disponibilidad) {
                    return 1;
                  }
                  return 0;
                });
                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  id_house: item.id_house,
                  nro_master: item.nro_master,
                  id_control: item.id_control,
                  id_user: item.id_user,
                  fecha_disponibilidad: item.fecha_disponibilidad,
                  llegada: item.llegada,
                  nameConsigner: item.nameConsigner,
                  id_orders: item.id_orders,
                  id: item.id,
                  id_proveedor: item.id_proveedor,
                  nameProveedor: item.nameProveedor,
                  total: item.total,
                  total_src: item.total_src,
                  pagado: item.pagado,
                  fecha_pago: item.fecha_pago,
                  id_comprobante: item.id_comprobante,
                  status: item.status,
                  total_pagar: item.total_pagar,
                  total_pagado: item.total_pagado,
                  total_pagar_llegada: item.total_pagar_llegada,
                  total_pagado_llegada: item.total_pagado_llegada,
                  total_pagar_no_llegada: item.total_pagar_no_llegada,
                  total_pagado_no_llegada: item.total_pagado_no_llegada,
                  restante_pagar: item.restante_pagar,
                  restante_llegada: item.restante_llegada,
                  restante_no_llegada: item.restante_no_llegada,
                  details: dataTes[0],
                });
                req.app.locals.itemsdp.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsdp = [];
          resolver();
          console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsdp,
            });
            conn.end();
          }, 30000);
        });
      } else {
        console.log(err);
      }
    }
  );

  /*  await conn.query(
    `SELECT cpt.*, SUM(cpt.total) AS total_pagar, 
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '%%') AS total_pagado,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.llegada LIKE '1') AS total_pagar_llegada,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '1') AS total_pagado_llegada,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.llegada LIKE '0') AS total_pagar_no_llegada,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '0') AS total_pagado_no_llegada,
(SUM(cpt.total) - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '%%')) AS restante_pagar,
((SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.llegada LIKE '1') - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp 
WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '1')) AS restante_llegada,
((SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.llegada LIKE '0') - (SELECT if(SUM(total) IS NULL,0,
SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor AND cpp.pagado = 1 AND cpp.llegada LIKE '0')) AS restante_no_llegada
FROM view_cppro_totales cpt WHERE cpt.llegada LIKE '%%'
GROUP BY cpt.id_proveedor order by total_pagar desc`,
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
  ); */
};

export const getDebsToPayFilter = async (req: Request, res: Response) => {
  const conn = await connect();

  const { date_begin, date_end } = req.body;
  let query;

  query = `
      SELECT cpt.*, SUM(cpt.total) AS total_pagar, 
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '%%') AS total_pagado,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.llegada LIKE '1') AS total_pagar_llegada,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '1') AS total_pagado_llegada,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.llegada LIKE '0') AS total_pagar_no_llegada,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '0') AS total_pagado_no_llegada,
(SUM(cpt.total) - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '%%')) AS restante_pagar,
((SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.llegada LIKE '1') - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '1')) AS restante_llegada,
((SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.llegada LIKE '0') - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '0')) AS restante_no_llegada
FROM view_cppro_totales cpt WHERE cpt.fecha_disponibilidad >= '${date_begin}' AND cpt.fecha_disponibilidad <= '${date_end}' AND cpt.llegada LIKE '%%'
GROUP BY cpt.id_proveedor order by total_pagar desc
      `;

  conn.query(query, (err, rows, fields) => {
    if (!err) {
      let datanew = JSON.parse(JSON.stringify(rows));
      let dataServiceList;
      new Promise<void>((resolver, rechazar) => {
        datanew.map((item: any) => {
          conn.query(
            `
      SELECT cpt.*, SUM(cpt.total) AS total_pagar, 
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '%%') AS total_pagado,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.llegada LIKE '1') AS total_pagar_llegada,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '1') AS total_pagado_llegada,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.llegada LIKE '0') AS total_pagar_no_llegada,
(SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '0') AS total_pagado_no_llegada,
(SUM(cpt.total) - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '%%')) AS restante_pagar,
((SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.llegada LIKE '1') - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '1')) AS restante_llegada,
((SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.llegada LIKE '0') - (SELECT if(SUM(total) IS NULL,0,SUM(total)) FROM view_cppro_totales cpp WHERE  cpp.id_proveedor = cpt.id_proveedor and cpp.fecha_disponibilidad >= '${date_begin}' 
AND cpp.fecha_disponibilidad <= '${date_end}' AND cpp.pagado = 1 AND cpp.llegada LIKE '0')) AS restante_no_llegada
FROM view_cppro_totales cpt WHERE cpt.fecha_disponibilidad >= '${date_begin}' AND cpt.fecha_disponibilidad <= '${date_end}' AND cpt.llegada LIKE '%%' and cpt.id_proveedor = ${item.id_proveedor}
GROUP BY cpt.id_proveedor, cpt.id_house order by total_pagar desc
      `,
            (err, rows, fields) => {
              dataServiceList = JSON.parse(JSON.stringify(rows));
              dataServiceList.sort((a: any, b: any) => {
                if (a.fecha_disponibilidad < b.fecha_disponibilidad) {
                  return -1;
                }
                if (a.fecha_disponibilidad > b.fecha_disponibilidad) {
                  return 1;
                }
                return 0;
              });
              let dataTes = [];
              let dataPre = [];
              dataTes.push(dataServiceList);
              dataPre.push({
                id_house: item.id_house,
                nro_master: item.nro_master,
                id_control: item.id_control,
                id_user: item.id_user,
                fecha_disponibilidad: item.fecha_disponibilidad,
                llegada: item.llegada,
                nameConsigner: item.nameConsigner,
                id_orders: item.id_orders,
                id: item.id,
                id_proveedor: item.id_proveedor,
                nameProveedor: item.nameProveedor,
                total: item.total,
                total_src: item.total_src,
                pagado: item.pagado,
                fecha_pago: item.fecha_pago,
                id_comprobante: item.id_comprobante,
                status: item.status,
                total_pagar: item.total_pagar,
                total_pagado: item.total_pagado,
                total_pagar_llegada: item.total_pagar_llegada,
                total_pagado_llegada: item.total_pagado_llegada,
                total_pagar_no_llegada: item.total_pagar_no_llegada,
                total_pagado_no_llegada: item.total_pagado_no_llegada,
                restante_pagar: item.restante_pagar,
                restante_llegada: item.restante_llegada,
                restante_no_llegada: item.restante_no_llegada,
                details: dataTes[0],
              });
              req.app.locals.itemsService.push(dataPre[0]);
            }
          );
        });
        req.app.locals.itemsService = [];
        resolver();
        console.log(resolver);
      }).then(() => {
        setTimeout(() => {
          res.json({
            status: 200,
            statusBol: true,
            data: req.app.locals.itemsService,
          });
          conn.end();
        }, 30000);
      });
    } else {
      console.log(err);
    }
  });

  /* await conn.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({
        status: 200,
        statusBol: true,
        data: rows,
      });
    } else {
      console.log(err);
    }
  }); */
};

export const getReportAccounts = async (req: Request, res: Response) => {
  const conn = await connect();

  conn.query(
    `SELECT * FROM view_reportAccounts vra where vra.restante_pagar > 0  order by vra.id_consigner ASC`,
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;

        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              `SELECT vc.*, (SUM(vc.total)) AS total_pagar, ((if(vt.total_abonado IS NULL, 0, vt.total_abonado))) AS total_abonado,
              ((SUM(vc.total) - (if(vt.total_abonado IS NULL, 0, vt.total_abonado)))) AS restante_pagar,
              IF((SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 1 AND vcc.id_consigner = vc.id_consigner GROUP BY vcc.id_consigner ) 
              IS NULL, 0, (SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 1 AND vcc.id_consigner = vc.id_consigner GROUP BY vcc.id_consigner ))
              AS total_pagar_llegada,
              IF((SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 0 AND vcc.id_consigner = vc.id_consigner GROUP BY vcc.id_consigner ) 
              IS NULL, 0, (SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 0 AND vcc.id_consigner = vc.id_consigner GROUP BY vcc.id_consigner ))
              AS total_pagar_no_llegada
              FROM view_cxc_totales vc 
              LEFT OUTER JOIN view_tAbonado vt
              ON vc.id_house = vt.id_house
              where vc.id_consigner = ${item.id_consigner}
              GROUP BY vc.id_consigner, vc.id_house
              `,
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));

                dataServiceList.sort((a: any, b: any) => {
                  if (a.fecha_disponibilidad < b.fecha_disponibilidad) {
                    return -1;
                  }
                  if (a.fecha_disponibilidad > b.fecha_disponibilidad) {
                    return 1;
                  }
                  return 0;
                });
                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  id: item.id,
                  id_orders: item.id_orders,
                  concepto: item.concepto,
                  monto_pr: item.monto_pr,
                  fecha_disponibilidad: item.fecha_disponibilidad,
                  llegada: item.llegada,
                  monto_op: item.monto_op,
                  igv_pr: item.igv_pr,
                  igv_op: item.igv_op,
                  total_pr: item.total_pr,
                  total_op: item.total_op,
                  pagado: item.pagado,
                  fecha_pago: item.fecha_pago,
                  id_comprobante: item.id_comprobante,
                  tipo_pago: item.tipo_pago,
                  numero: item.numero,
                  fecha: item.fecha,
                  status: item.status,
                  id_user: item.id_user,
                  total: item.total,
                  id_control: item.id_control,
                  id_house: item.id_house,
                  nro_control: item.nro_control,
                  code_control: item.code_control,
                  nro_master: item.nro_master,
                  nameConsigner: item.nameConsigner,
                  id_master: item.id_master,
                  nro_house: item.nro_house,
                  id_consigner: item.id_consigner,
                  total_pagar: item.total_pagar,
                  total_abonado: item.total_abonado,
                  restante_pagar: item.restante_pagar,
                  total_pagar_llegada: item.total_pagar_llegada,
                  total_pagar_no_llegada: item.total_pagar_no_llegada,
                  details: dataTes[0],
                });
                req.app.locals.itemsdeb.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsdeb = [];
          resolver();
          // console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsdeb,
            });
            conn.end();
          }, 30000);
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getReportAccountsFilter = async (req: Request, res: Response) => {
  const conn = await connect();

  const { date_begin, date_end } = req.body;

  conn.query(
    `SELECT vc.*, (SUM(vc.total)) AS total_pagar, ((if(vt.total_abonado IS NULL, 0, vt.total_abonado))) AS total_abonado,
((SUM(vc.total) - (if(vt.total_abonado IS NULL, 0, vt.total_abonado)))) AS restante_pagar,
IF((SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 1 AND vcc.id_consigner = vc.id_consigner 
AND vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}' GROUP BY vcc.id_consigner ) 
IS NULL, 0, (SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 1 AND vcc.id_consigner = vc.id_consigner 
AND vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}' GROUP BY vcc.id_consigner ))
AS total_pagar_llegada,
IF((SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 0 AND vcc.id_consigner = vc.id_consigner 
AND vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}' GROUP BY vcc.id_consigner ) 
IS NULL, 0, (SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 0 AND vcc.id_consigner = vc.id_consigner 
AND vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}' GROUP BY vcc.id_consigner ))
AS total_pagar_no_llegada
FROM view_cxc_totales vc 
LEFT OUTER JOIN view_tAbonado vt
ON vc.id_house = vt.id_house
WHERE vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}'
GROUP BY vc.id_consigner
`,
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              `SELECT vc.*, (SUM(vc.total)) AS total_pagar, ((if(vt.total_abonado IS NULL, 0, vt.total_abonado))) AS total_abonado,
((SUM(vc.total) - (if(vt.total_abonado IS NULL, 0, vt.total_abonado)))) AS restante_pagar,
IF((SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 1 AND vcc.id_consigner = vc.id_consigner 
AND vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}' GROUP BY vcc.id_consigner ) 
IS NULL, 0, (SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 1 AND vcc.id_consigner = vc.id_consigner 
AND vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}' GROUP BY vcc.id_consigner ))
AS total_pagar_llegada,
IF((SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 0 AND vcc.id_consigner = vc.id_consigner 
AND vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}' GROUP BY vcc.id_consigner ) 
IS NULL, 0, (SELECT (SUM(vcc.total)) AS total_pagar_llegada FROM view_cxc_totales vcc WHERE vcc.llegada = 0 AND vcc.id_consigner = vc.id_consigner 
AND vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}' GROUP BY vcc.id_consigner ))
AS total_pagar_no_llegada
FROM view_cxc_totales vc 
LEFT OUTER JOIN view_tAbonado vt
ON vc.id_house = vt.id_house
WHERE vc.fecha_disponibilidad >= '${date_begin}' AND vc.fecha_disponibilidad <= '${date_end}' and vc.id_consigner = ${item.id_consigner}
GROUP BY vc.id_consigner, vc.id_house
`,
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));
                dataServiceList.sort((a: any, b: any) => {
                  if (a.fecha_disponibilidad < b.fecha_disponibilidad) {
                    return -1;
                  }
                  if (a.fecha_disponibilidad > b.fecha_disponibilidad) {
                    return 1;
                  }
                  return 0;
                });
                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  id: item.id,
                  id_orders: item.id_orders,
                  concepto: item.concepto,
                  monto_pr: item.monto_pr,
                  fecha_disponibilidad: item.fecha_disponibilidad,
                  llegada: item.llegada,
                  monto_op: item.monto_op,
                  igv_pr: item.igv_pr,
                  igv_op: item.igv_op,
                  total_pr: item.total_pr,
                  total_op: item.total_op,
                  pagado: item.pagado,
                  fecha_pago: item.fecha_pago,
                  id_comprobante: item.id_comprobante,
                  tipo_pago: item.tipo_pago,
                  numero: item.numero,
                  fecha: item.fecha,
                  status: item.status,
                  id_user: item.id_user,
                  total: item.total,
                  id_control: item.id_control,
                  id_house: item.id_house,
                  nro_control: item.nro_control,
                  code_control: item.code_control,
                  nro_master: item.nro_master,
                  nameConsigner: item.nameConsigner,
                  id_master: item.id_master,
                  nro_house: item.nro_house,
                  id_consigner: item.id_consigner,
                  total_pagar: item.total_pagar,
                  total_abonado: item.total_abonado,
                  restante_pagar: item.restante_pagar,
                  total_pagar_llegada: item.total_pagar_llegada,
                  total_pagar_no_llegada: item.total_pagar_no_llegada,
                  details: dataTes[0],
                });
                req.app.locals.itemsService.push(dataPre[0]);
              }
            );
          });

          resolver();
          console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsService,
            });
            conn.end();
          }, 30000);
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getAccountsReceivable = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query("SELECT * FROM view_cxc ", (err, rows, fields) => {
    if (!err) {
      res.json({
        status: 200,
        statusBol: true,
        data: rows,
      });
    } else {
      console.log(err);
    }
  });
};

export const getDebsClient = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_house } = req.params;
  await conn.query(
    "SELECT * FROM view_debsClient where id_house = ? ",
    [id_house],
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

export const getDebsClientList = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_house } = req.params;
  await conn.query(
    "SELECT * FROM view_debsClient ",
    [id_house],
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

export const setSPaymentConceptos = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  dataObj.conceptos.map((item: any) => {
    conn.query(
      "INSERT INTO Table_SPaymentPro (id_sPayment, id_egreso, status) values (?,?,?)",
      [dataObj.id_sPayment, item.id_egreso, item.status],
      (err, rows, fields) => {
        if (!err) {
        } else {
          console.log(err);
        }
        conn.end();
      }
    );
  });
  res.json({
    status: 200,
    statusBol: true,
    data: {
      msg: "Registro completo",
    },
  });
};

export const setSPaymentFile = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  conn.query(
    "INSERT INTO Table_PaymentFile (fecha_operacion, nro_operacion, id_banks, id_coins, monto, id_path, status, id_request) values (?,?,?,?,?,?,?,?)",
    [
      dataObj.fecha_operacion,
      dataObj.nro_operacion,
      dataObj.id_banks,
      dataObj.id_coins,
      dataObj.monto,
      dataObj.id_path,
      dataObj.status,
      dataObj.id_request,
    ],
    (err, rows, fields) => {
      if (!err) {
        var datar = JSON.parse(JSON.stringify(rows));
        conn.query(
          "UPDATE Table_SPaymentPro set status = ? where id = ?",
          [3, dataObj.id_request],
          (err, rowss, fields) => {
            if (!err) {
            } else {
              console.log(err);
            }
          }
        );
        dataObj.itemsSPaymentConceptos.map((item: any) => {
          conn.query(
            "UPDATE ControlGastos_Egresos set pagado = ?, fecha_pago = ?, id_comprobante = ? where id = ?",
            [1, dataObj.fecha_operacion, datar.insertId, item.id_egreso],
            (err, rowss, fields) => {
              if (!err) {
              } else {
                console.log(err);
              }
            }
          );
        });
      } else {
        console.log(err);
      }
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );

  res.json({
    status: 200,
    statusBol: true,
    data: {
      msg: "Registro completo",
    },
  });
};

export const setInvoice = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  conn.query(
    "INSERT INTO Table_Invoice (id_house, id_proveedor, id_path, type_pago, number, date, status) values (?,?,?,?,?,?,?)",
    [
      dataObj.id_house,
      dataObj.id_proveedor,
      dataObj.id_path,
      dataObj.type_pago,
      dataObj.number,
      dataObj.date,
      dataObj.status,
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
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};

export const setDebsClient = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  conn.query(
    "INSERT INTO Table_DebsClient (id_house, date, number, id_banks, id_coins, monto, comentario_usuario, id_path, status) values (?,?,?,?,?,?,?,?,?)",
    [
      dataObj.id_house,
      dataObj.date,
      dataObj.number,
      dataObj.id_banks,
      dataObj.id_coins,
      dataObj.monto,
      dataObj.comentario_usuario,
      dataObj.id_path,
      dataObj.status,
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
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};

export const setCheckDebsClient = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  conn.query(
    "UPDATE Table_DebsClient set comentario_admin = ?, status_comision = ?, comision = ?, status = ? where id = ?",
    [
      dataObj.comentario_admin,
      dataObj.checkComision,
      dataObj.comision,
      dataObj.status,
      dataObj.id,
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
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};

export const pdfcxp = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();
  const conn = await connect();
  const {
    itemsCpp,
    total_pagar,
    total_pagado,
    total_restante,
    total_pagar_llegada,
    total_pagado_llegada,
    total_restante_llegada,
    total_pagar_no_llegada,
    total_pagado_no_llegada,
    total_restante_no_llegada,
    fecha,
    dateRange,
    status,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-cxp.ejs"),
    {
      itemsCpp,
      total_pagar,
      total_pagado,
      total_restante,
      total_pagar_llegada,
      total_pagado_llegada,
      total_restante_llegada,
      total_pagar_no_llegada,
      total_pagado_no_llegada,
      total_restante_no_llegada,
      fecha,
      dateRange,
      status,
    },
    (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          page_size: "A4",
          orientation: "landscape",
          header: {
            height: "15mm",
          },
          footer: {
            height: "15mm",
          },
        };

        pdf
          .create(data, options)
          .toFile(
            "files/REPORTE_DE_CUENTAS_POR_PAGAR_FECHA_" + fecha + ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download(
                  "/REPORTE_DE_CUENTAS_POR_PAGAR_FECHA_" + fecha + ".pdf"
                );
                res.send({
                  msg: "File created successfully",
                  path: path.join(
                    "/REPORTE_DE_CUENTAS_POR_PAGAR_FECHA_" + fecha + ".pdf"
                  ),
                });
              }
            }
          );
      }
      conn.end();
    }
  );
};

export const pdfcxc = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();
  const conn = await connect();
  const {
    itemsCpp,
    total_pagar,
    total_pagado,
    total_restante,
    total_pagar_llegada,
    total_pagado_llegada,
    total_restante_llegada,
    total_pagar_no_llegada,
    total_pagado_no_llegada,
    total_restante_no_llegada,
    fecha,
    dateRange,
    status,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-cxc.ejs"),
    {
      itemsCpp,
      total_pagar,
      total_pagado,
      total_restante,
      total_pagar_llegada,
      total_pagado_llegada,
      total_restante_llegada,
      total_pagar_no_llegada,
      total_pagado_no_llegada,
      total_restante_no_llegada,
      fecha,
      dateRange,
      status,
    },
    (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          page_size: "A4",
          orientation: "landscape",
          header: {
            height: "15mm",
          },
          footer: {
            height: "15mm",
          },
        };

        pdf
          .create(data, options)
          .toFile(
            "files/REPORTE_DE_CUENTAS_POR_COBRAR_FECHA_" + fecha + ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download(
                  "/REPORTE_DE_CUENTAS_POR_COBRAR_FECHA_" + fecha + ".pdf"
                );
                res.send({
                  msg: "File created successfully",
                  path: path.join(
                    "/REPORTE_DE_CUENTAS_POR_COBRAR_FECHA_" + fecha + ".pdf"
                  ),
                });
              }
            }
          );
      }
    }
  );
};

export const pdfcxpD = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();
  const conn = await connect();
  const {
    itemsCpp,
    total_pagar,
    total_pagado,
    total_restante,
    total_pagar_llegada,
    total_pagado_llegada,
    total_restante_llegada,
    total_pagar_no_llegada,
    total_pagado_no_llegada,
    total_restante_no_llegada,
    fecha,
    dateRange,
    status,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-cxpD.ejs"),
    {
      itemsCpp,
      total_pagar,
      total_pagado,
      total_restante,
      total_pagar_llegada,
      total_pagado_llegada,
      total_restante_llegada,
      total_pagar_no_llegada,
      total_pagado_no_llegada,
      total_restante_no_llegada,
      fecha,
      dateRange,
      status,
    },
    (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          page_size: "A4",
          orientation: "landscape",
          header: {
            height: "15mm",
          },
          footer: {
            height: "15mm",
          },
        };

        pdf
          .create(data, options)
          .toFile(
            "files/REPORTE_DETALLADO_DE_CUENTAS_POR_PAGAR_FECHA_" +
              fecha +
              ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download(
                  "/REPORTE_DETALLADO_DE_CUENTAS_POR_PAGAR_FECHA_" +
                    fecha +
                    ".pdf"
                );
                res.send({
                  msg: "File created successfully",
                  path: path.join(
                    "/REPORTE_DETALLADO_DE_CUENTAS_POR_PAGAR_FECHA_" +
                      fecha +
                      ".pdf"
                  ),
                });
              }
            }
          );
      }
      conn.end();
    }
  );
};

export const pdfcxcD = async (req: Request, res: Response) => {
  let ejs = require("ejs");
  let pdf = require("html-pdf");
  let path = require("path");
  const fechaYHora = new Date();
  const conn = await connect();
  const {
    itemsCpp,
    total_pagar,
    total_pagado,
    total_restante,
    total_pagar_llegada,
    total_pagado_llegada,
    total_restante_llegada,
    total_pagar_no_llegada,
    total_pagado_no_llegada,
    total_restante_no_llegada,
    fecha,
    dateRange,
    status,
  } = req.body;

  ejs.renderFile(
    path.join(__dirname, "../views/", "pdf-cxcD.ejs"),
    {
      itemsCpp,
      total_pagar,
      total_pagado,
      total_restante,
      total_pagar_llegada,
      total_pagado_llegada,
      total_restante_llegada,
      total_pagar_no_llegada,
      total_pagado_no_llegada,
      total_restante_no_llegada,
      fecha,
      dateRange,
      status,
    },
    (err: any, data: any) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          page_size: "A4",
          orientation: "landscape",
          header: {
            height: "15mm",
          },
          footer: {
            height: "15mm",
          },
        };

        pdf
          .create(data, options)
          .toFile(
            "files/REPORTE_DETALLADO_DE_CUENTAS_POR_COBRAR_FECHA_" +
              fecha +
              ".pdf",
            function (err: any, data: any) {
              if (err) {
                res.send(err);
              } else {
                res.download(
                  "/REPORTE_DETALLADO_DE_CUENTAS_POR_COBRAR_FECHA_" +
                    fecha +
                    ".pdf"
                );
                res.send({
                  msg: "File created successfully",
                  path: path.join(
                    "/REPORTE_DETALLADO_DE_CUENTAS_POR_COBRAR_FECHA_" +
                      fecha +
                      ".pdf"
                  ),
                });
              }
            }
          );
      }
      conn.end();
    }
  );
};
