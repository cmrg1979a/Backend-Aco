import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getNroMaster } from "../controllers/nroMaster.controller";

router.post("/getNroMaster", TokenValidation, getNroMaster);

export default router;
