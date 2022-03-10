import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getIncoterms } from "../controllers/iconterms.controller";

router.post("/getIncoterms", TokenValidation, getIncoterms);

export default router;
