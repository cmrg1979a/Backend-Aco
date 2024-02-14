import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import { CargarPosicion } from "../controllers/Position.controller";

router.get("/cargar_posicion", TokenValidation, CargarPosicion);

export default router;
