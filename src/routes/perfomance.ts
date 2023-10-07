import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getPerformances ,
    insertPerformance,
    getListPerformance,
    switchPerformance,
    updatePerformance, 
    readPerformance
} from "../controllers/performance.controller";

router.post("/getPerfomance", TokenValidation, getPerformances);
router.get("/getListPerformance/", TokenValidation, getListPerformance);
router.post("/insertPerformance/", TokenValidation, insertPerformance);
router.get("/readPerformance/", TokenValidation, readPerformance);
router.put("/updatePerformance/", TokenValidation, updatePerformance);
router.put("/switchPerformance/", TokenValidation, switchPerformance);

export default router;
