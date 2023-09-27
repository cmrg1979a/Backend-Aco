import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getChargeYear,
    getListYear,
    insertYear,
    readYear,
    updateYear,
    deleteYear,
} from "../controllers/yearController";

router.get("/getChargeYear", TokenValidation, getChargeYear);
// router.post("/getPortEnd", TokenValidation, getPortEnd);

router.get("/getListYear/", getListYear);
router.post("/insertYear/", insertYear);
router.get("/readYear/", readYear);
router.put("/updateYear/", updateYear);
router.put("/deleteYear/", deleteYear);

export default router;
