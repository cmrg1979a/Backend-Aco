import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getBracnh,
  getListEnterprise,
  insertEnterprise,
  readEnterprise,
  deleteEnterprise,
  updateEnterprise,
} from "../controllers/enterprise.controller";

router.post("/getBranch/:id_branch", TokenValidation, getBracnh);
router.get("/getListEnterprise/", getListEnterprise);
router.post("/insertEnterprise/", insertEnterprise);
router.get("/readEnterprise/", readEnterprise);
router.put("/deleteEnterprise/", deleteEnterprise);
router.put("/updateEnterprise/", updateEnterprise);


export default router;
