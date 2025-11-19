import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar el token de WhatsApp
 * El token debe enviarse en el header: whatsapp-token
 */
export const validateWhatsAppToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("whatsapp-token");
  const validToken = process.env.WHATSAPP_API_TOKEN || "whatsapp_secret_token_2024";

  if (!token) {
    return res.status(401).json({
      status: 401,
      statusBol: false,
      mensaje: "Token de WhatsApp no proporcionado",
    });
  }

  if (token !== validToken) {
    return res.status(403).json({
      status: 403,
      statusBol: false,
      mensaje: "Token de WhatsApp inválido",
    });
  }

  next();
};
