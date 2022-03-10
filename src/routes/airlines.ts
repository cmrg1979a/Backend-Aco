import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getAilrines } from "../controllers/airlines.controller";

router.post("/getAirlines", TokenValidation, getAilrines);

export default router;
