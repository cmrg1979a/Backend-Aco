import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ActualizarCity,
  InsertarCity,
  ListarCity,
  getCity,
} from "../controllers/city.controller";

router.post("/getCity", TokenValidation, getCity);
router.get("/listar_city", TokenValidation, ListarCity);
router.post("/insertar_city", TokenValidation, InsertarCity);
router.put("/actualizar_city", TokenValidation, ActualizarCity);

export default router;
