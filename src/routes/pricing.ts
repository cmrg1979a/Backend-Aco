import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";
import cors from "cors";
const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};
const corsMiddleware = cors(corsOptions);
import {
  setQuote,
  getQuoteStatus,
  getQuoteList,
  getQuoteId,
  delQuote,
  putQuote,
  // getReportsRangeDays,
  getModulesEntities,
  setCalls,
  // updateCalls,
  getCalls,
  getCallsId,
  getInstructivoId,
  // putInstructivo,
  putPath,
  deletePath,
  setPath,
  // getQuoteCalls,
  getMarketingList,
  getQuoteCalls,
  updateQuoteRecibidoEnviado,
  cargarMasterDetalleRecibido,
  cargarMasterDetalleEnviado,
  ActualizarFolderOneDrive,
  getListCalls,
  cargarMasterDetalleNotasCotizacion,
  cargarMasterDetalleImpuestos,
} from "../controllers/pricing.controller";

router.post("/setQuote", TokenValidation, setQuote);
router.post("/getQuoteStatus", TokenValidation, getQuoteStatus);
router.post("/getQuoteList", TokenValidation, corsMiddleware, getQuoteList);
router.get("/getQuoteId", TokenValidation, getQuoteId);
router.post("/delQuote", TokenValidation, delQuote);
router.post("/putQuote/:id_quote", TokenValidation, putQuote);
// router.post("/getReportsRangeDays", TokenValidation, getReportsRangeDays);
router.post("/getModulesEntities", TokenValidation, getModulesEntities);
router.post("/setCalls", TokenValidation, setCalls);
// router.post("/updateCalls/:id", TokenValidation, updateCalls);
router.post("/getCalls", TokenValidation, getCalls);
router.post("/getCallsId/:id", TokenValidation, getCallsId);
router.post("/setPath", TokenValidation, setPath);
router.post("/putPath/:id", TokenValidation, putPath);
router.post("/listadoLlamadas", TokenValidation, getQuoteCalls);
router.post("/deletePath/:id", TokenValidation, deletePath);
router.post("/getInstructivoId/:id_quote", TokenValidation, getInstructivoId);
// router.post("/putInstructivo/:id_quote", TokenValidation, putInstructivo);
router.post("/getMarketingList", TokenValidation, getMarketingList);
router.post(
  "/cargar_master_detalle_recibido",
  TokenValidation,
  cargarMasterDetalleRecibido
);
router.post(
  "/cargar_master_detalle_enviado",
  TokenValidation,
  cargarMasterDetalleEnviado
);
router.post(
  "/cargar_master_detalle_notas_cotizacion",
  TokenValidation,
  cargarMasterDetalleNotasCotizacion
);
router.post(
  "/cargar_master_detalle_impuesto",
  TokenValidation,
  cargarMasterDetalleImpuestos
);
router.put(
  "/update_quote_recibido_enviado",
  TokenValidation,
  updateQuoteRecibidoEnviado
);
router.put(
  "/actualizar_quote_folderonedrive",
  TokenValidation,
  ActualizarFolderOneDrive
);
router.post("/listado_llamadas", TokenValidation, getListCalls);

export default router;
