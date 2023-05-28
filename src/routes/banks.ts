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
  ExportarListadoReportePagos,
  RegistroPagoDetalles,
  getVerPagosInvoice,
  getActualizarPagosInvoice,
  getVerPagosCGEgresos,
  getActualizarPagosCGEgreso,
  getVerPagosIngresosInvoice,
  getVerPagosDebsClient,
  getActualizarPagosInvoiceIngreso,
  getActualizarIngresoDebsCliente,
  ExportarListadoReporteIngresos,
  ExportarListadoReporteEgresos,
  reversarCxC,
  reversarCxP,
  verPagosControlEgresos,
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
  "/getListarPayForCustomer",
  TokenValidation,
  getListarPayForCustomer
);
router.get("/getVerPagosPorCustomer", TokenValidation, getVerPagosPorCustomer);
router.get(
  "/getListaPagosXProveedorCxC/:id_cliente",
  TokenValidation,
  getListaPagosXProveedorCxC
);

router.get(
  "/exportar_listado_reporte_pagos",
  TokenValidation,
  ExportarListadoReportePagos
);
router.post("/registro_pago_detalles", TokenValidation, RegistroPagoDetalles);
router.get("/ver_pago_invoice", TokenValidation, getVerPagosInvoice);
router.get("/ver_pago_cgegreso", TokenValidation, getVerPagosCGEgresos);
router.put(
  "/actualizar_pago_invoice",
  TokenValidation,
  getActualizarPagosInvoice
);
router.put(
  "/actualizar_pago_cgegreso",
  TokenValidation,
  getActualizarPagosCGEgreso
);
router.get(
  "/ver_ingresos_invoice",
  TokenValidation,
  getVerPagosIngresosInvoice
);
router.get("/ver_ingresos_debscliente", TokenValidation, getVerPagosDebsClient);
router.put(
  "/actualizar_ingreso_invoice",
  TokenValidation,
  getActualizarPagosInvoiceIngreso
);
router.put(
  "/actualizar_ingreso_debscliente",
  TokenValidation,
  getActualizarIngresoDebsCliente
);
router.get(
  "/exportar_listado_reporte_egresos",
  // TokenValidation,
  ExportarListadoReporteEgresos
);
router.get(
  "/exportar_listado_reporte_ingresos",
  TokenValidation,
  ExportarListadoReporteIngresos
);
router.put("/reversar_debscliente", TokenValidation, reversarCxC);
router.put("/reversar_debsproveedor", TokenValidation, reversarCxP);
router.get("/ver_pagoscontrol_egresos", TokenValidation, verPagosControlEgresos);

export default router;
