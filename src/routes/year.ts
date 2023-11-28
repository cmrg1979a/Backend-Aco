import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getChargeYear,
    getListYear,
    insertYear,
    readYear,
    updateYear,
    validateCodeInTableYear,
} from "../controllers/yearController";

router.get("/getChargeYear", TokenValidation, getChargeYear);
// router.post("/getPortEnd", TokenValidation, getPortEnd);

router.get("/listar_year/", TokenValidation, getListYear);
router.post("/insertar_year/", TokenValidation, insertYear);
router.get("/ver_year/", TokenValidation, readYear);
router.put("/actualizar_year/", TokenValidation, updateYear);
router.get("/validar_code_sex/", TokenValidation, validateCodeInTableYear);

export default router;
