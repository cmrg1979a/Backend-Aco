import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getSex } from "../controllers/sex.controller";

router.post("/getSex", TokenValidation, getSex);

export default router;
