import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import {
  getListadoStatusHouse,
  getObtenerOrden,
  guardarOrdenEstatus,
  setGuardarStatusHouse,
} from "../controllers/StatusHouse.controller";

router.get("/listar_status_house", TokenValidation, getListadoStatusHouse);
router.get("/obtener_orden_status_house", getObtenerOrden);
router.post("/guardar_orden_statuscomentarios", setGuardarStatusHouse);
router.put("/guardar_orden_status", guardarOrdenEstatus);
export default router;
