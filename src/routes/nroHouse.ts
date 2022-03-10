import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getNroHouse } from "../controllers/nroHouse.controller";

router.post("/getNroHouse", TokenValidation, getNroHouse);

export default router;
