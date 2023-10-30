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
} from "../controllers/containers.controller";

router.post("/getContainersList", TokenValidation, getContainers);
router.post("/setHouseContainers", TokenValidation, setHouseContainers);
router.post("/deleteContainers", TokenValidation, deleteContainers);

router.get("/listat_containers/", TokenValidation, getListContainersByBranch);
router.post("/insertar_containers/", TokenValidation, insertContainers);
router.get("/ver_containers/", TokenValidation, readContainers);
router.put("/actualizar_containers/", TokenValidation, updateContainers);
export default router;
