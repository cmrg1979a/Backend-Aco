import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getListTransport,
    insertTransport,
    readTransport,
    updateTransport,
} from "../controllers/transport.controller";

router.get("/listar_transport", TokenValidation, getListTransport);
router.post("/insertar_transport", TokenValidation, insertTransport);
router.get("/ver_transport", TokenValidation, readTransport);
router.put("/actualizar_transport", TokenValidation, updateTransport);

export default router;
