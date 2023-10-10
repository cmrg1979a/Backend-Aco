import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getListMarketing,
  insertMarketing,
  readMarketing,
  updateMarketing,
  switchMarketing,
  validatePositionMarketing,
  lastPositionMarketing,
} from "../controllers/marketing.controller";

router.get("/getListMarketing/", TokenValidation, getListMarketing);
router.post("/insertMarketing/", TokenValidation, insertMarketing);
router.get("/readMarketing/", TokenValidation, readMarketing);
router.put("/switchMarketing/", TokenValidation, switchMarketing);
router.put("/updateMarketing/", TokenValidation, updateMarketing);
router.get("/validatePositionMarketing/", TokenValidation,  validatePositionMarketing);
router.get("/lastPositionMarketing/", TokenValidation,  lastPositionMarketing);


export default router;
