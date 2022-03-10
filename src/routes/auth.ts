import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import { singup, singin, validToken } from "../controllers/auth.controller";

router.post("/singin", singin);
router.post("/singup", TokenValidation, singup);
router.post("/validToken", TokenValidation, validToken);

export default router;
