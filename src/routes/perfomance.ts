import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getPerformances ,
    insertPerformance,
    getListPerformance,
    updatePerformance, 
    readPerformance
} from "../controllers/performance.controller";

router.post("/getPerfomance", TokenValidation, getPerformances);
router.get("/listar_performance/", TokenValidation, getListPerformance);
router.post("/insertar_performance/", TokenValidation, insertPerformance);
router.get("/ver_performance/", TokenValidation, readPerformance);
router.put("/actualizar_performance/", TokenValidation, updatePerformance);

export default router;
