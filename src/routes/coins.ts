import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getCoinsList,
    getListCoinsByBranch,
    insertCoins,
    readCoins,
    updateCoins,
    swicthCoins,
} from "../controllers/coins.controller";

router.post("/getCoinsList", TokenValidation, getCoinsList);

router.get("/getListCoinsByBranch/", TokenValidation, getListCoinsByBranch);
router.post("/insertCoins/", TokenValidation, insertCoins);
router.get("/readCoins/", TokenValidation, readCoins);
router.put("/updateCoins/", TokenValidation, updateCoins);
router.put("/swicthCoins/", TokenValidation, swicthCoins);

getCoinsList;
export default router;
