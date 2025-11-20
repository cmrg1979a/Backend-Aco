import { Router } from "express";
const router: Router = Router();
import { recibirCotizacionWhatsApp } from "../controllers/whatsappQuote.controller";
import { validateWhatsAppToken } from "../middleware/whatsappTokenMiddleware";

/**
 * Ruta para recibir cotizaciones desde WhatsApp
 * Requiere token de autenticación en el header: whatsapp-token
 */
router.post("/whatsapp/quote", validateWhatsAppToken, recibirCotizacionWhatsApp);

export default router;
