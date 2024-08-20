import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import {
  setControl,
  setIngresos,
  getIngresosList,
  getEgresosList,
  setEgresos,
  getTotalesProveedor,
  delEgresos,
  delIngresos,
  getControlList,
  editIngreso,
  editEgreso,
  getEgresosExpediente,
  getEgresosProveedorList,
  delEgregso,
  ControlGastosList,
  cargarCorrelativo,
  listarCGECcorralativo,
  cargaMasivaControlDeGasto,
  obtenerNombreCamapania,
  cuotasMasterTipoProveedorInsertarActualizar,
  setProformaFiscal,
  getFacturasFiscales,
  delProformaFiscal
} from "../controllers/controlGastos.controller";

router.post("/setControl", TokenValidation, setControl);
router.post("/setIngresos", TokenValidation, setIngresos);
router.post("/setEgresos", TokenValidation, setEgresos);
router.post("/getIngresos/:id_orders", TokenValidation, getIngresosList);
router.post("/getEgresos/:id_orders", TokenValidation, getEgresosList);
router.post(
  "/getEgresosExpediente/:id_house",
  TokenValidation,
  getEgresosExpediente
);
router.post(
  "/getEgresosDivision/:id_orders/:id_proveedor",
  TokenValidation,
  getEgresosProveedorList
);
router.post("/delIngresos/:id", TokenValidation, delIngresos);
router.post("/delEgresos/:id", TokenValidation, delEgresos);
router.post("/getControlList", TokenValidation, getControlList);
router.post(
  "/getTotalesProveedor/:id_orders",
  TokenValidation,
  getTotalesProveedor
);
router.post("/editIngreso/:id", TokenValidation, editIngreso);
router.post("/editEgreso/:id", TokenValidation, editEgreso);
router.put("/delEgregso/:id", TokenValidation, delEgregso);
router.get("/control_gastos_list", TokenValidation, ControlGastosList);
router.get("/cargar_correlativo", TokenValidation, cargarCorrelativo);
router.get("/listar_cge_corralativo", TokenValidation, listarCGECcorralativo);
router.get("/obtener_nombre_camapania", TokenValidation, obtenerNombreCamapania);
router.post(
  "/carga_masiva_controldegasto",
  TokenValidation,
  cargaMasivaControlDeGasto
);
router.post(
  "/guardar_cuotas_cge_tipo_proveedor",
  TokenValidation,
  cuotasMasterTipoProveedorInsertarActualizar
);
router.post("/setProformaFiscal", TokenValidation, setProformaFiscal);
router.get("/getFacturasFiscales", TokenValidation, getFacturasFiscales);
router.post("/delProformaFiscal/:id", TokenValidation, delProformaFiscal);

export default router;
