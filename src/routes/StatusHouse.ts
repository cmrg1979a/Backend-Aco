import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import {
  eliminarComentario,
  eliminarEstatus,
  getListadoStatusHouse,
  getObtenerOrden,
  guardarOrdenEstatus,
  setGuardarStatusHouse,
} from "../controllers/StatusHouse.controller";

router.get("/listar_status_house", TokenValidation, getListadoStatusHouse);
router.get("/obtener_orden_status_house", TokenValidation, getObtenerOrden);
router.post(
  "/guardar_orden_statuscomentarios",
  TokenValidation,
  setGuardarStatusHouse
);
router.put("/guardar_orden_status", TokenValidation, guardarOrdenEstatus);
router.put("/eliminar_status", TokenValidation, eliminarEstatus);
router.put("/eliminar_comentario", TokenValidation, eliminarComentario);
export default router;
