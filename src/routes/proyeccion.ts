import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import {
  aprobarProyeccion,
  copiarProyeccion,
  eliminarProyeccion,
  generarPrimeraProyeccion,
  listProyeccion,
  setProyeccion,
  updateProyeccion,
  validateProyeccionAprob,
  verProyeccion,
} from "../controllers/proyeccioncontroller";
router.post("/insertar_proyeccion", TokenValidation, setProyeccion);
router.get("/list_proyeccion", TokenValidation, listProyeccion);
router.get("/ver_proyeccion", TokenValidation, verProyeccion);
router.put("/update_proyeccion", TokenValidation, updateProyeccion);
router.put(
  "/validate_proyeccion_aprobacion",
  TokenValidation,
  validateProyeccionAprob
);
router.put("/copiar_proyeccion", TokenValidation, copiarProyeccion);
router.put("/aprobar_proyeccion", TokenValidation, aprobarProyeccion);
router.put("/eliminar_proyeccion", TokenValidation, eliminarProyeccion);
router.post("/generar_primerar_proyeccion", TokenValidation, generarPrimeraProyeccion);

export default router;
