import { Request, Response } from "express";
import { connect } from "../routes/database";

export const setInvoiceAdmin = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;
  const dataDetails = req.body.detalle;

  conn.query(
    "INSERT INTO Table_InvoiceAdmin (type_payment, id_expediente, id_proveedor, fecha, nro_factura, nro_serie, id_coins, monto, type_igv, igv, status, id_path,id_proformance,id_month,id_year) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
      // dataObj.total,
      dataObj.status,
      dataObj.id_path,
      dataObj.id_proformance,
      dataObj.id_month,
      dataObj.id_year,
    ],
    (err, rows, fields) => {
      if (!err) {
        var data = JSON.parse(JSON.stringify(rows));
        dataDetails.map((item: any) => {
          conn.query(
            "INSERT INTO 	table_DetailsInvoiceAdmin(id_invoice,concepto,monto,igv,total,afecto,status) VALUES (?,?,?,?,?,?,?)",
            [
              data.insertId,
              item.concepto,
              item.monto,
              item.total - item.monto,
              item.total,
              item.afecto == "true" ? 1 : 0,
              1,
            ],
            (err, rowss, fields) => {
              if (!err) {
              } else {
                console.log(err);
              }
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
      setTimeout(() => {
        conn.end();
      }, 6000);
    }
  );
};

export const putPro = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  conn.query(
    "UPDATE Table_Invoice SET type_pago = 1, id_path = ? where id = ?",
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
      conn.end();
    }
  );
};

export const paymentInvoiceAdmin = async (req: Request, res: Response) => {
  const conn = await connect();

  const id = req.params.id;
  const dataObj = req.body;

  conn.query(
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
      conn.end();
    }
  );
};

export const getInvoiceAdmin = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_listInvoiceAdmin where status <> 0",

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

export const delPro = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;

  conn.query(
    "UPDATE Table_InvoiceAdmin SET status = 0 where id = ?",
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
            msg: "Registro no aceptado",
          },
        });
      }
      conn.end();
    }
  );
};

export const getRegularizar = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_regularizarPro where pagado = 1 ",

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

export const getVerInvoiceAdmin = async (req: Request, res: Response) => {
  const conn = await connect();
  let objData = req.params;
  conn.query(
    `SELECT * FROM (SELECT @pid:=${objData.id}) alias, view_InvoiceAdminVer;`,
    (err, rows, field) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        conn.query(
          `SELECT * FROM (SELECT @pid:=${objData.id}) alias,view_InvoiceAdminDetailsVer;`,
          (err, rowss, fields) => {
            datanew.push({ details: rowss });
            setTimeout(function () {
              res.json({
                status: 200,
                statusBol: true,
                data: datanew,
              });
              conn.end();
            }, 800);
          }
        );
      } else {
        console.log(err);
      }
    }
  );
};

