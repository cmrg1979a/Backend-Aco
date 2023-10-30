import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getSex,
    getListSex,
    insertSex,
    readSex,
    updateSex,
    validateAcronymInTableSex,
} from "../controllers/sex.controller";

router.post("/getSex", TokenValidation, getSex);

router.get("/listar_sex/", TokenValidation, getListSex);
router.post("/insertar_sex/", TokenValidation, insertSex);
router.get("/ver_sex/", TokenValidation, readSex);
router.put("/actualizar_sex/", TokenValidation, updateSex);
router.get("/validar_acronimo_sex/", TokenValidation, validateAcronymInTableSex);

export default router;
