import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getModuleRole, getRole, editRole } from "../controllers/role.controller";

router.post("/getModuleRole", TokenValidation, getModuleRole);
router.post("/getRole", TokenValidation, getRole);
router.post("/editRole/:id_entities", TokenValidation, editRole);

export default router;
