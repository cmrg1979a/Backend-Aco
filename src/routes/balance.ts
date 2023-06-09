import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import {
  arbolGastos,
  arbolIngreso,
  detalleGanancia,
  detalleGastos,
  exportarReporteGanancias,
  resumenGanancia,
  resumenGastos,
  resumenGastosxTipoGasto,
} from "../controllers/balance.controller";

router.get("/arbol_gastos", TokenValidation, arbolGastos);
router.get("/arbol_ingresos", TokenValidation, arbolIngreso);
router.get("/detalle_ganancia", TokenValidation, detalleGanancia);
router.get("/resumen_ganancia", TokenValidation, resumenGanancia);
router.get("/detalle_gastos", TokenValidation, detalleGastos);
router.get("/resumen_gastos", TokenValidation, resumenGastos);
router.get(
  "/resumen_gastos_tipogasto",
  TokenValidation,
  resumenGastosxTipoGasto
);
router.get("/excel_reporte", exportarReporteGanancias);

export default router;