export const setUpdateInvoiceAdmin = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;
  const dataDetails = req.body.detalle;
  /*
 
*/
  conn.query(
    ` update Table_InvoiceAdmin 
      SET
      id_proveedor=${dataObj.id_proveedor},
      fecha='${dataObj.fecha}',
      nro_factura='${dataObj.nro_factura}',
      nro_serie='${dataObj.nro_serie}',
      id_coins=${dataObj.id_coins},
      monto=${dataObj.monto},
      status=${dataObj.status},
      id_proformance=${dataObj.id_proformance},
      id_month=${dataObj.id_month},
      id_year=${dataObj.id_year},
      updated_at = now()
      WHERE id = ${dataObj.id};
    `,
    (err, rows, fields) => {
      if (!err) {
        var data = JSON.parse(JSON.stringify(rows));
        dataDetails.forEach((element) => {
          if (element.id) {
            ` 
              UDPATE table_DetailsInvoiceAdmin
              set 
              concepto= ${element.concepto},
              monto= ${element.monto},
              igv= ${element.total - element.monto},
              total= ${element.total},
              afecto= ${element.afecto},
              status  = ${element.afecto},
              updated_at = now()
              where id = ${element.id}
            `;
          } else {
            console.log("llego");

            conn.query(
              "INSERT INTO table_DetailsInvoiceAdmin(id_invoice,concepto,monto,igv,total,afecto,status) VALUES (?,?,?,?,?,?,?)",
              [
                dataObj.id,
                element.concepto,
                element.monto,
                element.total - element.monto,
                element.total,
                element.afecto == "true" || 1 ? 1 : 0,
                1,
              ],
              (err, rowss, fields) => {
                if (!err) {
                } else {
                  console.log(err);
                }
              }
            );
          }
        });

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
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};

// CxC
export const getInvoiceAdminCxC = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_listInvoiceAdminCxC where status <> 0",

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

export const setInvoiceAdminCxC = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;
  const dataDetails = req.body.detalle;

  conn.query(
    "INSERT INTO Table_InvoiceAdminCxC (type_payment, id_expediente, id_cliente, fecha, nro_factura, nro_serie, id_coins, monto, type_igv, igv, status, id_path,id_proformance,id_month,id_year) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      dataObj.type_payment,
      dataObj.id_expediente,
      dataObj.id_cliente,
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
    ],
    (err, rows, fields) => {
      if (!err) {
        var data = JSON.parse(JSON.stringify(rows));
        dataDetails.map((item: any) => {
          conn.query(
            "INSERT INTO 	table_DetailsInvoiceAdminCxC(id_invoice,concepto,monto,igv,total,afecto,status) VALUES (?,?,?,?,?,?,?)",
            [
              data.insertId,
              item.concepto,
              item.monto,
              item.total - item.monto,
              item.total,
              item.afecto == "true" ? 1 : 0,
              1,
            ],
            (err, rowss, fields) => {
              if (!err) {
              } else {
                console.log(err);
              }
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
      setTimeout(() => {
        conn.end();
      }, 6000);
    }
  );
};


export const getVerInvoiceAdminCxC = async (req: Request, res: Response) => {
  const conn = await connect();
  let objData = req.params;
  conn.query(
    `SELECT * FROM (SELECT @pid:=${objData.id}) alias, view_InvoiceAdminCxCVer;`,
    (err, rows, field) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        conn.query(
          `SELECT * FROM (SELECT @pid:=${objData.id}) alias,view_InvoiceAdminDetailsCxCVer;`,
          (err, rowss, fields) => {
            datanew.push({ details: rowss });
            setTimeout(function () {
              res.json({
                status: 200,
                statusBol: true,
                data: datanew,
              });
              conn.end();
            }, 800);
          }
        );
      } else {
        console.log(err);
      }
    }
  );
};

export const setUpdateInvoiceAdminCxC = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj = req.body;
  const dataDetails = req.body.detalle;
  conn.query(
    ` update Table_InvoiceAdminCxC 
      SET
      id_cliente=${dataObj.id_cliente},
      fecha='${dataObj.fecha}',
      nro_factura='${dataObj.nro_factura}',
      nro_serie='${dataObj.nro_serie}',
      id_coins=${dataObj.id_coins},
      monto=${dataObj.monto},
      status=${dataObj.status},
      id_proformance=${dataObj.id_proformance},
      id_month=${dataObj.id_month},
      id_year=${dataObj.id_year},
      updated_at = now()
      WHERE id = ${dataObj.id};
    `,
    (err, rows, fields) => {
      if (!err) {
        var data = JSON.parse(JSON.stringify(rows));
        dataDetails.forEach((element) => {
          if (element.id) {
            ` 
              UDPATE table_DetailsInvoiceAdmin
              set 
              concepto= ${element.concepto},
              monto= ${element.monto},
              igv= ${element.total - element.monto},
              total= ${element.total},
              afecto= ${element.afecto},
              status  = ${element.afecto},
              updated_at = now()
              where id = ${element.id}
            `;
          } else {
            console.log("llego");

            conn.query(
              "INSERT INTO table_DetailsInvoiceAdminCxC(id_invoice,concepto,monto,igv,total,afecto,status) VALUES (?,?,?,?,?,?,?)",
              [
                dataObj.id,
                element.concepto,
                element.monto,
                element.total - element.monto,
                element.total,
                element.afecto == "true" || 1 ? 1 : 0,
                1,
              ],
              (err, rowss, fields) => {
                if (!err) {
                } else {
                  console.log(err);
                }
              }
            );
          }
        });

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
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};