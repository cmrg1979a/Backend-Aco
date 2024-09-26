import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getPlanes } from "../controllers/planes.controller";

router.post("/getPlanes",  getPlanes);

export default router;
