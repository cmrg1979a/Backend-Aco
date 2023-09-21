import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getListMarketing,
  insertMarketing,
  readMarketing,
  updateMarketing,
  deleteMarketing,
  validatePositionMarketing,
} from "../controllers/marketing.controller";

router.get("/getListMarketing/", getListMarketing);
router.post("/insertMarketing/", TokenValidation, insertMarketing);
router.get("/readMarketing/", TokenValidation, readMarketing);
router.put("/deleteMarketing/", TokenValidation, deleteMarketing);
router.put("/updateMarketing/", TokenValidation ,updateMarketing);
router.get("/validatePositionMarketing/", TokenValidation, validatePositionMarketing);


export default router;
