import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import { listProyeccion, setProyeccion } from "../controllers/proyeccioncontroller";
router.post("/insertar_proyeccion", TokenValidation, setProyeccion);
router.get("/list_proyeccion", TokenValidation, listProyeccion);

export default router;
