import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getBitacoraList,
  getBitacoraLineal,
} from "../controllers/bitacoraList.controller";

router.post("/getBitacoraList", TokenValidation, getBitacoraList);
router.get("/getBitacoraLineal", TokenValidation, getBitacoraLineal);


export default router;
