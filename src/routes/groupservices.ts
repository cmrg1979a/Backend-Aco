import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ActualizarItemServices,
  CargarGroupservices,
  InsertarItemServices,
  ListarItemServices,
  cargarCostosPricing,
  getListGroupservices,
  insertGroupservices,
  obtenerServicioPricing,
  readGroupservices,
  updateGroupservices,
} from "../controllers/groupservices.controller";

router.get("/cargar_groupservices", TokenValidation, CargarGroupservices);
router.get("/listar_groupservices/", TokenValidation, getListGroupservices);
router.post("/insertar_groupservices/", TokenValidation, insertGroupservices);
router.get("/ver_groupservices/", TokenValidation, readGroupservices);
router.put("/actualizar_groupservices/", TokenValidation, updateGroupservices);
router.get("/listar_itemservices", TokenValidation, ListarItemServices);
router.post("/insertar_itemservices", TokenValidation, InsertarItemServices);
router.put("/actualizar_itemservices", TokenValidation, ActualizarItemServices);
router.get("/obtener_servicio_pricing", TokenValidation, obtenerServicioPricing);
router.get("/obtener_costos_pricing", TokenValidation, cargarCostosPricing);
export default router;
