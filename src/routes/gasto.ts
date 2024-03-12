import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  ActualizarSubGasto,
  CargarGasto,
  InsertarSubGasto,
  ListSubGasto,
  ValidarCodigoSubGasto,
  getListGasto,
  insertGasto,
  readGasto,
  updateGasto,
  validateCodeGastoNuevo,
} from "../controllers/gasto.controller";

router.get("/listar_gasto", TokenValidation, getListGasto);
router.post("/insertar_gasto", TokenValidation, insertGasto);
router.get("/ver_gasto", TokenValidation, readGasto);
router.put("/actualizar_gasto", TokenValidation, updateGasto);
router.get(
  "/validar_nuevo_codigo_gasto",
  TokenValidation,
  validateCodeGastoNuevo
);
router.get("/cargar_gasto", TokenValidation, CargarGasto);
router.get("/listar_subgasto", TokenValidation, ListSubGasto);
router.get("/validate_code_subgasto", TokenValidation, ValidarCodigoSubGasto);
router.post("/insertar_subgasto", TokenValidation, InsertarSubGasto);
router.put("/actualizar_subgasto", TokenValidation, ActualizarSubGasto);

export default router;
