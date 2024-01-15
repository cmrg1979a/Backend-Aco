import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getCoinsList,
    getListCoinsByBranch,
    insertCoins,
    readCoins,
    updateCoins,
} from "../controllers/coins.controller";

router.get("/getCoinsList", TokenValidation, getCoinsList);

router.get("/listar_coins/", TokenValidation, getListCoinsByBranch);
router.post("/insertar_coins/", TokenValidation, insertCoins);
router.get("/ver_coins/", TokenValidation, readCoins);
router.put("/actualizar_coins/", TokenValidation, updateCoins);

getCoinsList;
export default router;
