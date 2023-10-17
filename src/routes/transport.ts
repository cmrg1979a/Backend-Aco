import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getListTransport,
    insertTransport,
    readTransport,
    updateTransport,
    switchTransport,
} from "../controllers/transport.controller";

router.get("/getListTransport/", TokenValidation, getListTransport);
router.post("/insertTransport/", TokenValidation, insertTransport);
router.get("/readTransport/", TokenValidation, readTransport);
router.put("/updateTransport/", TokenValidation, updateTransport);
router.put("/switchTransport/", TokenValidation, switchTransport);

export default router;
