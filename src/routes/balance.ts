import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import {
  arbolGastos,
  arbolIngreso,
  cargarTipoGastos,
  cargarTipoIngreso,
  cargarTipoSubGastos,
  cargarTipoSubIngreso,
  comparativo,
  detalleGanancia,
  detalleGastos,
  exportarReporteGanancias,
  resumenGanancia,
  resumenGananciaPorTipoIngreso,
  resumenGastos,
  resumenGastosxTipoGasto,
} from "../controllers/balance.controller";

router.get("/cargar_tipo_ingreso", TokenValidation, cargarTipoIngreso);
router.get("/cargar_tipo_subingreso", TokenValidation, cargarTipoSubIngreso);
router.get("/cargar_tipo_gastos", TokenValidation, cargarTipoGastos);
router.get("/cargar_tipo_subgastos", TokenValidation, cargarTipoSubGastos);
router.get("/arbol_gastos", TokenValidation, arbolGastos);
router.get("/arbol_ingresos", TokenValidation, arbolIngreso);
router.get("/detalle_ganancia", TokenValidation, detalleGanancia);
router.get("/resumen_ganancia", TokenValidation, resumenGanancia);
router.get("/detalle_gastos", TokenValidation, detalleGastos);
router.get("/resumen_gastos", TokenValidation, resumenGastos);
router.get(
  "/resumen_ingreso_tipo",
  TokenValidation,
  resumenGananciaPorTipoIngreso
);
router.get(
  "/resumen_gastos_tipogasto",
  TokenValidation,
  resumenGastosxTipoGasto
);
router.get("/excel_reporte", exportarReporteGanancias);
router.get("/generar_comparativo", comparativo);

export default router;
