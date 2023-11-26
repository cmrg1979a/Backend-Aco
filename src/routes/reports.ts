import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getControlFile,
  getControlFileAllMaster,
  getControlFileAllFilter,
  getControlFileAllFilterMaster,
  createdPDF,
  getTotales,
  getTotalesAll,
  pdfInstructivo,
  pdfSolicitud,
  getReportFileDetails,
  pdfFD,
  constRexportCXPExcel,
  constReporteCXCExcel,
  getPdfInstructivoDetallado,
  exportarPDFCXP,
  exportarPDFCXC,
  ExportarConsolidadoCargaMasiva,
  exportListQuote,
  exportListQuoteEXCEL,
  exportarListProveedor,
} from "../controllers/reports.controller";

router.get("/getControlFile", TokenValidation, getControlFile);
router.post(
  "/getControlFileAllMaster",
  TokenValidation,
  getControlFileAllMaster
);
router.post("/createdPDF", TokenValidation, createdPDF);
router.post(
  "/getControlFileAllFilter",
  TokenValidation,
  getControlFileAllFilter
);

router.post(
  "/getControlFileAllFilterMaster",
  TokenValidation,
  getControlFileAllFilterMaster
);
router.post("/getTotales", TokenValidation, getTotales);
router.post("/getTotalesAll", TokenValidation, getTotalesAll);
router.post("/getPdfInstructivo", TokenValidation, pdfInstructivo);
router.post("/pdfSolicitud", TokenValidation, pdfSolicitud);
router.get("/getReportFileDetails", TokenValidation, getReportFileDetails);
router.post("/pdfFD", TokenValidation, pdfFD);
router.get("/reportcxpexcel", constRexportCXPExcel);
router.get("/reportcxcexcel", constReporteCXCExcel);
router.post("/getPdfInstructivoDetallado", getPdfInstructivoDetallado);
router.get("/exportarPDFCXP", exportarPDFCXP);
router.get("/exportarPDFCXC", exportarPDFCXC);
router.get("/consolidado_carga_masiva", ExportarConsolidadoCargaMasiva);
router.post("/export_list_quote", exportListQuote);
router.post("/export_list_quote_xls", exportListQuoteEXCEL);
router.post("/export_list_proveedor", exportarListProveedor);

export default router;
