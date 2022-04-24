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

export default router;
