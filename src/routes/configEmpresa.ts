import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  GuardarExisteDatosConfig,
  ObtenerExisteDatosConfig,
} from "../controllers/configempresa.controller";

router.get(
  "/obtener_existe_datos_config",
  TokenValidation,
  ObtenerExisteDatosConfig
);

router.post(
  "/guardar_existe_datos_config",
  TokenValidation,
  GuardarExisteDatosConfig
);

export default router;
