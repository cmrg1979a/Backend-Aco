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

router.get("/getListMarketing/", getListMarketing);
router.post("/insertMarketing/", insertMarketing);
router.get("/readMarketing/", readMarketing);
router.put("/switchMarketing/", switchMarketing);
router.put("/updateMarketing/", updateMarketing);
router.get("/validatePositionMarketing/",  validatePositionMarketing);
router.get("/lastPositionMarketing/",  lastPositionMarketing);


export default router;
