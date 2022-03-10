import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getControlFileAll,
  getControlFileAllMaster,
  getControlFileAllFilter,
  getControlFileAllFilterMaster,
  createdPDF,
  getTotales,
  getTotalesAll,
  pdfInstructivo,
  pdfSolicitud,
  getReportFileDetails,
  pdfFD
} from "../controllers/reports.controller";

router.post("/getControlFileAll", TokenValidation, getControlFileAll);
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
router.post("/getReportFileDetails", TokenValidation, getReportFileDetails);
router.post("/pdfFD", TokenValidation, pdfFD);

export default router;
