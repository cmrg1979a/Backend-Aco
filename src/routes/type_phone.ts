import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getListTypePhone,
  insertTypePhone,
  readTypePhone,
  updateTypePhone,
  deleteTypePhone,
} from "../controllers/type_phone.controller";

router.get("/getListTypePhone/", getListTypePhone);
router.post("/insertTypePhone/", insertTypePhone);
router.get("/readTypePhone/", readTypePhone);
router.put("/updateTypePhone/", updateTypePhone);
router.put("/deleteTypePhone/", deleteTypePhone);

export default router;
