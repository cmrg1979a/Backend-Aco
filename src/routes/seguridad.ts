import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import { getValidarUsuarioAdmin } from "../controllers/seguridad.controller";

router.post("/validar_usuario_admin", TokenValidation, getValidarUsuarioAdmin);

export default router;
