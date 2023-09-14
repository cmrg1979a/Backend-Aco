import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { postEntities } from "../interface/postEntitie";

export const getEntitiesList = async (req: Request, res: Response) => {
  let role = req.body.id_role;
  let id_branch = req.body.id_branch;
  let sql;
  role = req.body.id_role;
  if (role == 18) {
    role = 11;
  }
  // if (role == 15) {
  //   role = 28;
  // }
  if (role == 28) {
    role = 15;
  }

  // if (req.body.id_role == 28) {
  //   sql = `SELECT distinct * FROM view_entitie_list where statusEntitieRole <> 0 and statusEntitie <> 0 and statusRole <> 0 and id_role =  ${role} and id_branch = ${
  //     req.body.id_branch ? req.body.id_branch : "id_branch"
  //   } or es_operativa`;

  await pool.query(
    "SELECT * FROM TABLE_ENTITIES_listar(null,$1,$2,null)",
    [id_branch, role],
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

export const getEntitiesListId = async (req: Request, res: Response) => {
  const { id, id_branch } = req.body;

  await pool.query(
    "SELECT * FROM TABLE_ENTITIES_listar($1,$2,null,null)",
    [id, id_branch],
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

export const getEntitiesListIc = async (req: Request, res: Response) => {
  const { ic } = req.body;
  let id_branch = req.body.id_branch;
  await pool.query(
    "SELECT * FROM table_entities_validaric($1,$2)",
    [id_branch, ic],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
            data: rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: rows[0].estadoflag,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
};

export const getPhones = async (req: Request, res: Response) => {
  const id_entitie = req.params.id_entitie;
  let id_branch = req.body.id_branch;
  await pool.query(
    " SELECT * FROM TABLE_ENTITIES_listar($1,$2,null,null)",
    [id_entitie, id_branch],
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

export const getContacts = async (req: Request, res: Response) => {
  const id_entitie = req.params.id_entitie;
  let id_branch = req.body.id_branch;
  await pool.query(
    " SELECT * FROM TABLE_ENTITIES_listar($1,$2,null,null)",
    [id_entitie, id_branch],
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

export const addEntitie = async (req: Request, res: Response) => {
  const dataObj: postEntities = req.body;
  let pidphone = [];
  let pphoned = [dataObj.phone];
  let cname = [];
  let cphone = [dataObj.phone];

  await pool.query(
    "select * from table_entities_insertar($1,$2,$3,$4,$5, $6, $7, $8,$9, $10, $11, $12, $13, $14,$15, $16,$17,$18,$19, $20,$21,$22,$23,$24)",
    [
      !dataObj.names || dataObj.names == "" ? null : dataObj.names,
      !dataObj.surname || dataObj.surname == "" ? null : dataObj.surname,
      !dataObj.second_surname || dataObj.second_surname == ""
        ? null
        : dataObj.second_surname,
      !dataObj.tradename || dataObj.tradename == "" ? null : dataObj.tradename,
      !dataObj.business_name || dataObj.business_name == ""
        ? null
        : dataObj.business_name,
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
      dataObj.id_role,
      dataObj.id_branch,
      dataObj.esoperativa,
      pidphone,
      pphoned,
      cname,
      cphone,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          let data = response.rows;
          res.json({
            status: 200,
            statusBol: true,
            data: {
              id: data[0].insertid,
              insertId: data[0].insertid,
              nameLong: dataObj.tradename,
              documentLong: dataObj.document,
              phone: dataObj.phone,
            },
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
    // (err, response, fields) => {
    //   console.log(response)
    //   let data = response.rows;

    //   res.json({
    //     status: 200,
    //     statusBol: true,
    //     data: {
    //       id: data.insertId,
    //       insertId: data.insertId,
    //       nameLong: dataObj.tradename,
    //       documentLong: dataObj.document,
    //       phone: dataObj.phone,
    //     },
    //   });
    // }
  );
};

export const addEntities = async (req: Request, res: Response) => {
  const dataObj = req.body;
  const dataPhones = req.body.dataPhones;
  const dataContacts = req.body.dataContacts;
  const dataAccount = req.body.accounts;

  await pool.query(
    "select * from TABLE_ENTITIES_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30)",
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
      dataObj.id_sex ? dataObj.id_sex : 1,
      dataObj.id_document,
      dataObj.id_role ? dataObj.id_role : null,
      dataObj.id_branch,
      dataPhones.map((element) => {
        return element.id ? element.id : null;
      }),
      dataPhones.map((element) => {
        return element.number ? element.number : null;
      }),
      dataContacts.map((element) => {
        return element.name ? element.name : null;
      }),
      dataContacts.map((element) => {
        return element.number ? element.number : null;
      }),
      dataAccount.map((element) => {
        return element.accountIdTypeAccount
          ? element.accountIdTypeAccount
          : null;
      }),
      dataAccount.map((element) => {
        return element.accountIdBanks ? element.accountIdBanks : null;
      }),
      dataAccount.map((element) => {
        return element.accountIdCoins ? element.accountIdCoins : null;
      }),
      dataAccount.map((element) => {
        return element.accountnumber ? element.accountnumber : null;
      }),
      dataObj.diascredito ? dataObj.diascredito : 0,
      dataObj.diasdeuda ? dataObj.diasdeuda : 0,
      dataObj.id_tipo_proveedor ? dataObj.id_tipo_proveedor : null,
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

export const editEntitie = async (req: Request, res: Response) => {
  const dataObj = req.body;
  const id = req.params.id;
  await pool.query(
    "SELECT * FROM Table_Entities_update($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,$19,$20,$21)",
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
      dataObj.diascredito,
      dataObj.diasdeuda ? dataObj.diasdeuda : null,
      dataObj.id_tipo_proveedor ? dataObj.id_tipo_proveedor : null,
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

export const validationDocument = async (req: Request, res: Response) => {
  let validation = await pool.query(
    "select * from validar_documento($1)",
    [req.query.document],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            msg: rows[0].mensaje,
          });
        } else {
          res.json({
            status: 200,
            statusBol: false,
            mensaje: rows[0].mensaje,
          });
        }
      } else {
        console.log(err);
      }
    }
    // (err, rows, fields) => {

    //   let cant: JSON;
    //   cant = JSON.parse(JSON.stringify(rows));
    //   if (cant[0].cantidad > 0) {
    //     res.json({
    //       status: 200,
    //       statusBol: true,
    //       msg: "El documento ya se encuentra registrado.",
    //     });
    //   } else {
    //     res.json({
    //       status: 200,
    //       statusBol: false,
    //       msg: "",
    //     });
    //   }
    // }
  );
};

export const CargarClientes = async (req: Request, res: Response) => {
  let id_branch = req.body.id_branch;
  await pool.query(
    "select * from TABLE_ENTITIES_cargar($1);",
    [id_branch],
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

export const CargarProveedores = async (req: Request, res: Response) => {
  let id_branch = req.body.id_branch;
  await pool.query(
    "select * from TABLE_ENTITIES_cargar($1);",
    [id_branch],
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

export const InsertPhones = async (req: Request, res: Response) => {
  const dataObj: postEntities = req.body;

  await pool.query(
    "SELECT * FROM phones_registrar($1,$2,$3)",
    [dataObj.id, dataObj.tipo, dataObj.phone],
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

export const ListarPhons = async (req: Request, res: Response) => {
  const id = req.params.id;

  await pool.query(
    "SELECT * FROM phone_ver($1)",
    [id],
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
export const cargarPersona = async (req: Request, res: Response) => {
  const id = req.params.id;

  await pool.query(
    "SELECT * FROM function_cargar_persona($1)",
    [req.query.id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        if (!!rows[0].estadoflag) {
          res.json({
            status: 200,
            statusBol: true,
            data: rows,
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
