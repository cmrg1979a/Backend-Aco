import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import {
  getValidarUsuarioAdmin,
  reestablecerClave,
  setRecuperarClave,
  validarTokenRecuperarClave,
} from "../controllers/seguridad.controller";

router.post("/validar_usuario_admin", TokenValidation, getValidarUsuarioAdmin);
router.put("/recuperar_clave", setRecuperarClave);
router.get("/validar_token_recuperar_clave", validarTokenRecuperarClave);
router.put("/reestablecer_clave", reestablecerClave);

export default router;
