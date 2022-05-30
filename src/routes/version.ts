import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import { getVersion } from "../controllers/version.controller";

router.post("/getVersion", getVersion);

export default router;
