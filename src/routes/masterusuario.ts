import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import cors from "cors";
import {
  ActualizarMasterDetalle,
  InsertarMasterDetalleImpuestos,
  InsertarMasterDetalleNotasCotizacion,
  InsertarMasterDetalleTipoTelefono,
  ListarMasterDetalleImpuestos,
  ListarMasterDetalleTNotasCotizacion,
  ListarMasterDetalleTipoTelefonos,
  cargarMasterDetalleCanal,
  cargarMasterDetalleEnviado,
  cargarMasterDetalleImpuestos,
  cargarMasterDetalleNotasCotizacion,
  cargarMasterDetalleRecibido,
  cargarMasterDetalleTipoProveedor,
  cargarPercepcionAduana,
  cargarTipoTelefonoPersona,
  cargarTipoTransaccion,
  cargarTipoPersona,
} from "../controllers/masterusuario.controller";
const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

router.post(
  "/cargar_master_detalle_recibido",
  TokenValidation,
  cargarMasterDetalleRecibido
);
router.post(
  "/cargar_master_detalle_enviado",
  TokenValidation,
  cargarMasterDetalleEnviado
);
router.post(
  "/cargar_master_detalle_notas_cotizacion",
  TokenValidation,
  cargarMasterDetalleNotasCotizacion
);
router.post(
  "/cargar_master_detalle_canal",
  TokenValidation,
  cargarMasterDetalleCanal
);
router.post(
  "/cargar_master_detalle_tipo_proveedor",
  TokenValidation,
  cargarMasterDetalleTipoProveedor
);
router.get(
  "/cargar_master_detalle_percepcion_aduana",
  TokenValidation,
  cargarPercepcionAduana
);

router.get(
  "/cargar_master_detalle_tipo_percepcion",
  TokenValidation,
  cargarTipoTransaccion
);
router.get(
  "/cargar_master_detalle_tipo_telefono",
  TokenValidation,
  cargarTipoTelefonoPersona
);

router.post(
  "/cargar_master_detalle_impuesto",
  TokenValidation,
  cargarMasterDetalleImpuestos
);
router.get(
  "/listar_master_detalle_impuesto",
  TokenValidation,
  ListarMasterDetalleImpuestos
);
router.post(
  "/insertar_master_detalle_impuesto",
  TokenValidation,
  InsertarMasterDetalleImpuestos
);
router.put(
  "/actualizar_master_detalle",
  TokenValidation,
  ActualizarMasterDetalle
);
router.get(
  "/listar_master_detalle_tipotelefono",
  TokenValidation,
  ListarMasterDetalleTipoTelefonos
);
router.post(
  "/insertar_master_detalle_tipotelefono",
  TokenValidation,
  InsertarMasterDetalleTipoTelefono
);
router.get(
  "/listar_master_detalle_notas_cotizacion",
  TokenValidation,
  ListarMasterDetalleTNotasCotizacion
);
router.post(
  "/insertar_master_detalle_notas_cotizacion",
  TokenValidation,
  InsertarMasterDetalleNotasCotizacion
);

router.get(
  "/cargar_master_detalle_tipo_persona",
  TokenValidation,
  cargarTipoPersona
);

export default router;
