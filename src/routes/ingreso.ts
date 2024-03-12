import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  ActualizarSubIngreso,
  CargarIngreso,
  InsertarSubIngreso,
  ListSubIngreso,
  ValidarCodigoSubIngreso,
  getListIngreso,
  insertIngreso,
  readIngreso,
  updateIngreso,
  validateCodeIngresoNuevo,
} from "../controllers/ingresos.controller";

router.get("/listar_ingreso/", TokenValidation, getListIngreso);
router.post("/insertar_ingreso/", TokenValidation, insertIngreso);
router.get("/ver_ingreso/", TokenValidation, readIngreso);
router.put("/actualizar_ingreso/", TokenValidation, updateIngreso);
router.get(
  "/validar_nuevo_codigo_ingreso/",
  TokenValidation,
  validateCodeIngresoNuevo
);

router.get("/cargar_ingreso", TokenValidation, CargarIngreso);
router.get("/listar_subingreso", TokenValidation, ListSubIngreso);
router.get(
  "/validate_code_subingreso",
  TokenValidation,
  ValidarCodigoSubIngreso
);
router.post("/insertar_subingreso", TokenValidation, InsertarSubIngreso);
router.put("/actualizar_subingreso", TokenValidation, ActualizarSubIngreso);
export default router;
