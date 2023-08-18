// src/routes/pdfRoutes.ts
import express, { Request, Response } from "express";
import {
  crearCarpetaEnOneDriveCotizacion,
    crearCarpetaEnOneDriveMaster,
    // subirPDFaOneDrive,
} from "../controllers/onedrive.controller";

const router = express.Router();

router.get("/crear-carpeta-cotizacion", crearCarpetaEnOneDriveCotizacion);
router.get("/crear-carpeta-master", crearCarpetaEnOneDriveMaster);

// router.post("/guardar-pdf", subirPDFaOneDrive);

export default router;
