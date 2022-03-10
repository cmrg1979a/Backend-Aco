import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import {
  setHouse,
  getHouseList,
  getHouseListAll,
  getHouseListId,
  getHouseServices,
  getHouseBitacora,
  getHouseContainers,
  setHouseEdit,
} from "../controllers/house.controller";

router.post("/setHouse", TokenValidation, setHouse);
router.post("/getHouseList", TokenValidation, getHouseList);
router.post("/getHouseListAll", TokenValidation, getHouseListAll);
router.post("/getHouseListId", TokenValidation, getHouseListId);
router.post("/getHouseServices", TokenValidation, getHouseServices);
router.post("/getHouseBitacora", TokenValidation, getHouseBitacora);
router.post("/getHouseContainers", TokenValidation, getHouseContainers);
router.post("/setHouseEdit/:id", TokenValidation, setHouseEdit);

export default router;
