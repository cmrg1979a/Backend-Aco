import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getComentariosPredefinidos } from "controllers/comentarios.controller";

router.get("/getComentariosPredefinidos", TokenValidation, getComentariosPredefinidos);

export default router;
