import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getListIngreso,
  insertIngreso,
  readIngreso,
  updateIngreso,
  validateCodeIngreso,
} from "../controllers/ingresos.controller";

router.get("/listar_ingreso/", TokenValidation, getListIngreso);
router.post("/insertar_ingreso/", TokenValidation, insertIngreso);
router.get("/ver_ingreso/", TokenValidation, readIngreso);
router.put("/actualizar_ingreso/", TokenValidation, updateIngreso);
router.get("/validar_codigo_ingreso/", TokenValidation, validateCodeIngreso);


export default router;
