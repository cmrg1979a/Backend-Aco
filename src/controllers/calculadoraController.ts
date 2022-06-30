import { Request, response, Response } from "express";
import { conexion } from "../routes/databasePg";
import * as pg from "pg";
import { usuarioCalculadora } from "interface/usuariosCalculadora";
import jwt from "jsonwebtoken";
const { Pool } = pg;

const pool = conexion();
export const ValidarCorreoExiste = async (req: Request, res: Response) => {
  const correo = req.params.correo;
  pool.query(
    "select * from validar_correo($1)",
    [correo],
    async (err, response, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: response.rows,
        });
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};

export const RegistrarUsuario = async (req: Request, res: Response) => {
  const data: usuarioCalculadora = req.body;

  if (!data.email) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "El correo es requerido",
    });
  }
  if (!data.contrasena) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "La constraseña es requerido",
    });
  }
  if (!data.nombre) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "El nombre es requerido",
    });
  }
  if (!data.telefono) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "El teléfono es requerido",
    });
  }

  pool.query(
    `SELECT * FROM usuarios_insertar
    (
       $1,
        $2,
        $3,
        $4
    );`,

    [data.email, data.contrasena, data.nombre, data.telefono],
    async (err, response, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: response.rows,
        });
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};

export const RegistrarUsuarioGmail = async (req: Request, res: Response) => {
  const data: usuarioCalculadora = req.body;

  if (!data.email) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "El correo es requerido",
    });
  }

  if (!data.nombre) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "El nombre es requerido",
    });
  }
  if (!data.telefono) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "El teléfono es requerido",
    });
  }

  pool.query(
    `SELECT * FROM usuariosgmail_insertar
    (
       $1,
        $2,
        $3
    );`,

    [data.email, data.nombre, data.telefono],
    async (err, response, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: response.rows,
        });
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};

export const loginUsuarios = async (req: Request, res: Response) => {
  const data: usuarioCalculadora = req.body;

  if (!data.email) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "El correo es requerido",
    });
  } else if (!data.contrasena) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "La contraseña es requerida",
    });
  } else {
    pool.query(
      `SELECT * FROM usuarios_inciarsesion
    (
        $1,
        $2
    );`,

      [data.email, data.contrasena],
      async (err, response, fields) => {
        if (!err) {
          const token: string = jwt.sign(
            { response },
            process.env.TOKEN_SECRET || "tokentest",
            {
              expiresIn: 60 * 60 * 24,
            }
          );
          res.json({
            status: 200,
            statusBol: true,
            data: response.rows,
            token: token,
          });
        } else {
          return console.error("Error executing query", err);
        }
      }
    );
  }
};
export const validarGenerarCotizacion = async (req: Request, res: Response) => {
  console.log(req.params);

  const ip = req.params.ip;
  const correo = req.params.correo;

  pool.query(
    `SELECT * FROM cotizacion_cliente_validar
    (
      $1,
      $2
    );`,

    [correo, ip],
    async (err, response, fields) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: response.rows,
        });
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};
export const RegistrarCotizacionXCorreo = async (
  req: Request,
  res: Response
) => {
  const data = req.body;

  if (!data.correo) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "El correo es requerido",
    });
  } else if (!data.ip) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "La IP es requerido",
    });
  } else if (!data.esprimeracotizacionflag) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "La es primerva cotización es requerido",
    });
  } else if (
    !data.id_cotizacionlcl &&
    !data.id_cotizacionfcl &&
    !data.id_cotizacionaereo
  ) {
    res.json({
      status: 200,
      statusBol: false,
      mensaje: "La cotizacion es requerida",
    });
  } else {
    pool.query(
      `SELECT * FROM cotizacion_cliente_insertar
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    );`,

      [
        data.correo,
        data.id_cotizacionlcl ? data.id_cotizacionlcl : null,
        data.id_cotizacionfcl ? data.id_cotizacionfcl : null,
        data.id_cotizacionaereo ? data.id_cotizacionaereo : null,
        data.esprimeracotizacionflag,
        data.ip,
      ],
      async (err, response, fields) => {
        if (!err) {
          res.json({
            status: 200,
            statusBol: true,
            data: response.rows,
          });
        } else {
          return console.error("Error executing query", err);
        }
      }
    );
  }
};

