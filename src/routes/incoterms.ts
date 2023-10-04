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
router.post("/insertIncoterms/",  insertIncoterms);
router.get("/readIncoterms/",  readIncoterms);
router.put("/updateIncoterms/",  updateIncoterms);
router.put("/switchIncoterms/",  switchIncoterms);

export default router;
