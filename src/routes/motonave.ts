import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ActualizarMotonave,
  InsertarMontonave,
  ListarMontonave,
  getMotonave,
} from "../controllers/motonave.controller";

router.get("/getMotonave", TokenValidation, getMotonave);
router.get("/listar_motonave", TokenValidation, ListarMontonave);
router.post("/insertar_motonave", TokenValidation, InsertarMontonave);
router.put("/actualizar_motonave", TokenValidation, ActualizarMotonave);

export default router;
