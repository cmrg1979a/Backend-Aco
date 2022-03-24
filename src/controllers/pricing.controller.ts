import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postPricing } from "../interface/pricing";
import { DEFAULT_DEPRECATION_REASON } from "graphql";

var idEntitie = "";

export const setQuote = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postPricing = req.body;

  await conn.query("SELECT * FROM view_nroQuote", (err, rowsss, fields) => {
    if (!err) {
      var datanro = JSON.parse(JSON.stringify(rowsss));

      conn.query(
        "INSERT INTO Table_Quote (id_marketing, id_entitie, id_modality, id_shipment, id_incoterms, id_port_begin, id_port_end, nro_bultos, peso, volumen, quote, monto, statusQuote, status, id_vendedor, descripcionMercancia, idProvincia, idDistrito, fullflag, seguro, proveedor, telefonoproveedor, direccionproveedor, date_end, tiempo_transito, ganancia,id_branch,id_pricing) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          dataObj.id_marketing,
          dataObj.id_entitie,
          dataObj.idsentido,
          dataObj.idtipocarga,
          dataObj.idincoterms,
          dataObj.idorigen,
          dataObj.iddestino,
          dataObj.numerobultos,
          dataObj.peso,
          dataObj.volumen,
          datanro[0].nro_quote,
          dataObj.monto,
          dataObj.statusQuote,
          1,
          dataObj.idVendedor,
          dataObj.descripcionMercancia,
          dataObj.idProvincia,
          dataObj.idDistrito,
          dataObj.fullflag,
          dataObj.seguro,
          dataObj.proveedor,
          dataObj.telefonoproveedor,
          dataObj.direccionproveedor,
          dataObj.fecha_fin,
          dataObj.tiempo_transito,
          dataObj.ganancia,
          dataObj.id_branch,
          dataObj.idPricing,
        ],
        (err, rowssss, fields) => {
          if (!err) {
            var dataquote = JSON.parse(JSON.stringify(rowssss));

            dataObj.serviciocotizacion.map((item: any) => {
              conn.query(
                "INSERT INTO Quote_Services (id_quote, id_begend, nameService, codeGroupServices,  status) VALUES (?,?,?,?,?)",
                [
                  dataquote.insertId,
                  item.idBegEnd,
                  item.nameService,
                  item.codeGroupServices,
                  item.statusService,
                ],
                (err, rowsssss, fields) => {
                  if (!err) {
                  } else {
                    console.log(err);
                  }
                }
              );
            });

            if (dataObj.impuestos.length > 0) {
              dataObj.impuestos.map((item: any) => {
                conn.query(
                  "INSERT INTO Quote_Taxes (id_quote, type, name, percentage, valor, orden) VALUES (?,?,?,?,?,?)",
                  [
                    dataquote.insertId,
                    item.type,
                    item.name,
                    item.percentage,
                    item.valor,
                    item.orden,
                  ],
                  (err, rowsssss, fields) => {
                    if (!err) {
                    } else {
                      console.log(err);
                    }
                  }
                );
              });
            }

            dataObj.costocotizacion.map((item: any) => {
              conn.query(
                "INSERT INTO Quote_Cost (id_quote, id_proveedor, id_multiplicador, concepto, costounitario, cif, seguro, subtotal, esorigenflag, eslocalflag, esaduanaflag, esalmacenflag, esopcionflag, esventaflag, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [
                  dataquote.insertId,
                  item.id_proveedor,
                  item.id_multiplicador,
                  item.concepto,
                  item.costounitario,
                  item.cif,
                  item.seguro,
                  item.subtotal,
                  item.esorigenflag,
                  item.eslocalflag,
                  item.esaduanaflag,
                  item.esalmacenflag,
                  item.esopcionflag,
                  item.esventaflag,
                  1,
                ],
                (err, rowsssss, fields) => {
                  if (!err) {
                  } else {
                    console.log(err);
                  }
                }
              );
            });

            dataObj.contenedores.map((item: any) => {
              conn.query(
                "INSERT INTO Quote_Containers (id_quote, id_containers, quantity) VALUES (?,?,?)",
                [dataquote.insertId, item.id_contenedor, item.cantidad],
                (err, rowsssss, fields) => {
                  if (!err) {
                  } else {
                    console.log(err);
                  }
                }
              );
            });

            if (dataObj.ventascasillerodetalles) {
              dataObj.ventascasillerodetalles.map((item: any) => {
                conn.query(
                  "INSERT INTO Quote_SalesDetails (id_quote, id_quoteSales, description, monto, status) VALUES (?,?,?,?,?)",
                  [
                    dataquote.insertId,
                    item.id_quoteSales,
                    item.description,
                    item.monto,
                    item.status,
                  ],
                  (err, rowsssss, fields) => {
                    if (!err) {
                    } else {
                      console.log(err);
                    }
                  }
                );
              });
            }

            dataObj.notacosto.map((item: any) => {
              conn.query(
                "INSERT INTO Quote_NotesCost (id_quote, description, statusPrincipal, statusIncluye, statusNoIncluye, status) VALUES (?,?,?,?,?,?)",
                [
                  dataquote.insertId,
                  item.descripcion,
                  item.esprincipalflag,
                  item.esincluyeflag,
                  item.esnoincluyeflag,
                  item.status,
                ],
                (err, rowsssss, fields) => {
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
              insertId: dataquote.insertId,
              nro_quote: datanro[0].nro_quote,
              msg: "Cotización ingresada con el número " + datanro[0].nro_quote,
            });
          } else {
            console.log(err);
          }
        }
      );
    } else {
      console.log(err);
    }
  });
};

