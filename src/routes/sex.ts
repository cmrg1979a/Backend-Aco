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

router.get("/getListSex/", TokenValidation, getListSex);
router.post("/insertSex/", TokenValidation, insertSex);
router.get("/readSex/", TokenValidation, readSex);
router.put("/updateSex/", TokenValidation, updateSex);
router.put("/switchSex/", TokenValidation, switchSex);
router.get("/validateAcronymInTableSex/", TokenValidation, validateAcronymInTableSex);

export default router;
