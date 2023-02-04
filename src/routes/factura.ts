import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  AnularFacutar,
  datosFactura,
  generarFactura,
  listarFactura,
  registrarFactura,
} from "../controllers/factura.controller";

router.post("/factura", generarFactura);
router.get("/data_factura/:id_house/:id_branch", TokenValidation, datosFactura);
router.post("/registrar_factura", TokenValidation, registrarFactura);
router.get("/listar_Factura/:id_branch", TokenValidation, listarFactura);
router.put("/anular_factura", TokenValidation, AnularFacutar);

export default router;
