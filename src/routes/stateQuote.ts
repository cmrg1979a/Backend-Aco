import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  ActualizarPositionCalls,
  ListStatusQuote,
  MaxPositionQuoteStatus,
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
router.get("/max_position_quote_status", TokenValidation, MaxPositionQuoteStatus);
router.get(
  "/validate_position_status_quote",
  TokenValidation,
  validatePosition
);
router.get(
  "/validate_position_select_status_quote",
  TokenValidation,
  validatePositionSelect
);
router.get(
  "/validate_position_report_status_quote",
  TokenValidation,
  validatePositionReport
);
router.get("/validate_position_calls_status_quote", TokenValidation, validatePositionCalls);
router.post(
  "/insertar_position_calls",
  TokenValidation,
  RegistrarPositionCalls
);

router.get(
  "/validate_position_actualizar_status_quote",
  TokenValidation,
  validatePositionActualizar
);
router.get(
  "/validate_position_select_actualizar_status_quote",
  TokenValidation,
  validatePositionSelectActualizar
);
router.get(
  "/validate_position_report_actualizar_status_quote",
  TokenValidation,
  validatePositionReportActualizar
);
router.get(
  "/validate_position_calls_actualizar_status_quote",
  TokenValidation,
  validatePositionCallsActualizar
);
router.put(
  "/actualizar_position_calls",
  TokenValidation,
  ActualizarPositionCalls
);

export default router;
