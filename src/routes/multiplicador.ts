import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getMultiplicador } from "../controllers/multiplicador.controller";

router.post("/getMultiplicador", TokenValidation, getMultiplicador);

export default router;
