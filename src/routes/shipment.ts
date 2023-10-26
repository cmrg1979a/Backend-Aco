import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getShipment,
    getListShipment,
    insertShipment,
    readShipment,
    updateShipment,
    switchShipment,
    getCargarTransport,
} from "../controllers/shipment.controller";

router.post("/getShipment", TokenValidation, getShipment);

router.get("/getListShipment/", TokenValidation, getListShipment);
router.post("/insertShipment/", TokenValidation, insertShipment);
router.get("/readShipment/", TokenValidation, readShipment);
router.put("/updateShipment/", TokenValidation, updateShipment);
router.put("/switchShipment/", TokenValidation, switchShipment);
router.get("/getCargarTransport/", TokenValidation, getCargarTransport);

export default router;
