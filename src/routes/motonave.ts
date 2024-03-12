import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ActualizarMotonave,
  InsertarMotonave,
  ListarMotonave,
  getMotonave,
} from "../controllers/motonave.controller";

router.get("/getMotonave", TokenValidation, getMotonave);
router.get("/listar_motonave", TokenValidation, ListarMotonave);
router.post("/insertar_motonave", TokenValidation, InsertarMotonave);
router.put("/actualizar_motonave", TokenValidation, ActualizarMotonave);

export default router;