export const CargarMoneda = async (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM cargar_monedas();",

    async (err, response, fields) => {
      if (!err) {
        if (response.rows[0].estadoflag == true) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: true,
            data: response.rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: false,
            mensaje: response.rows[0].mensaje,
            tipoMensaje: response.rows[0].tipomensaje,
          });
        }
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};
export const CargarPais = async (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM paises_cargar();",

    async (err, response, fields) => {
      if (!err) {
        if (response.rows[0].estadoflag == true) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: true,
            data: response.rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: false,
            mensaje: response.rows[0].mensaje,
            tipoMensaje: response.rows[0].tipomensaje,
          });
        }
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};
export const CargarPuertoXPaisXTipo = async (req: Request, res: Response) => {
  const id_pais = req.params.id_pais;
  const tipo = req.params.tipo;
  if (!id_pais || !tipo) {
  } else {
    pool.query(
      "SELECT * FROM cargar_puertos($1,$2);",
      [id_pais, tipo],
      async (err, response, fields) => {
        if (!err) {
          if (response.rows[0].estadoflag == true) {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: true,
              data: response.rows,
            });
          } else {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: false,
              mensaje: response.rows[0].mensaje,
              tipoMensaje: response.rows[0].tipomensaje,
            });
          }
        } else {
          return console.error("Error executing query", err);
        }
      }
    );
  }
};

export const ValidarRegistrosLCL = async (req: Request, res: Response) => {
  const data = req.body;
  pool.query(
    `SELECT * FROM validar_cargamasivalcl(
      $1::varchar[],
      $2::varchar[],
      $3::varchar[],
      $4::varchar[],
      $5::varchar[],
      $6::varchar[],
      $7::varchar[],
      $8::varchar[],
      $9::varchar[],
      $10::varchar[],
      $11::varchar[]
    );`,
    [
      data.pais_origen,
      data.puerto_origen,
      data.pais_destino,
      data.puerto_destino,
      data.moneda,
      data.servicio,
      data.frecuencia,
      data.recargos,
      data.agente,
      data.vigencia_desde,
      data.vigencia_hasta,
    ],
    async (err, response, fields) => {
      if (!err) {
        if (response.rows[0].estadoflag == true) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: true,
            data: response.rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: false,
            mensaje: response.rows[0].mensaje,
            tipoMensaje: response.rows[0].tipomensaje,
          });
        }
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};

export const ValidarRegistrosFCL = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    pool.query(
      `SELECT * FROM validar_cargamasivafcl(
      $1::varchar[],
      $2::varchar[],
      $3::varchar[],
      $4::varchar[],
      $5::varchar[],
      $6::varchar[],
      $7::varchar[],
      $8::varchar[],
      $9::varchar[]
    );`,
      [
        data.pais_origen,
        data.puerto_origen,
        data.pais_destino,
        data.puerto_destino,
        data.Tipo_contenedor,
        data.moneda,
        data.Naviera,
        data.vigencia_desde,
        data.vigencia_hasta,
      ],
      async (err, response, fields) => {
        if (!err) {
          if (response.rows[0].estadoflag == true) {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: true,
              data: response.rows,
            });
          } else {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: false,
              permiso: response.rows[0].permiso_registro,
              mensaje: response.rows[0].mensaje,
              tipoMensaje: response.rows[0].tipomensaje,
            });
          }
        } else {
          return console.error("Error executing query", err);
        }
      }
    );
  } catch (error) {
    res.json({
      status: 400,
      statusBol: false,
      estadoflag: false,
      mensaje: error,
      tipoMensaje: "TMSGADV",
    });
  }
};

export const ValidarRegistrosAereo = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    pool.query(
      `SELECT * FROM validar_cargamasivaarero(
      $1::varchar[],
      $2::varchar[],
      $3::varchar[],
      $4::varchar[],
      $5::varchar[],
      $6::varchar[],
      $7::varchar[],
      $8::varchar[],
      $9::varchar[],
      $10::varchar[]
    );`,
      [
        data.pais_origen,
        data.puerto_origen,
        data.pais_destino,
        data.puerto_destino,
        data.moneda,
        data.servicio,
        data.frecuencia,
        data.agente,
        data.vigencia_desde,
        data.vigencia_hasta,
      ],
      async (err, response, fields) => {
        if (!err) {
          if (response.rows[0].estadoflag == true) {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: true,
              data: response.rows,
            });
          } else {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: false,
              permiso: response.rows[0].permiso_registro,
              mensaje: response.rows[0].mensaje,
              tipoMensaje: response.rows[0].tipomensaje,
            });
          }
        } else {
          return console.error("Error executing query", err);
        }
      }
    );
  } catch (error) {
    res.json({
      status: 400,
      statusBol: false,
      estadoflag: false,
      mensaje: error,
      tipoMensaje: "TMSGADV",
    });
  }
};

