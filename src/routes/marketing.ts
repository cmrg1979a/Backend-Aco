import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getListMarketing,
  insertMarketing,
  readMarketing,
  updateMarketing,
  validatePositionMarketing,
  nextPositionMarketing,
} from "../controllers/marketing.controller";

router.get("/listar_marketing/", TokenValidation, getListMarketing);
router.post("/insertar_marketing/", TokenValidation, insertMarketing);
router.get("/ver_marketing/", TokenValidation, readMarketing);
router.put("/actualizar_marketing/", TokenValidation, updateMarketing);
router.get("/validar_posicion_marketing/", TokenValidation,  validatePositionMarketing);
router.get("/ultima_posicion_marketing/", TokenValidation,  nextPositionMarketing);


export default router;
