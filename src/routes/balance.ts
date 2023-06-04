import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import {
  detalleGanancia,
  detalleGastos,
  exportarReporteGanancias,
  resumenGanancia,
  resumenGastos,
} from "../controllers/balance.controller";

router.get("/detalle_ganancia", TokenValidation, detalleGanancia);
router.get("/resumen_ganancia", TokenValidation, resumenGanancia);
router.get("/detalle_gastos", TokenValidation, detalleGastos);
router.get("/resumen_gastos", TokenValidation, resumenGastos);
router.get("/excel_reporte",  exportarReporteGanancias);

export default router;
