import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import {
  ActualizarTypePayments,
  InsertarTypePayments,
  ListTypePayments,
} from "../controllers/typepayment.controller";

router.get("/listar_type_payments", TokenValidation, ListTypePayments);
router.post("/insertar_type_payments", TokenValidation, InsertarTypePayments);
router.put(
  "/actualizar_type_payments",
  TokenValidation,
  ActualizarTypePayments
);
export default router;
