import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getBanksList,
  getListaPagosXProveedorCxP,
  setPayForProveedor,
  getListBanksDetailsCargar,
  getListar,
  getVerPagosPorProveedor,
  setPayForCustomer,
  getListarPayForCustomer,
  getVerPagosPorCustomer,
  getListaPagosXProveedorCxC,
  // ExportarListadoReportePagos,
  RegistroPagoDetalles,
} from "../controllers/banks.controller";

router.post("/getBanksList", TokenValidation, getBanksList);
router.get(
  "/getListaPagosXProveedorCxP/:id_proveedor",
  TokenValidation,
  getListaPagosXProveedorCxP
);
router.post("/setPayForProveedor", TokenValidation, setPayForProveedor);
router.get(
  "/getListBanksDetailsCargar",
  TokenValidation,
  getListBanksDetailsCargar
);
router.get("/getListBanksDetailsCxP", TokenValidation, getListar);
router.get(
  "/getVerPagosPorProveedor",
  TokenValidation,
  getVerPagosPorProveedor
);

router.post("/setPayForCustomer", TokenValidation, setPayForCustomer);
router.get(
  "/getListarPayForCustomer/:id_branch",
  TokenValidation,
  getListarPayForCustomer
);
router.get("/getVerPagosPorCustomer", TokenValidation, getVerPagosPorCustomer);
router.get(
  "/getListaPagosXProveedorCxC/:id_cliente",
  TokenValidation,
  getListaPagosXProveedorCxC
);
// router.get("/exportar_listado_reporte_pagos", TokenValidation, ExportarListadoReportePagos);
router.post("/registro_pago_detalles", TokenValidation, RegistroPagoDetalles);
export default router;
