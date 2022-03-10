import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getShipment } from "../controllers/shipment.controller";

router.post("/getShipment", TokenValidation, getShipment);

export default router;
