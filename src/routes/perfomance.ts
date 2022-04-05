import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getPerformances } from "../controllers/performance.controller";

router.post("/getPerfomance", TokenValidation, getPerformances);

export default router;
