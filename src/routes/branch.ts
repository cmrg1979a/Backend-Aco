import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { inactivarSucursal, listarSucursal } from "../controllers/branch.controller";

router.get("/listar_sucursal", TokenValidation, listarSucursal);
router.put("/inactivar_sucursal", TokenValidation, inactivarSucursal);

export default router;
