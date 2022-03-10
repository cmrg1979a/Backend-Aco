import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getContainers,
  setHouseContainers,
  deleteContainers,
} from "../controllers/containers.controller";

router.post("/getContainersList", TokenValidation, getContainers);
router.post("/setHouseContainers", TokenValidation, setHouseContainers);
router.post("/deleteContainers", TokenValidation, deleteContainers);

export default router;
