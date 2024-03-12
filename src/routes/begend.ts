import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ActualizarBegend,
  InsertarBegend,
  ListBegend,
  ValidateBegendPositionActualizar,
  ValidateBegendPositionInsert,
  cargarBegend,
  getBegEndList,
} from "../controllers/begend.controller";
router.post("/getBegEndList", TokenValidation, getBegEndList);
router.post("/cargarBegend", TokenValidation, cargarBegend);
router.get("/listar_begend", TokenValidation, ListBegend);
router.post("/insertar_begend", TokenValidation, InsertarBegend);
router.put("/actualizar_begend", TokenValidation, ActualizarBegend);
router.get(
  "/validate_position_begend",
  TokenValidation,
  ValidateBegendPositionInsert
);
router.get(
  "/validate_position_actualizar_begend",
  TokenValidation,
  ValidateBegendPositionActualizar
);

export default router;
