import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getListGasto,
  insertGasto,
  readGasto,
  updateGasto,
  validateCodeGasto,
} from "../controllers/gasto.controller";

router.get("/listar_gasto/", TokenValidation, getListGasto);
router.post("/insertar_gasto/", TokenValidation, insertGasto);
router.get("/ver_gasto/", TokenValidation, readGasto);
router.put("/actualizar_gasto/", TokenValidation, updateGasto);
router.get("/validar_codigo_gasto/", TokenValidation, validateCodeGasto);


export default router;
