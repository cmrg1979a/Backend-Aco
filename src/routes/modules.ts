import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getEntitieModules,
  getModules,
  getMenuModules,
  getGroupList
} from "../controllers/modules.controller";

router.get("/getModules", TokenValidation, getModules);
router.post("/getEntitieModules", TokenValidation, getEntitieModules);
router.post("/getMenuModules", TokenValidation, getMenuModules);
router.post("/getGroupList", TokenValidation, getGroupList);

export default router;
