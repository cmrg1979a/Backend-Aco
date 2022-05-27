import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postEntities } from "../interface/postEntitie";

export const getEntitiesList = async (req: Request, res: Response) => {
  const conn = await connect();
  let role;
  let sql;
  if (req.body.id_role == 18) {
    role = 11;
  } else {
    role = req.body.id_role;
  }
  if (req.body.id_role == 28) {
    sql = `SELECT * FROM view_entitie_list where statusEntitieRole <> 0 and statusEntitie <> 0 and statusRole <> 0 and id_role =  ${role} and id_branch = ${
      req.body.id_branch ? req.body.id_branch : "id_branch"
    } or es_operativa`;
  } else {
    sql = `SELECT * FROM view_entitie_list where statusEntitieRole <> 0 and statusEntitie <> 0 and statusRole <> 0 and id_role =  ${role} and id_branch = ${
      req.body.id_branch ? req.body.id_branch : "id_branch"
    } `;
  }

  await conn.query(sql, (err, rows) => {
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
  });
};

export const getEntitiesListId = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id } = req.body;
  await conn.query(
    "SELECT * FROM view_entitie_list where id = ?",
    [id],
    (err, rows) => {
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

export const getEntitiesListIc = async (req: Request, res: Response) => {
  const conn = await connect();
  const { ic } = req.body;
  await conn.query(
    "SELECT * FROM view_entitie_list where ic = ?",
    [ic],
    (err, rows) => {
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

export const getPhones = async (req: Request, res: Response) => {
  const conn = await connect();
  const id_entitie = req.params.id_entitie;
  await conn.query(
    "SELECT * FROM view_phone where id_entitie = ?",
    [id_entitie],
    (err, rows) => {
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

export const getContacts = async (req: Request, res: Response) => {
  const conn = await connect();
  const id_entitie = req.params.id_entitie;
  await conn.query(
    "SELECT * FROM view_contacts where id_entitie = ?",
    [id_entitie],
    (err, rows) => {
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

export const addEntitie = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postEntities = req.body;

  await conn.query(
    "INSERT INTO Table_Entities SET ?",
    [dataObj],
    (err, rows, fields) => {
      console.log(dataObj);
      if (!err) {
        var data = JSON.parse(JSON.stringify(rows));
        conn.query(
          "INSERT INTO Entities_Role (id_entities, id_role, status) VALUES (?,?,?)",
          [data.insertId, dataObj.id_role ? dataObj.id_role : 11, 1],
          (err, rowss, fields) => {
            if (!err) {
            } else {
              console.log(err);
            }
          }
        );

        if (dataObj.phone != "" || dataObj.phone != null) {
          conn.query(
            "INSERT INTO Table_Phones (id_entitie, phone, status) VALUES (?,?,?)",
            [data.insertId, dataObj.phone, 1],
            (err, rowsss, fields) => {
              if (!err) {
              } else {
                console.log(err);
              }
            }
          );
        }

        res.json({
          status: 200,
          statusBol: true,
          data: {
            id: data.insertId,
            insertId: data.insertId,
            nameLong: dataObj.tradename,
            documentLong: dataObj.document,
            phone: dataObj.phone,
          },
        });
      } else {
        res.json({
          status: 400,
          statusBol: false,
          msg: err,
        });
      }
      setTimeout(() => {
        conn.end();
      }, 15000);
    }
  );
};

export const addEntities = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postEntities = req.body;
  const dataPhones = req.body.dataPhones;
  const dataContacts = req.body.dataContacts;

  await conn.query(
    "INSERT INTO Table_Entities (names,surname,second_surname,tradename,business_name,birthday,document,address,notes,status,phone,id_pais,id_state,id_city,id_town,id_sex,id_document,id_branch,esoperativa) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      dataObj.names,
      dataObj.surname,
      dataObj.second_surname,
      dataObj.tradename,
      dataObj.business_name,
      dataObj.birthday,
      dataObj.document,
      dataObj.address,
      dataObj.notes,
      dataObj.status,
      dataObj.phone,
      dataObj.id_pais,
      dataObj.id_state,
      dataObj.id_city,
      dataObj.id_town,
      dataObj.id_sex,
      dataObj.id_document,
      dataObj.id_branch,
      0,
    ],
    (err, rows, fields) => {
      if (!err) {
        var data = JSON.parse(JSON.stringify(rows));

        dataPhones.map((item: any) => {
          conn.query(
            "INSERT INTO Table_Phones (id_entitie, id_phone, phone, status) VALUES (?,?,?,?)",
            [data.insertId, item.id, item.number, 1],
            (err, rowss, fields) => {
              if (!err) {
              } else {
                console.log(err);
              }
            }
          );
        });

        dataContacts.map((item: any) => {
          conn.query(
            "INSERT INTO Table_Contacts (id_entitie, name, phone, status) VALUES (?,?,?,?)",
            [data.insertId, item.name, item.number, 1],
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
          data: rows,
        });
      } else {
        console.log(err);
        res.json({
          status: 400,
          statusBol: false,
          msg: err,
        });
      }
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};

export const editEntitie = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postEntities = req.body;
  const id = req.params.id;

  await conn.query(
    "UPDATE Table_Entities SET ? WHERE id = ?",
    [dataObj, id],
    (err, rows, fields) => {
      if (!err) {
        var data = JSON.parse(JSON.stringify(rows));
        if (
          dataObj.phone != "" ||
          dataObj.phone != null ||
          dataObj.phone != "0"
        ) {
          conn.query(
            "UPDATE Table_Phones SET phone = ? where id_entitie = ?",
            [dataObj.phone, id],
            (err, rowss, fields) => {
              if (!err) {
                res.json({
                  status: 200,
                  statusBol: true,
                  data: rowss,
                });
              } else {
                console.log(err);
              }
            }
          );
        }
      } else {
        console.log(err);
      }
      setTimeout(() => {
        conn.end();
      }, 9000);
    }
  );
};

export const validationDocument = async (req: Request, res: Response) => {
  const conn = await connect();
  let validation = await conn.query(
    `SELECT COUNT(*)as cantidad FROM Table_Entities WHERE document = '${req.query.document}' limit 1`,
    (err, rows, fields) => {
      let cant: JSON;
      cant = JSON.parse(JSON.stringify(rows));
      if (cant[0].cantidad > 0) {
        res.json({
          status: 200,
          statusBol: true,
          msg: "El documento ya se encuentra registrado.",
        });
      } else {
        res.json({
          status: 200,
          statusBol: false,
          msg: "",
        });
      }
      conn.end();
    }
  );

  // console.log(validation);

  // const dataObj: postEntities = req.body;
  // const id = req.params.id;

  // await conn.query(
  //   "UPDATE Table_Entities SET ? WHERE id = ?",
  //   [dataObj, id],
  //   (err, rows, fields) => {
  //     if (!err) {
  //       var data = JSON.parse(JSON.stringify(rows));
  //       if (
  //         dataObj.phone != "" ||
  //         dataObj.phone != null ||
  //         dataObj.phone != "0"
  //       ) {
  //         conn.query(
  //           "UPDATE Table_Phones SET phone = ? where id_entitie = ?",
  //           [dataObj.phone, id],
  //           (err, rowss, fields) => {
  //             if (!err) {
  //               res.json({
  //                 status: 200,
  //                 statusBol: true,
  //                 data: rowss,
  //               });
  //             } else {
  //               console.log(err);
  //             }
  //           }
  //         );
  //       }
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // );
};

export const CargarClientes = async (req: Request, res: Response) => {
  const conn = await connect();
  await conn.query("SELECT * FROM view_cargarClientes", (err, rows, fields) => {
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

export const CargarProveedores = async (req: Request, res: Response) => {
  const conn = await connect();
  await conn.query(
    "SELECT * FROM view_cargarProveedor",
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
