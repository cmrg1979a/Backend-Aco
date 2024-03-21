import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  setBitacora,
  deleteBitacora,
  changeStatusBitacora,
} from "../controllers/bitacora.controller";

router.post("/setBitacora", TokenValidation, setBitacora);
router.post("/deleteBitacora", TokenValidation, deleteBitacora);
router.put("/changeStatusBitacora", TokenValidation, changeStatusBitacora);

export default router;
