import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  ActualizarUsuarios,
  InsertarUsuarios,
  ListarUsuarios,
  cambiarEstadoUser,
  validarDocumentUsuarios,
  validarEmailtUsuarios,
  validarUsersUsuarios,
  verUsuarios,
} from "../controllers/users.controller";

router.get("/listar_usuarios", TokenValidation, ListarUsuarios);
router.get("/validate_user_usuarios", TokenValidation, validarUsersUsuarios);
router.get(
  "/validate_document_usuarios",
  TokenValidation,
  validarDocumentUsuarios
);
router.get("/validate_email_usuarios", TokenValidation, validarEmailtUsuarios);
router.post("/insertar_usuario", TokenValidation, InsertarUsuarios);
router.put("/actualizar_usuario", TokenValidation, ActualizarUsuarios);
router.get("/ver_usuario", TokenValidation, verUsuarios);
router.put("/cambiar_estado_usuario", TokenValidation, cambiarEstadoUser);

export default router;
