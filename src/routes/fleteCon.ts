import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getFleteCon } from "../controllers/fleteCon.controller";

router.post("/getFleteCon", TokenValidation, getFleteCon);

export default router;
