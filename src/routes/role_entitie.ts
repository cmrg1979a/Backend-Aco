import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
    addEntitieRole
} from "../controllers/entitie_role.controller";

router.post("/addRoleEntitie", TokenValidation, addEntitieRole);

export default router;
