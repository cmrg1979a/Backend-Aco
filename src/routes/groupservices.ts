import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getListGroupservices,
    insertGroupservices,
    readGroupservices,
    updateGroupservices,
    switchGroupservices,
} from "../controllers/groupservices.controller";

router.get("/getListGroupservices/", TokenValidation, getListGroupservices);
router.post("/insertGroupservices/", TokenValidation, insertGroupservices);
router.get("/readGroupservices/", TokenValidation, readGroupservices);
router.put("/updateGroupservices/", TokenValidation, updateGroupservices);
router.put("/switchGroupservices/", TokenValidation, switchGroupservices);

export default router;
