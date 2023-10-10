import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getIncoterms,
    getListIncoterms,
    insertIncoterms,
    readIncoterms,
    updateIncoterms,
    switchIncoterms,
} from "../controllers/iconterms.controller";

router.post("/getIncoterms", TokenValidation, getIncoterms);

router.get("/getListIncoterms/", TokenValidation, getListIncoterms);
router.post("/insertIncoterms/", TokenValidation,  insertIncoterms);
router.get("/readIncoterms/", TokenValidation,  readIncoterms);
router.put("/updateIncoterms/", TokenValidation,  updateIncoterms);
router.put("/switchIncoterms/", TokenValidation,  switchIncoterms);

export default router;
