import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();
import { postEntities } from "../interface/postEntitie";
import { renewTokenMiddleware } from "../middleware/verifyTokenMiddleware";

export const GuardarProveedor = async (req: Request, res: Response) => {
  const {
    bussiness_name,
    dias_almacenaje,
    dias_credito,
    dias_sobreestadia,
    id_ciudad,
    id_pais,
    id_role,
    id_tipodocumento,
    id_tipotransaccion,
    notas,
    lstContactos,
    lstInformacionBancaria,
    lstTelefono,
    direccion,
    nro_documento,
    id_branch,
    emailaddress,
    lstConvenios,
    lstTarifas,
  } = req.body;

  await pool.query(
    "SELECT * FROM function_table_entities_registrarproveedor($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33)",
    [
      id_branch ? id_branch : null,
      bussiness_name ? bussiness_name : null,
      dias_almacenaje ? dias_almacenaje : null,
      dias_credito ? dias_credito : null,
      dias_sobreestadia ? dias_sobreestadia : null,
      id_ciudad ? id_ciudad : null,
      id_pais ? id_pais : null,
      id_role ? id_role : null,
      id_tipodocumento ? id_tipodocumento : null,
      id_tipotransaccion ? id_tipotransaccion : null,
      direccion ? direccion : null,
      notas ? notas : null,
      nro_documento ? nro_documento : null,
      lstTelefono.map((tel) => {
        return tel.id_tipotelefono ? tel.id_tipotelefono : null;
      }),
      lstTelefono.map((tel) => {
        return tel.telefono ? tel.telefono : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.nombre ? contacto.nombre : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.id_tipotelefono ? contacto.id_tipotelefono : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.telefono ? contacto.telefono : null;
      }),

      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_cuenta ? infbanc.nro_cuenta : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.cci ? infbanc.cci : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_banco ? infbanc.id_banco : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_coins ? infbanc.id_coins : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_swift ? infbanc.nro_swift : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_intermediario ? infbanc.id_intermediario : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_cuenta_intermediario
          ? infbanc.nro_cuenta_intermediario
          : null;
      }), // $25
      emailaddress ? emailaddress : null,
      lstConvenios.map((item) => item.fecha || null),
      lstConvenios.map((item) => item.dias_credito || 0),
      lstConvenios.map((item) => item.email_soporte || null),
      lstTarifas.map((item) => item.fecha || null),
      lstTarifas.map((item) => item.codigo || null),
      lstTarifas.map((item) => item.email_soporte || null),
      lstTarifas.map((item) => item.tarifa || 0),
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getListProveedor = async (req: Request, res: Response) => {
  const {
    id_branch,
    correlativo,
    bussiness_name,
    id_document,
    id_pais,
    id_state,
    status,
    id_tipoproveedor,
  } = req.query;

  await pool.query(
    "SELECT * FROM function_table_entities_listproveedor($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      id_branch ? id_branch : null,
      correlativo ? correlativo : null,
      bussiness_name ? bussiness_name : null,
      id_document ? id_document : null,
      id_pais ? id_pais : null,
      id_state ? id_state : null,
      status ? status : null,
      id_tipoproveedor ? id_tipoproveedor : null,
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getVerProveedor = async (req: Request, res: Response) => {
  const { id } = req.query;

  await pool.query(
    "SELECT * FROM function_entities_verproveedor($1)",
    [id],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const eliminarProveedor = async (req: Request, res: Response) => {
  const { id } = req.body;

  await pool.query(
    "SELECT * FROM function_entities_eliminarproveedor($1)",
    [id],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const telContactoProveedor = async (req: Request, res: Response) => {
  const { id } = req.query;

  await pool.query(
    "SELECT * FROM function_entities_telcontacto($1)",
    [id],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getValidaRazonSocial = async (req: Request, res: Response) => {
  const { id_branch, razonsocial } = req.query;

  await pool.query(
    "SELECT * FROM function_validar_razonsocial($1,$2)",
    [id_branch, razonsocial],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getValidaTipoDocumentoDocument = async (
  req: Request,
  res: Response
) => {
  const { id_branch, id_tipodocumento, documento } = req.query;

  await pool.query(
    "SELECT * FROM function_entidad_val_tipodocument_documet($1,$2,$3)",
    [id_branch, id_tipodocumento, documento],

    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const actualizarProveedor = async (req: Request, res: Response) => {
  const {
    id,
    dias_almacenaje,
    dias_credito,
    dias_sobreestadia,
    id_ciudad,
    id_pais,
    id_role,
    id_tipodocumento,
    id_tipotransaccion,
    notas,
    lstContactos,
    lstInformacionBancaria,
    lstTelefono,
    direccion,
    emailaddress,
    lstConvenios,
    lstTarifas,
  } = req.body;

  await pool.query(
    "SELECT * FROM function_table_entities_actualizarproveedor($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36)",
    [
      id,
      dias_almacenaje ? dias_almacenaje : null,
      dias_credito ? dias_credito : null,
      dias_sobreestadia ? dias_sobreestadia : null,
      id_ciudad ? id_ciudad : null,
      id_pais ? id_pais : null,
      id_role ? id_role : null,
      id_tipodocumento ? id_tipodocumento : null,
      id_tipotransaccion ? id_tipotransaccion : null,
      direccion ? direccion : null,
      notas ? notas : null,
      lstTelefono.map((tel) => {
        return tel.id ? tel.id : null;
      }),
      lstTelefono.map((tel) => {
        return tel.id_tipotelefono ? tel.id_tipotelefono : null;
      }),
      lstTelefono.map((tel) => {
        return tel.telefono ? tel.telefono : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.id ? contacto.id : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.nombre ? contacto.nombre : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.id_tipotelefono ? contacto.id_tipotelefono : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.telefono ? contacto.telefono : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id ? infbanc.id : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_cuenta ? infbanc.nro_cuenta : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.cci ? infbanc.cci : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_banco ? infbanc.id_banco : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_coins ? infbanc.id_coins : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_swift ? infbanc.nro_swift : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_intermediario ? infbanc.id_intermediario : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_cuenta_intermediario
          ? infbanc.nro_cuenta_intermediario
          : null;
      }),// $26
      emailaddress ? emailaddress : null,
      lstConvenios.map((item) => item.id || null),
      lstConvenios.map((item) => item.fecha || null),
      lstConvenios.map((item) => item.dias_credito || 0),
      lstConvenios.map((item) => item.email_soporte || null),
      lstTarifas.map((item) => item.id || null),
      lstTarifas.map((item) => item.fecha || null),
      lstTarifas.map((item) => item.codigo || null),
      lstTarifas.map((item) => item.email_soporte || null),
      lstTarifas.map((item) => item.tarifa || 0), 
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
// -------------------------------------------
export const getListCliente = async (req: Request, res: Response) => {
  const {
    id_branch,
    correlativo,
    names,
    surname,
    second_surname,
    id_document,
    id_pais,
    id_state,
    status,
    id_tipoproveedor,
  } = req.query;

  await pool.query(
    "SELECT * FROM function_table_entities_listcliente($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      id_branch ? id_branch : null,
      correlativo ? correlativo : null,
      names ? names : null,
      surname ? surname : null,
      second_surname ? second_surname : null,
      id_document ? id_document : null,
      id_pais ? id_pais : null,
      id_state ? id_state : null,
      status ? status : null,
      id_tipoproveedor ? id_tipoproveedor : null,
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const GuardarCliente = async (req: Request, res: Response) => {
  const {
    dias_credito,
    names,
    surname,
    second_surname,
    id_ciudad,
    id_pais,
    id_tipodocumento,
    id_tipotransaccion,
    notas,
    lstContactos,
    lstInformacionBancaria,
    lstTelefono,
    direccion,
    nro_documento,
    id_branch,
    id_sex,
    birthday,
    emailaddress,
    lstConvenios,
    lstTarifas,
    informacionEntrega,
    lstShippers
  } = req.body;

  await pool.query(
    "SELECT * FROM function_table_entities_registrarcliente($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46)",
    [
      id_branch ? id_branch : null,
      names ? names : null,
      surname ? surname : null,
      second_surname ? second_surname : null,
      dias_credito ? dias_credito : null,
      id_ciudad ? id_ciudad : null,
      id_pais ? id_pais : null,
      id_tipotransaccion ? id_tipotransaccion : null,
      id_tipodocumento ? id_tipodocumento : null,
      direccion ? direccion : null,
      notas ? notas : null,
      nro_documento ? nro_documento : null,
      id_sex ? id_sex : null,
      birthday ? birthday : null,
      lstTelefono.map((tel) => {
        return tel.id_tipotelefono ? tel.id_tipotelefono : null;
      }),
      lstTelefono.map((tel) => {
        return tel.telefono ? tel.telefono : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.nombre ? contacto.nombre : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.id_tipotelefono ? contacto.id_tipotelefono : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.telefono ? contacto.telefono : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_cuenta ? infbanc.nro_cuenta : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.cci ? infbanc.cci : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_banco ? infbanc.id_banco : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_coins ? infbanc.id_coins : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_swift ? infbanc.nro_swift : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_intermediario ? infbanc.id_intermediario : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_cuenta_intermediario
          ? infbanc.nro_cuenta_intermediario
          : null;
      }),
      emailaddress ? emailaddress : null,
      lstConvenios.map((item) => item.fecha || null),
      lstConvenios.map((item) => item.dias_credito || 0),
      lstConvenios.map((item) => item.email_soporte || null),
      lstTarifas.map((item) => item.fecha || null),
      lstTarifas.map((item) => item.codigo || null),
      lstTarifas.map((item) => item.email_soporte || null),
      lstTarifas.map((item) => item.tarifa || 0),
      informacionEntrega.destinatario ? informacionEntrega.destinatario : null,
      informacionEntrega.dni_destinatario ? informacionEntrega.dni_destinatario : null,
      informacionEntrega.receptor ? informacionEntrega.receptor : null,
      informacionEntrega.dni_receptor ? informacionEntrega.dni_receptor : null,
      informacionEntrega.id_departamento ? informacionEntrega.id_departamento : null,
      informacionEntrega.id_provincia ? informacionEntrega.id_provincia : null,
      informacionEntrega.id_distrito ? informacionEntrega.id_distrito : null,
      informacionEntrega.agencia ? informacionEntrega.agencia : null,
      informacionEntrega.celular_agencia ? informacionEntrega.celular_agencia : null,
      informacionEntrega.status ? 1 : 0,
      lstShippers.map((item) => item.codigo || null),
      lstShippers.map((item) => item.shipper || null),
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getVerCliente = async (req: Request, res: Response) => {
  const { id } = req.query;

  await pool.query(
    "SELECT * FROM function_entities_vercliente($1)",
    [id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ActualizarCliente = async (req: Request, res: Response) => {
  const {
    dias_credito,
    names,
    surname,
    second_surname,
    id_ciudad,
    id_pais,
    id_tipodocumento,
    id_tipotransaccion,
    notas,
    lstContactos,
    lstInformacionBancaria,
    lstTelefono,
    direccion,
    nro_documento,
    id,
    id_sex,
    birthday,
    emailaddress,
    lstConvenios,
    lstTarifas,
    informacionEntrega,
    lstShippers
  } = req.body;

  await pool.query(
    "SELECT * FROM function_table_entities_actualizarcliente($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53)",
    [
      id,
      names ? names : null,
      surname ? surname : null,
      second_surname ? second_surname : null,
      dias_credito ? dias_credito : null,
      id_ciudad ? id_ciudad : null,
      id_pais ? id_pais : null,
      id_tipotransaccion ? id_tipotransaccion : null,
      id_tipodocumento ? id_tipodocumento : null,
      direccion ? direccion : null,
      notas ? notas : null,
      nro_documento ? nro_documento : null,
      id_sex ? id_sex : null,
      birthday ? birthday : null,
      lstTelefono.map((tel) => {
        return tel.id ? tel.id : null;
      }),
      lstTelefono.map((tel) => {
        return tel.id_tipotelefono ? tel.id_tipotelefono : null;
      }),
      lstTelefono.map((tel) => {
        return tel.telefono ? tel.telefono : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.id ? contacto.id : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.nombre ? contacto.nombre : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.id_tipotelefono ? contacto.id_tipotelefono : null;
      }),
      lstContactos.map((contacto) => {
        return contacto.telefono ? contacto.telefono : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id ? infbanc.id : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_cuenta ? infbanc.nro_cuenta : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.cci ? infbanc.cci : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_banco ? infbanc.id_banco : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_coins ? infbanc.id_coins : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_swift ? infbanc.nro_swift : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.id_intermediario ? infbanc.id_intermediario : null;
      }),
      lstInformacionBancaria.map((infbanc) => {
        return infbanc.nro_cuenta_intermediario
          ? infbanc.nro_cuenta_intermediario
          : null;
      }),
      emailaddress ? emailaddress : null,
      lstConvenios.map((item) => item.id || null),
      lstConvenios.map((item) => item.fecha || null),
      lstConvenios.map((item) => item.dias_credito || 0),
      lstConvenios.map((item) => item.email_soporte || null),
      lstTarifas.map((item) => item.id || null),
      lstTarifas.map((item) => item.fecha || null),
      lstTarifas.map((item) => item.codigo || null),
      lstTarifas.map((item) => item.email_soporte || null),
      lstTarifas.map((item) => item.tarifa || 0), 
      informacionEntrega.id ? informacionEntrega.id : null,
      informacionEntrega.destinatario ? informacionEntrega.destinatario : null,
      informacionEntrega.dni_destinatario ? informacionEntrega.dni_destinatario : null,
      informacionEntrega.receptor ? informacionEntrega.receptor : null,
      informacionEntrega.dni_receptor ? informacionEntrega.dni_receptor : null,
      informacionEntrega.id_departamento ? informacionEntrega.id_departamento : null,
      informacionEntrega.id_provincia ? informacionEntrega.id_provincia : null,
      informacionEntrega.id_distrito ? informacionEntrega.id_distrito : null,
      informacionEntrega.agencia ? informacionEntrega.agencia : null,
      informacionEntrega.celular_agencia ? informacionEntrega.celular_agencia : null,
      informacionEntrega.status ? 1 : 0,
      lstShippers.map((item) => item.id || null),
      lstShippers.map((item) => item.codigo || null),
      lstShippers.map((item) => item.shipper || null),
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

// -------------------------------------------
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
            token: renewTokenMiddleware(req),
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
  );
};

export const CargarClientes = async (req: Request, res: Response) => {
  let id_branch = req.query.id_branch;
  await pool.query(
    "select * from function_cargar_clientes($1);",
    [id_branch],
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

export const CargarProveedores = async (req: Request, res: Response) => {
  const { id_branch } = req.query;

  await pool.query(
    "select * from function_cargar_proveedor($1);",
    [id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const cargarProveedoresRolNoShipper = async (req: Request, res: Response) => {
  const { id_branch } = req.query;

  await pool.query(
    "select * from function_cargar_proveedor_rol_no_shipper($1);",
    [id_branch],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const cargarProveedoresXRol = async (req: Request, res: Response) => {
  const { id_branch, rol } = req.query;

  await pool.query(
    "select * from function_cargar_proveedor_x_rol($1,$2);",
    [
      id_branch,
      rol || null
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
          token: renewTokenMiddleware(req),
        });
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
            token: renewTokenMiddleware(req),
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
export const ListarPersonaTipoPersona = async (req: Request, res: Response) => {
  const id = req.params.id;

  await pool.query(
    "SELECT * FROM function_list_entities_tipo($1)",
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
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const guardarRolProveedor = async (req: Request, res: Response) => {
  const { id, proveedorflag, clienteflag, personalflag } = req.body;

  await pool.query(
    "SELECT * FROM function_actualizar_rol_persona($1,$2,$3,$4)",
    [id, proveedorflag, clienteflag, personalflag],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;

        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
          token: renewTokenMiddleware(req),
        });
      } else {
        console.log(err);
      }
    }
  );
};
