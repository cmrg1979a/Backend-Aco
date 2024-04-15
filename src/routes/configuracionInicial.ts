import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import {
  actualizarDatosAdministradorConfig,
  actualizarDatosCMCliente,
  actualizarDatosCMProveedor,
  actualizarDatosEmpresaConfig,
  envioMSGWhathapp,
  guardarCostosConfig,
  obtenerConfigCostos,
} from "../controllers/configuracioninicial.controller";

router.put(
  "/actualizar_datos_empresa_config",
  TokenValidation,
  actualizarDatosEmpresaConfig
);
router.put(
  "/actualizar_datos_administrador_config",
  TokenValidation,
  actualizarDatosAdministradorConfig
);
router.post(
  "/actualizar_datos_cm_proveedor",
  TokenValidation,
  actualizarDatosCMProveedor
);
router.post(
  "/actualizar_datos_cm_cliente",
  TokenValidation,
  actualizarDatosCMCliente
);
router.get(
  "/obtener_config_costos",
  TokenValidation,
  obtenerConfigCostos
);
router.post(
  "/guardar_costos_config",
  TokenValidation,
  guardarCostosConfig
);
router.get(
  "/enviar_codigo_validacion",
  envioMSGWhathapp
);
export default router;
