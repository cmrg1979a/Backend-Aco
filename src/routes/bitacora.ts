import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  setBitacora,
  deleteBitacora,
} from "../controllers/bitacora.controller";

router.post("/setBitacora", TokenValidation, setBitacora);
router.post("/deleteBitacora", TokenValidation, deleteBitacora);

export default router;
