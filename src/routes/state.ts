import { Router } from "express";
const router: Router = Router();

import {
  getCargarState,
  ListarState,
  InsertarState,
  ActualizarState,
} from "../controllers/state.controller";

router.get("/cargar_state", getCargarState);
router.get("/listar_state", ListarState);
router.post("/insertar_state", InsertarState);
router.put("/actualizar_state", ActualizarState);

export default router;
