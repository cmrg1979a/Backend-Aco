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
  setHouseDelete,
  getTotalHouseListAll,
  insertComentarioHouse,
  sendNotificacionHouse,
  setTrackingToken,
  getTrackingData,
  getServicesByIncoterms,
  getListarHouses,
  getVerHouse,
} from "../controllers/house.controller";

router.post("/setHouse", TokenValidation, setHouse);
router.post("/insertComentarioHouse", TokenValidation, insertComentarioHouse);
router.post("/getHouseList", TokenValidation, getHouseList);
router.post("/getHouseListId", TokenValidation, getHouseListId);
router.post("/getHouseServices", TokenValidation, getHouseServices);
router.post("/getHouseBitacora", TokenValidation, getHouseBitacora);
router.post("/getHouseContainers", TokenValidation, getHouseContainers);
router.post("/sendNotificacionHouse", TokenValidation, sendNotificacionHouse);
router.post("/getServicesByIncoterms", TokenValidation, getServicesByIncoterms);
router.get("/getHouseListAll", TokenValidation, getHouseListAll);
router.get("/getTotalHouseListAll", TokenValidation, getTotalHouseListAll);
router.get("/getTrackingData/:token", getTrackingData);
router.put("/setHouseEdit", TokenValidation, setHouseEdit);
router.put("/setHouseDelete/:id", TokenValidation, setHouseDelete);
router.put("/setTrackingToken", TokenValidation, setTrackingToken);
router.get("/listado_houses",  getListarHouses);
router.get("/house_ver",  getVerHouse);

export default router;
