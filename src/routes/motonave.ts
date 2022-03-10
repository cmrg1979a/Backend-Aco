import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getMotonave } from "../controllers/motonave.controller";

router.post("/getMotonave", TokenValidation, getMotonave);

export default router;
