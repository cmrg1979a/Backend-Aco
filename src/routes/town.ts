import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getTown } from "../controllers/town.controller";

router.post("/getTown", TokenValidation, getTown);

export default router;
