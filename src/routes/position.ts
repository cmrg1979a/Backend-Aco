import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  CargarPosicion,
  CargarUsuarioNoAsignadoPosicion,
  ListarPosicion,
  insertarActualizarUsuarioPosicion,
  verPosicion,
} from "../controllers/position.controller";

router.get("/cargar_posicion", TokenValidation, CargarPosicion);
router.get("/listar_posicion", TokenValidation, ListarPosicion);
router.get("/ver_posicion", TokenValidation, verPosicion);
router.get(
  "/cargar_usuario_no_asignado_posicion",
  TokenValidation,
  CargarUsuarioNoAsignadoPosicion
);
router.put(
  "/insertar_actualizar_posicion",
  TokenValidation,
  insertarActualizarUsuarioPosicion
);

export default router;
