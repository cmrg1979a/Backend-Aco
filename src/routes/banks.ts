import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getBanksList } from "../controllers/banks.controller";

router.post("/getBanksList", TokenValidation, getBanksList);

export default router;
