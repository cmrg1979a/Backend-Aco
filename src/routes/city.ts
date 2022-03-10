import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getCity, getCityPricing } from "../controllers/city.controller";

router.post("/getCity", TokenValidation, getCity);
router.post("/getCityPricing", TokenValidation, getCityPricing);

export default router;
