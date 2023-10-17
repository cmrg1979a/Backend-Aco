import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getModality,
    getListModality,
    insertModality,
    readModality,
    updateModality,
    switchModality,
} from "../controllers/modality.controller";

router.post("/getModality", TokenValidation, getModality);
router.get("/getListModality/", TokenValidation, getListModality);
router.post("/insertModality/", TokenValidation, insertModality);
router.get("/readModality/", TokenValidation, readModality);
router.put("/updateModality/", TokenValidation, updateModality);
router.put("/switchModality/", TokenValidation, switchModality);

export default router;
