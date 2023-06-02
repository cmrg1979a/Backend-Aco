import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import { detalleGanancia } from "../controllers/balance.controller";

router.get("/detalle_gannacia", TokenValidation, detalleGanancia);

export default router;
