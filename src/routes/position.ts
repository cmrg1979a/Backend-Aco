import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  CargarPosicion,
  ListarPosicion,
} from "../controllers/position.controller";

router.get("/cargar_posicion", TokenValidation, CargarPosicion);
router.get("/listar_posicion", TokenValidation, ListarPosicion);

export default router;