export const getQuoteStatus = async (req: Request, res: Response) => {
  const conn = await connect();
  await conn.query(
    `SELECT * FROM view_QuoteStatus where id_branch = ${
      req.body.id_branch ? req.body.id_branch : "id_branch"
    } `,
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

export const getQuoteList = async (req: Request, res: Response) => {
  const conn = await connect();
  await conn.query(
    `SELECT * FROM view_listQuote where id_branch = ${
      req.body.id_branch ? req.body.id_branch : "id_branch"
    } `,
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

export const getQuoteId = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id } = req.body;
  conn.query(
    "SELECT * FROM view_listQuoteGet where id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;

        conn.query(
          "SELECT * FROM view_QuoteServices where id_quote = ?",
          [id],
          (err, rowss, fields) => {
            datanew.push({
              servicios: rowss,
            });
          }
        );

        conn.query(
          "SELECT * FROM view_QuoteContainers where id_quote = ?",
          [id],
          (err, rowssss, fields) => {
            datanew.push({
              containers: rowssss,
            });
          }
        );

        conn.query(
          "SELECT * FROM view_QuoteTaxes where id_quote = ?",
          [id],
          (err, rowsssss, fields) => {
            datanew.push({
              impuestos: rowsssss,
            });
          }
        );

        conn.query(
          "SELECT * FROM view_salesDetailsQuote where id_quote = ?",
          [id],
          (err, rowssssss, fields) => {
            datanew.push({
              ventasdetalles: rowssssss,
            });
          }
        );

        conn.query(
          "SELECT * FROM view_QuoteCost where id_quote = ?",
          [id],
          (err, rowsss, fields) => {
            datanew.push({
              costos: rowsss,
            });
          }
        );

        conn.query(
          "SELECT * FROM view_QuoteNotes where id_quote = ?",
          [id],
          (err, rowssss, fields) => {
            datanew.push({
              Notas: rowssss,
            });
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

export const delQuote = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id } = req.body;
  await conn.query(
    "UPDATE Table_Quote SET status = 0 WHERE id = ?",
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
      conn.end();
    }
  );
};

export const putQuote = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postPricing = req.body;
  const id_quote = req.params.id_quote;

  await conn.query(
    "SELECT * FROM view_listQuoteGet where id = ?",
    [id_quote],
    (err, row, fields) => {
      if (!err) {
        var datarow = JSON.parse(JSON.stringify(row));

        console.log("paso 1");
        conn.query(
          "UPDATE Table_Quote set id_marketing = ?, id_entitie = ?, id_modality = ?, id_shipment = ?, id_incoterms = ?, id_port_begin = ?, id_port_end = ?, nro_bultos = ?, peso = ?, volumen = ?, monto = ?, statusQuote = ?, id_vendedor = ?, descripcionMercancia = ?, idProvincia = ?, idDistrito = ?, fullflag = ?, seguro = ?, proveedor = ?, telefonoproveedor = ?, direccionproveedor = ?, date_end = ?, tiempo_transito = ?, ganancia = ? , id_pricing = ? where id = ?",
          [
            dataObj.id_marketing,
            dataObj.id_entitie,
            dataObj.idsentido,
            dataObj.idtipocarga,
            dataObj.idincoterms,
            dataObj.idorigen,
            dataObj.iddestino,
            dataObj.numerobultos,
            dataObj.peso,
            dataObj.volumen,
            dataObj.monto,
            dataObj.statusQuote,
            dataObj.idVendedor,
            dataObj.descripcionMercancia,
            dataObj.idProvincia,
            dataObj.idDistrito,
            dataObj.fullflag,

            dataObj.seguro,
            dataObj.proveedor,
            dataObj.telefonoproveedor,
            dataObj.direccionproveedor,
            dataObj.fecha_fin,
            dataObj.tiempo_transito,
            dataObj.ganancia,
            dataObj.idPricing,
            id_quote,
          ],
          (err, rowssss, fields) => {
            if (!err) {
              var dataquote = JSON.parse(JSON.stringify(rowssss));

              if (dataObj.impuestos) {
                dataObj.impuestos.map((item: any) => {
                  if (item.id) {
                    conn.query(
                      "update Quote_Taxes set type =?, name=?, percentage =?, valor =?, orden =? where id = ?",
                      [
                        item.type,
                        item.name,
                        item.percentage,
                        item.valor,
                        item.orden,
                        item.id,
                      ],
                      (err, rowsssss, fields) => {
                        if (!err) {
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  } else {
                    conn.query(
                      "INSERT INTO Quote_Taxes (id_quote, type, name, percentage, valor, orden) VALUES (?,?,?,?,?,?)",
                      [
                        id_quote,
                        item.type,
                        item.name,
                        item.percentage,
                        item.valor,
                        item.orden,
                      ],
                      (err, rowsssss, fields) => {
                        if (!err) {
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  }
                });
              }

              if (dataObj.statusUpdated == false) {
                dataObj.serviciocotizacion.map((item: any) => {
                  if (item.id > 0) {
                    conn.query(
                      "UPDATE Quote_Services SET id_begend = ?, nameService = ?, status = ? where id = ?",
                      [
                        item.idBegEnd,
                        item.nameService,
                        item.statusService,
                        item.id,
                      ],
                      (err, rowsssss, fields) => {
                        if (!err) {
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  } else {
                    conn.query(
                      "INSERT INTO Quote_Services (id_quote, id_begend, nameService, codeGroupServices, status) VALUES (?,?,?,?,?)",
                      [
                        id_quote,
                        item.idBegEnd,
                        item.nameService,
                        item.codeGroupServices,
                        item.statusService,
                      ],
                      (err, rowsssss, fields) => {
                        if (!err) {
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  }
                });
              } else if (dataObj.statusUpdated == true) {
                conn.query(
                  "DELETE FROM Quote_Services where id_quote = ?",
                  [id_quote],
                  (err, rowsssss, fields) => {
                    if (!err) {
                      dataObj.serviciocotizacion.map((item: any) => {
                        conn.query(
                          "INSERT INTO Quote_Services (id_quote, id_begend, nameService, codeGroupServices, status) VALUES (?,?,?,?,?)",
                          [
                            id_quote,
                            item.idBegEnd,
                            item.nameService,
                            item.codeGroupServices,
                            item.statusService,
                          ],
                          (err, rowsssss, fields) => {
                            if (!err) {
                            } else {
                              console.log(err);
                            }
                          }
                        );
                      });
                    } else {
                    }
                  }
                );
              }

              if (dataObj.statusUpdated == false) {
                dataObj.costocotizacion.map((item: any) => {
                  if (item.id > 0) {
                    conn.query(
                      "UPDATE Quote_Cost set id_proveedor = ?, id_multiplicador = ?, concepto = ?, costounitario = ?, cif = ?, seguro = ?, subtotal =?, esorigenflag = ?, eslocalflag = ?, esaduanaflag = ?, esalmacenflag = ?, esopcionflag = ?, esventaflag = ?, status = ? where id = ?",
                      [
                        item.id_proveedor,
                        item.id_multiplicador,
                        item.nameService,
                        item.costounitario,
                        item.cif,
                        item.seguro,
                        item.subtotal,
                        item.esorigenflag,
                        item.eslocalflag,
                        item.esaduanaflag,
                        item.esalmacenflag,

                        item.esopcionflag,
                        item.esventaflag,
                        item.status,
                        item.id,
                      ],
                      (err, rowsssss, fields) => {
                        if (!err) {
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  } else {
                    conn.query(
                      "INSERT INTO Quote_Cost (id_quote, id_proveedor, id_multiplicador, concepto, costounitario, cif, seguro, subtotal, esorigenflag, eslocalflag, esaduanaflag, esalmacenflag, esopcionflag, esventaflag, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                      [
                        id_quote,
                        item.id_proveedor,
                        item.id_multiplicador,
                        item.nameService,
                        item.costounitario,
                        item.cif,
                        item.seguro,
                        item.subtotal,
                        item.esorigenflag,
                        item.eslocalflag,
                        item.esaduanaflag,
                        item.esalmacenflag,
                        item.esopcionflag,
                        item.esventaflag,
                        item.status,
                      ],
                      (err, rowsssss, fields) => {
                        if (!err) {
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  }
                });
              } else if (dataObj.statusUpdated == true) {
                conn.query(
                  "DELETE FROM Quote_Cost where id_quote = ?",
                  [id_quote],
                  (err, rowsssss, fields) => {
                    if (!err) {
                      dataObj.costocotizacion.map((item: any) => {
                        conn.query(
                          "INSERT INTO Quote_Cost (id_quote, id_proveedor, id_multiplicador, concepto, costounitario, cif, seguro, subtotal, esorigenflag, eslocalflag, esaduanaflag, esalmacenflag, esopcionflag, esventaflag, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                          [
                            id_quote,
                            item.id_proveedor,
                            item.id_multiplicador,
                            item.nameService,
                            item.costounitario,
                            item.cif,
                            item.seguro,
                            item.subtotal,
                            item.esorigenflag,
                            item.eslocalflag,
                            item.esaduanaflag,
                            item.esalmacenflag,
                            item.esopcionflag,
                            item.esventaflag,
                            item.status,
                          ],
                          (err, rowsssss, fields) => {
                            if (!err) {
                            } else {
                              console.log(err);
                            }
                          }
                        );
                      });
                    } else {
                    }
                  }
                );
              }

              dataObj.contenedores.map((item: any) => {
                if (item.id) {
                  conn.query(
                    "UPDATE Quote_Containers set id_containers = ?, quantity = ? where id = ?",
                    [item.id_contenedor, item.cantidad, item.id],
                    (err, rowsssss, fields) => {
                      if (!err) {
                      } else {
                        console.log(err);
                      }
                    }
                  );
                } else {
                  conn.query(
                    "INSERT INTO Quote_Containers (id_quote, id_containers, quantity) VALUES (?,?,?)",
                    [id_quote, item.id_contenedor, item.cantidad],
                    (err, rowsssss, fields) => {
                      if (!err) {
                      } else {
                        console.log(err);
                      }
                    }
                  );
                }
              });

              if (dataObj.ventascasillerodetalles) {
                dataObj.ventascasillerodetalles.map((item: any) => {
                  if (item.id) {
                    conn.query(
                      "UPDATE Quote_SalesDetails set id_quoteSales = ?, description = ?, monto = ?, status= ? where id = ?",
                      [
                        item.id_quoteSales,
                        item.description,
                        item.monto,
                        item.status,
                        item.id,
                      ],
                      (err, rowsssss, fields) => {
                        if (!err) {
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  } else {
                    conn.query(
                      "INSERT INTO Quote_SalesDetails (id_quote, id_quoteSales, description, monto, status) VALUES (?,?,?,?,?)",
                      [
                        id_quote,
                        item.id_quoteSales,
                        item.description,
                        item.monto,
                        item.status,
                      ],
                      (err, rowsssss, fields) => {
                        if (!err) {
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  }
                });
              }

              dataObj.notacosto.map((item: any) => {
                if (item.id) {
                  conn.query(
                    "UPDATE Quote_NotesCost set description = ?, statusPrincipal = ?, statusIncluye = ?, statusNoIncluye = ?, status = ? WHERE id = ?",
                    [
                      item.description,
                      item.esprincipalflag,
                      item.esincluyeflag,
                      item.esnoincluyeflag,
                      item.status,
                      item.id,
                    ],
                    (err, rowsssss, fields) => {
                      if (!err) {
                      } else {
                        console.log(err);
                      }
                    }
                  );
                } else {
                  conn.query(
                    "INSERT INTO Quote_NotesCost (id_quote, description, statusPrincipal, statusIncluye, statusNoIncluye, status) VALUES (?,?,?,?,?,?)",
                    [
                      id_quote,
                      item.description,
                      item.esprincipalflag,
                      item.esincluyeflag,
                      item.esnoincluyeflag,
                      item.status,
                    ],
                    (err, rowsssss, fields) => {
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
                msg: "Cotizacion " + datarow[0].quote + " actualizada",
              });
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
      conn.end();
    }
  );
};

export const getReportsRangeDays = async (req: Request, res: Response) => {
  const conn = await connect();
  await conn.query(
    `SELECT * FROM (SELECT @pid:=${req.body.id_branch}) alias, view_QuoteReportRangeDays2`,
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

export const getModulesEntities = async (req: Request, res: Response) => {
  const conn = await connect();
  // const { id_module } = req.body;
  await conn.query(
    `SELECT * FROM view_modulesEntities WHERE 
    id_modules = ${req.body.id_module}   `,
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

export const setCalls = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_quote, fecha, id_operador, comentario } = req.body;
  await conn.query(
    "INSERT INTO Quote_Calls (id_quote, date, id_pricing, notes, status) values (?,?,?,?,?)",
    [id_quote, fecha, id_operador, comentario, 1],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: err,
        });
      }
      conn.end();
    }
  );
};

export const setPath = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_quote, name, type, size, path } = req.body;
  await conn.query(
    "INSERT INTO Table_Path (id_quote, name, type, size, path, status) VALUES(?,?,?,?,?,?)",
    [id_quote, name, type, size, path, 1],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: err,
        });
      }
      conn.end();
    }
  );
};

export const putPath = async (req: Request, res: Response) => {
  const conn = await connect();
  const { name } = req.body;
  const { id } = req.params;
  await conn.query(
    "UPDATE Table_Path SET name = ? where id = ?",
    [name, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: err,
        });
      }
      conn.end();
    }
  );
};

export const deletePath = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id } = req.params;
  await conn.query(
    "UPDATE Table_Path SET status = 0 where id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: err,
        });
      }
      conn.end();
    }
  );
};

export const updateCalls = async (req: Request, res: Response) => {
  const conn = await connect();
  const { fecha, id_operador, comentario, status } = req.body;
  const id = req.params.id;
  await conn.query(
    "UPDATE Quote_Calls set date = ?, id_pricing = ?, notes = ?, status = ? where id = ?",
    [fecha, id_operador, comentario, status, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          data: err,
        });
      }
      conn.end();
    }
  );
};

export const getCalls = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_quote } = req.body;
  await conn.query(
    "SELECT * FROM view_callsList where id_quote = ?",
    [id_quote],

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

export const getCallsId = async (req: Request, res: Response) => {
  const conn = await connect();
  const id = req.params.id;
  await conn.query(
    "SELECT * FROM view_callsList where id = ?",
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
      conn.end();
    }
  );
};

export const getInstructivoId = async (req: Request, res: Response) => {
  const conn = await connect();
  const id = req.params.id_quote;
  conn.query(
    "SELECT * FROM view_QuoteInstructivoData where id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        let data = JSON.parse(JSON.stringify(rows));
        let dataServiceList;
        let datanew: Array<any> = [];
        datanew.push({
          id: data[0].id,
          quote: data[0].quote,
          expediente: data[0].expediente,
          cliente: {
            nombre: data[0].nombre,
            direccion: data[0].direccion,
            ruc: data[0].ruc,
            contacto: data[0].contacto,
            vendedor: data[0].nameLong,
            origen: data[0].origen,
            destino: data[0].destino,
            sentido: data[0].sentido,
            carga: data[0].carga,
            fiscal: data[0].fiscal,
            incoterms: data[0].incoterms,
            direccionporigen: data[0].direccionporigen,
            proveedor: data[0].proveedor,
          },
        });

        conn.query(
          "SELECT * FROM view_QuoteInstructivoVentas where id_quote = ?",
          [id],
          (err, rowss, fields) => {
            datanew.push({
              ventas: rowss,
            });
          }
        );

        conn.query(
          "SELECT * FROM view_QuoteInstructivoCostos where id_quote = ?",
          [id],
          (err, rowssss, fields) => {
            datanew.push({
              costos: rowssss,
            });
          }
        );

        conn.query(
          "SELECT * FROM view_QuoteInstructivoServices where id_quote = ?",
          [id],
          (err, rowsss, fields) => {
            datanew.push({
              servicios: rowsss,
            });
          }
        );

        conn.query(
          "SELECT * FROM view_QuoteInstructivoNotes where id_quote = ?",
          [id],
          (err, rowssss, fields) => {
            datanew.push({
              Notas: rowssss,
            });
            setTimeout(function () {
              res.json({
                status: 200,
                statusBol: true,
                data: datanew,
              });
              conn.end();
            }, 900);
          }
        );
      } else {
        console.log(err);
      }
    }
  );
};

export const putInstructivo = async (req: Request, res: Response) => {
  const conn = await connect();

  const { fiscal, direccionorigen, notas, proveedor } = req.body;
  const id_quote = req.params.id_quote;

  conn.query(
    "UPDATE Table_Quote set fiscal = ?, direccionorigen = ?, proveedor = ? where id = ?",
    [fiscal, direccionorigen, proveedor, id_quote],
    (err, rowssss, fields) => {
      if (!err) {
        var dataquote = JSON.parse(JSON.stringify(rowssss));
        console.log("paso 4");
        notas.map((item: any) => {
          conn.query(
            "INSERT INTO Quote_Notes (id_quote, name, status) VALUES (?,?,?)",
            [id_quote, item.description, item.status],
            (err, rowsssss, fields) => {
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
          msg: {
            textMesg: "Notas agregadas correctamente",
          },
        });
      } else {
        res.json({
          status: 200,
          statusBol: true,
          error: err,
        });
      }
      conn.end();
    }
  );
};

export const getQuoteCalls = async (req: Request, res: Response) => {
  const conn = await connect();
  await conn.query(
    `SELECT * FROM view_quoteCalls WHERE id_branch = ${
      req.body.id_branch ? req.body.id_branch : "id_branch"
    } `,
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

export const getMarketingList = async (req: Request, res: Response) => {
  const conn = await connect();
  await conn.query(
    `SELECT * FROM view_marketingList where id_branch = ${
      req.body.id_branch ? req.body.id_branch : "id_branch"
    }  or escomunflag`,
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
