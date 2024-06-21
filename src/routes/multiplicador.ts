import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getMultiplicador,
    getListMultiplicador,
    readMultiplicador,
    updateMultiplicador,
    getCargarShipment,
    getMultiplicadorConfig,
} from "../controllers/multiplicador.controller";

router.post("/getMultiplicador", TokenValidation, getMultiplicador);

router.get("/listar_multiplicador/", TokenValidation, getListMultiplicador);
router.get("/ver_multiplicador/", TokenValidation, readMultiplicador);
router.put("/actualizar_multiplicador/", TokenValidation, updateMultiplicador);
router.get("/cargar_shipment/", TokenValidation, getCargarShipment);
router.get("/cargar_multiplicador_config", TokenValidation, getMultiplicadorConfig);

export default router;
