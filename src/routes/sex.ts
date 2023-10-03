import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getSex,
    getListSex,
    insertSex,
    readSex,
    updateSex,
    switchSex,
    validateAcronymInTableSex,
} from "../controllers/sex.controller";

router.post("/getSex", TokenValidation, getSex);

router.get("/getListSex/", getListSex);
router.post("/insertSex/", insertSex);
router.get("/readSex/", readSex);
router.put("/updateSex/", updateSex);
router.put("/switchSex/", switchSex);
router.get("/validateAcronymInTableSex/", validateAcronymInTableSex);

export default router;
