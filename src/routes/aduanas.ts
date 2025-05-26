import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  actualizarAduana,
  aduanaUnificar,
  aprobarCotizacionAduana,
  cargarListadoQuoteAduana,
  getAduanaList,
  getAduanaVer,
  getInstructivoIdAduana,
  getListCallsAduana,
  obtenerAduanaParaUnificar,
  obtenerCotizacionParaUnificar,
  obtenerListadoServiciosAduanaQuote,
  setAduana,
  setCallsAduana,
  updateAduanaRecibidoEnviado,
} from "../controllers/aduanas.controller";


router.get(
  "/obtenerListadoServiciosAduanaQuote",
  TokenValidation,
  obtenerListadoServiciosAduanaQuote
);
router.post("/insert_aduana", TokenValidation, setAduana);
router.get("/listar_aduana", TokenValidation, getAduanaList);
router.get("/cargar__quote_aduana", TokenValidation, cargarListadoQuoteAduana);
router.get("/ver_aduana", TokenValidation, getAduanaVer);
router.put("/actualizar_aduana", TokenValidation, actualizarAduana);
router.get(
  "/obtener_cotizacion_unificar",
  TokenValidation,
  obtenerCotizacionParaUnificar
);
router.get(
  "/obtener_aduana_unificar",
  TokenValidation,
  obtenerAduanaParaUnificar
);
router.post("/aduana_unificar", TokenValidation, aduanaUnificar);
router.put(
  "/update_aduana_recibido_enviado",
  TokenValidation,
  updateAduanaRecibidoEnviado
);
router.post("/set_calls_aduana", TokenValidation, setCallsAduana);
router.put("/aprobar_cotizacion_aduana", TokenValidation, aprobarCotizacionAduana);

router.get(
  "/list_calls_aduana",
  TokenValidation,
  getListCallsAduana
);

router.post("/getInstructivoIdAduana/:id_quote", TokenValidation, getInstructivoIdAduana);
export default router;