export const RegistrarCargaMasivaLCL = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    pool.query(
      `SELECT * FROM registro_tarifarios_lcl(
        $1::varchar[],
        $2::varchar[],
        $3::varchar[],
        $4::varchar[],
        $5::varchar[],
        $6::varchar[],
        $7::varchar[],
        $8::varchar[],
        $9::varchar[],
        $10::varchar[],
        $11::varchar[],
        $12::varchar[],
        $13::varchar[],
        $14::varchar[],
        $15::varchar[],
        $16::varchar[],
        $17::varchar[],
        $18,
        $19
    );`,
      [
        data.pais_origen,
        data.puerto_origen,
        data.pais_destino,
        data.puerto_destino,
        data.volumen_minimo,
        data.volumen_desde,
        data.volumen_hasta,
        data.costo_minimo,
        data.costo,
        data.moneda,
        data.servicio,
        data.frecuencia,
        data.tt_aprox,
        data.recargos,
        data.agente,
        data.vigencia_desde,
        data.vigencia_hasta,
        data.importarcionflag,
        data.sucursal,
      ],
      async (err, response, fields) => {
        if (!err) {
          if (response.rows[0].estadoflag == true) {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: true,
              data: response.rows,
            });
          } else {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: false,
              mensaje: response.rows[0].mensaje,
              tipoMensaje: response.rows[0].tipomensaje,
            });
          }
        } else {
          return console.error("Error executing query", err);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const RegistrarCargaMasivaFCL = async (req: Request, res: Response) => {
  const data = req.body;

  console.log("ddd");
  try {
    pool.query(
      `SELECT * FROM registro_tarifarios_fcl(
        $1::varchar[],
        $2::varchar[],
        $3::varchar[],
        $4::varchar[],
        $5::varchar[],
        $6::varchar[],
        $7::varchar[],
        $8::varchar[],
        $9::varchar[],
        $10::varchar[],
        $11,
        $12
    );`,
      [
        data.pais_origen,
        data.puerto_origen,
        data.pais_destino,
        data.puerto_destino,
        data.Tipo_contenedor,
        data.costo,
        data.moneda,
        data.Naviera,
        data.vigencia_desde,
        data.vigencia_hasta,
        data.importarcionflag,
        data.sucursal,
      ],
      async (err, response, fields) => {
        if (!err) {
          if (response.rows[0].estadoflag == true) {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: true,
              data: response.rows,
            });
          } else {
            res.json({
              status: 200,
              statusBol: true,
              estadoflag: false,
              mensaje: response.rows[0].mensaje,
              tipoMensaje: response.rows[0].tipomensaje,
            });
          }
        } else {
          return console.error("Error executing query", err);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const RegistrarCargaMasivaAereo = async (
  req: Request,
  res: Response
) => {
  const data = req.body;

  pool.query(
    `SELECT * FROM registro_tarifarios_aereo(
      $1::varchar[],
      $2::varchar[],
      $3::varchar[],
      $4::varchar[],
      $5::varchar[],
      $6::varchar[],
      $7::varchar[],
      $8::varchar[],
      $9::varchar[],
      $10::varchar[],
      $11::varchar[],
      $12::varchar[],
      $13::varchar[],
      $14::varchar[],
      $15::varchar[],
      $16::varchar[],
      $17::varchar[],	
      $18::boolean,
      $19::text
    );`,
    [
      data.pais_origen,
      data.puerto_origen,
      data.pais_destino,
      data.puerto_destino,
      data.volumen_minimo,
      data.volumen_desde,
      data.volumen_hasta,
      data.costo_minimo,
      data.costo,
      data.moneda,
      data.servicio,
      data.frecuencia,
      data.cortes,
      data.carrier_tt,
      data.agente,
      data.vigencia_desde,
      data.vigencia_hasta,
      data.importarcionflag,
      data.sucursal,
    ],
    async (err, response, fields) => {
      if (!err) {
        if (response.rows[0].estadoflag == true) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: true,
            data: response.rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: false,
            mensaje: response.rows[0].mensaje,
            tipoMensaje: response.rows[0].tipomensaje,
          });
        }
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};

export const CargarSucursal = async (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM paises_cargarsucursales();",

    async (err, response, fields) => {
      if (!err) {
        if (response.rows[0].estadoflag == true) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: true,
            data: response.rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: false,
            mensaje: response.rows[0].mensaje,
            tipoMensaje: response.rows[0].tipomensaje,
          });
        }
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};

export const CargarContendeores = async (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM contenedores_cargar();",

    async (err, response, fields) => {
      if (!err) {
        if (response.rows[0].estadoflag == true) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: true,
            data: response.rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: false,
            mensaje: response.rows[0].mensaje,
            tipoMensaje: response.rows[0].tipomensaje,
          });
        }
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};
export const CargarNavieras = async (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM navieras_cargar();",

    async (err, response, fields) => {
      if (!err) {
        if (response.rows[0].estadoflag == true) {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: true,
            data: response.rows,
          });
        } else {
          res.json({
            status: 200,
            statusBol: true,
            estadoflag: false,
            mensaje: response.rows[0].mensaje,
            tipoMensaje: response.rows[0].tipomensaje,
          });
        }
      } else {
        return console.error("Error executing query", err);
      }
    }
  );
};
