import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import { getTipoCostoPorEmbarque } from "../controllers/tipocosto.controller";

router.get("/tipo_costo_x_embarque", TokenValidation, getTipoCostoPorEmbarque);

export default router;
