import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getListGasto,
  insertGasto,
  readGasto,
  switchGasto,
  updateGasto,
  validateCodeGasto,
} from "../controllers/gasto.controller";

router.get("/getListGasto/", TokenValidation, getListGasto);
router.post("/insertGasto/", TokenValidation, insertGasto);
router.get("/readGasto/", TokenValidation, readGasto);
router.put("/switchGasto/", TokenValidation, switchGasto);
router.put("/updateGasto/", TokenValidation, updateGasto);
router.get("/validateCodeGasto/", TokenValidation, validateCodeGasto);


export default router;
