import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getIncoterms,
    getListIncoterms,
    insertIncoterms,
    readIncoterms,
    updateIncoterms,
} from "../controllers/iconterms.controller";

router.post("/getIncoterms", TokenValidation, getIncoterms);

router.get("/listar_incoterms/", TokenValidation, getListIncoterms);
router.post("/insertar_incoterms/", TokenValidation,  insertIncoterms);
router.get("/ver_incoterms/", TokenValidation,  readIncoterms);
router.put("/actualizar_incoterms/", TokenValidation,  updateIncoterms);

export default router;
