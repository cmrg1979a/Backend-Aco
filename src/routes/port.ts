import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ActualizarPuertos,
  InsertarPuertos,
  ListarPuertos,
  getPortBegin,
  getPortEnd,
} from "../controllers/port.controller";
router.post("/getPortBegin", TokenValidation, getPortBegin);
router.post("/getPortEnd", TokenValidation, getPortEnd);
router.get("/listar_puerto", TokenValidation, ListarPuertos);
router.post("/insertar_puerto", TokenValidation, InsertarPuertos);
router.put("/actualizar_puerto", TokenValidation, ActualizarPuertos);

export default router;
