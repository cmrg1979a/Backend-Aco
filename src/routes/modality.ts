import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getModality } from "../controllers/modality.controller";

router.post("/getModality", TokenValidation, getModality);

export default router;
