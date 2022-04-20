import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getBanksList,
  getListaPagosXProveedorCxP,
  setPayForProveedor,
} from "../controllers/banks.controller";

router.post("/getBanksList", TokenValidation, getBanksList);
router.get(
  "/getListaPagosXProveedorCxP/:id_proveedor",
  TokenValidation,
  getListaPagosXProveedorCxP
  );
  router.post("/setPayForProveedor", TokenValidation, setPayForProveedor);

export default router;
