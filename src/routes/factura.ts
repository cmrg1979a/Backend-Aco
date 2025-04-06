import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  AnularFacutar,
  datosFactura,
  generarFactura,
  listarFactura,
  registrarFactura,
  verFacturaHouse,
} from "../controllers/factura.controller";

router.post("/generar_factura", generarFactura);
router.get("/data_factura/:id_house/:id_branch", TokenValidation, datosFactura);
router.post("/registrar_factura", TokenValidation, registrarFactura);
router.get("/listar_Factura/:id_branch", TokenValidation, listarFactura);
router.get("/ver_factura_house", TokenValidation, verFacturaHouse);
router.put("/anular_factura", TokenValidation, AnularFacutar);

export default router;
