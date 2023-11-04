import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getShipment,
    getListShipment,
    insertShipment,
    readShipment,
    updateShipment,
    getCargarTransport,
} from "../controllers/shipment.controller";

router.post("/getShipment", TokenValidation, getShipment);

router.get("/listar_shipment/", TokenValidation, getListShipment);
router.post("/insertar_shipment/", TokenValidation, insertShipment);
router.get("/ver_shipment/", TokenValidation, readShipment);
router.put("/actualizar_shipment/", TokenValidation, updateShipment);
router.get("/cargar_transports/", TokenValidation, getCargarTransport);

export default router;
