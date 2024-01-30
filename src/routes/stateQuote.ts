import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ActualizarPositionCalls,
  ListStatusQuote,
  RegistrarPositionCalls,
  validatePosition,
  validatePositionActualizar,
  validatePositionCalls,
  validatePositionCallsActualizar,
  validatePositionReport,
  validatePositionReportActualizar,
  validatePositionSelect,
  validatePositionSelectActualizar,
} from "../controllers/statusquote.controller";

router.get("/list_quote_status", TokenValidation, ListStatusQuote);
router.get("/validate_position", TokenValidation, validatePosition);
router.get(
  "/validate_position_select",
  TokenValidation,
  validatePositionSelect
);
router.get(
  "/validate_position_report",
  TokenValidation,
  validatePositionReport
);
router.get("/validate_position_calls", TokenValidation, validatePositionCalls);
router.post(
  "/insertar_position_calls",
  TokenValidation,
  RegistrarPositionCalls
);

router.get(
  "/validate_position_actualizar",
  TokenValidation,
  validatePositionActualizar
);
router.get(
  "/validate_position_select_actualizar",
  TokenValidation,
  validatePositionSelectActualizar
);
router.get(
  "/validate_position_report_actualizar",
  TokenValidation,
  validatePositionReportActualizar
);
router.get(
  "/validate_position_calls_actualizar",
  TokenValidation,
  validatePositionCallsActualizar
);
router.put(
  "/actualizar_position_calls",
  TokenValidation,
  ActualizarPositionCalls
);

export default router;
