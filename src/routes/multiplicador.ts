import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getMultiplicador,
    getListMultiplicador,
    readMultiplicador,
    updateMultiplicador,
    switchMultiplicador, 
    getCargarShipment,
} from "../controllers/multiplicador.controller";

router.post("/getMultiplicador", TokenValidation, getMultiplicador);

router.get("/getListMultiplicador/", TokenValidation, getListMultiplicador);
router.get("/readMultiplicador/", TokenValidation, readMultiplicador);
router.put("/updateMultiplicador/", TokenValidation, updateMultiplicador);
router.put("/switchMultiplicador/", TokenValidation, switchMultiplicador);
router.get("/getCargarShipment/", TokenValidation, getCargarShipment);

export default router;
