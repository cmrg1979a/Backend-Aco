import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getBegEndList } from "../controllers/begend.controller";

router.post("/getBegEndList", TokenValidation, getBegEndList);

export default router;
