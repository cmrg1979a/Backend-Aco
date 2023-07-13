import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import { singup, singin, validToken, CargarBranch } from "../controllers/auth.controller";


router.post("/singin", singin);
router.post("/singup", TokenValidation, singup);
router.post("/validToken",  validToken);
router.get("/CargarBranch/:id_usuario", TokenValidation, CargarBranch);

export default router;
