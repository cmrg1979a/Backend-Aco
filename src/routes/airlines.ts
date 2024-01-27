import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ListarAirlines,
  GuardarAirlines,
  validateIATANuevo,
  validateICAONuevo,
  validateIATAEditar,
  validateICAOEditar,
  GuardarEditar,
  getAilrines,
} from "../controllers/airlines.controller";

router.get("/getAirlines", TokenValidation, getAilrines);
router.get("/listar_airlines", TokenValidation, ListarAirlines);
router.get("/validate_iata_airlines_nuevo", TokenValidation, validateIATANuevo);
router.get("/validate_icao_airlines_nuevo", TokenValidation, validateICAONuevo);
router.post("/insert_airlines", TokenValidation, GuardarAirlines);
router.get("/validate_iata_airlines_editar", TokenValidation, validateIATAEditar);
router.get("/validate_icao_airlines_editar", TokenValidation, validateICAOEditar);
router.put("/actualizar_airlines", TokenValidation, GuardarEditar);

export default router;
