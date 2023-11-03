import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getListGroupservices,
    insertGroupservices,
    readGroupservices,
    updateGroupservices,
} from "../controllers/groupservices.controller";

router.get("/listar_groupservices/", TokenValidation, getListGroupservices);
router.post("/insertar_groupservices/", TokenValidation, insertGroupservices);
router.get("/ver_groupservices/", TokenValidation, readGroupservices);
router.put("/actualizar_groupservices/", TokenValidation, updateGroupservices);

export default router;
