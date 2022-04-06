import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getChargeMonth } from "../controllers/monthController";

router.get("/getChargeMonth", TokenValidation, getChargeMonth);
// router.post("/getPortEnd", TokenValidation, getPortEnd);

export default router;
