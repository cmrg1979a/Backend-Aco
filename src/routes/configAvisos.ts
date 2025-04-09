import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { actualizarConfigAviso, getVerConfigAviso } from "../controllers/configAvisos.controller";

router.get("/get_ver_configaviso", TokenValidation, getVerConfigAviso);
router.put("/actualizarConfigAviso", TokenValidation, actualizarConfigAviso);
export default router;
