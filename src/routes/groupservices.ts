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

router.get("/getListGroupservices/", getListGroupservices);
router.post("/insertGroupservices/", insertGroupservices);
router.get("/readGroupservices/", readGroupservices);
router.put("/updateGroupservices/", updateGroupservices);
router.put("/switchGroupservices/", switchGroupservices);

export default router;
