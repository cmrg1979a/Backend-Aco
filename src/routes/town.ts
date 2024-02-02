import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ActualizarTown,
  InsertarTown,
  ListarTown,
  getTown,
} from "../controllers/town.controller";

router.post("/getTown", TokenValidation, getTown);
router.get("/listar_town", TokenValidation, ListarTown);
router.post("/insertar_town", TokenValidation, InsertarTown);
router.put("/actualizar_town", TokenValidation, ActualizarTown);

export default router;
