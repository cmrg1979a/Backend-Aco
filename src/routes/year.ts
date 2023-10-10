import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getChargeYear,
    getListYear,
    insertYear,
    readYear,
    updateYear,
    switchYear,
    validateCodeYear
} from "../controllers/yearController";

router.get("/getChargeYear", TokenValidation, getChargeYear);
// router.post("/getPortEnd", TokenValidation, getPortEnd);

router.get("/getListYear/", TokenValidation, getListYear);
router.post("/insertYear/", TokenValidation, insertYear);
router.get("/readYear/", TokenValidation, readYear);
router.put("/updateYear/", TokenValidation, updateYear);
router.put("/switchYear/", TokenValidation, switchYear);
router.get("/validateCodeYear/", TokenValidation, validateCodeYear);


export default router;
