import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getContainers,
  setHouseContainers,
  deleteContainers,
  getListContainersByBranch,
  insertContainers,
  readContainers,
  updateContainers,
  switchContainers,
} from "../controllers/containers.controller";

router.post("/getContainersList", TokenValidation, getContainers);
router.post("/setHouseContainers", TokenValidation, setHouseContainers);
router.post("/deleteContainers", TokenValidation, deleteContainers);

router.get("/getListContainersByBranch/", TokenValidation, getListContainersByBranch);
router.post("/insertContainers/", TokenValidation, insertContainers);
router.get("/readContainers/", TokenValidation, readContainers);
router.put("/updateContainers/", TokenValidation, updateContainers);
router.put("/switchContainers/", TokenValidation, switchContainers);
export default router;
