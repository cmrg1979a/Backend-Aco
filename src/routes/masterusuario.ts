import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import cors from "cors";
import {
  cargarMasterDetalleCanal,
  cargarMasterDetalleEnviado,
  cargarMasterDetalleNotasCotizacion,
  cargarMasterDetalleRecibido,
  cargarMasterDetalleTipoProveedor,
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

export default router;



