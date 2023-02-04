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

export default router;
