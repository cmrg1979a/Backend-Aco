import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getListIngreso,
  insertIngreso,
  readIngreso,
  switchIngreso,
  updateIngreso,
  validateCodeIngreso,
} from "../controllers/ingresos.controller";

router.get("/getListIngresos/", TokenValidation, getListIngreso);
router.post("/insertIngreso/", TokenValidation, insertIngreso);
router.get("/readIngreso/", TokenValidation, readIngreso);
router.put("/switchIngreso/", TokenValidation, switchIngreso);
router.put("/updateIngreso/", TokenValidation, updateIngreso);
router.get("/validateCodeIngreso/", TokenValidation, validateCodeIngreso);


export default router;
