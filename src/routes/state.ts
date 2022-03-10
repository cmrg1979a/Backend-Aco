import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getState, getStatePricing } from "../controllers/state.controller";

router.post("/getState", TokenValidation, getState);
router.post("/getStatePricing", TokenValidation, getStatePricing);

export default router;
