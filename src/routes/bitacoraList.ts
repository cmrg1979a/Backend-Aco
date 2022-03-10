import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getBitacoraList,
  getBitacoraLineal,
} from "../controllers/bitacoraList.controller";

router.post("/getBitacoraList", TokenValidation, getBitacoraList);
router.post("/getBitacoraLineal", TokenValidation, getBitacoraLineal);

export default router;
