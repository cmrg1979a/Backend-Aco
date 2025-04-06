import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getVerConfigAviso } from "../controllers/configAvisos.controller";

router.get("/get_ver_configaviso", TokenValidation, getVerConfigAviso);
export default router;
