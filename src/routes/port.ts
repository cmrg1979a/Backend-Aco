import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getPortBegin, getPortEnd } from "../controllers/port.controller";

router.post("/getPortBegin", TokenValidation, getPortBegin);
router.post("/getPortEnd", TokenValidation, getPortEnd);

export default router;
