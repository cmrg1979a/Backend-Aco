import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getCoinsList } from "../controllers/coins.controller";

router.post("/getCoinsList", TokenValidation, getCoinsList);
getCoinsList;
export default router;
