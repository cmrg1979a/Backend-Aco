import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { generarConsolidacion } from "../controllers/consolidation.controller";

router.post("/generar_consolidacion", TokenValidation, generarConsolidacion);

export default router;
