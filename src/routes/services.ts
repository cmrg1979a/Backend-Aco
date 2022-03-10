import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  setServices,
  deleteServices,
  activeServices,
  inactiveServices,
  editServices,
} from "../controllers/services.controller";

router.post("/setServices", TokenValidation, setServices);
router.post("/deleteServices", TokenValidation, deleteServices);
router.post("/activeServices", TokenValidation, activeServices);
router.post("/inactiveServices", TokenValidation, inactiveServices);
router.post("/editServices", TokenValidation, editServices);

export default router;
