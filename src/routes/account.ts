import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getTypeAccount, setAccount, getAccountsNumber, delAccount } from "../controllers/account.controller";

router.post("/getTypeAccount", TokenValidation, getTypeAccount);
router.post("/setAccount", TokenValidation, setAccount);
router.post("/delAccount/:id", TokenValidation, delAccount);
router.post("/getAccountsNumber/:id_entities", TokenValidation, getAccountsNumber);

export default router;
