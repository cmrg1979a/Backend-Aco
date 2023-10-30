import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getModality,
    getListModality,
    insertModality,
    readModality,
    updateModality,
} from "../controllers/modality.controller";

router.post("/getModality", TokenValidation, getModality);
router.get("/listar_modality/", TokenValidation, getListModality);
router.post("/insertar_modality/", TokenValidation, insertModality);
router.get("/ver_modality/", TokenValidation, readModality);
router.put("/actualizar_modality/", TokenValidation, updateModality);

export default router;
