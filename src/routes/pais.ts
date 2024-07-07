import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getPais } from "../controllers/pais.controller";

router.post("/getPais",  getPais);

export default router;
