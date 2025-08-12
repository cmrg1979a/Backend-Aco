// src/controllers/whatsapp.controller.ts
import { Request, Response } from "express";
import client from "../services/whatsapp";
import { conexion } from "../routes/databasePGOp";

const pool = conexion();
export const enviarWhatsapp = async (req: Request, res: Response) => {
  try {
    let { email, nombre, telefono } = req.body;

    if (!client || !client.info || !client.info.wid) {
      return res.status(503).json({ error: "WhatsApp no está conectado" });
    }

    telefono = telefono.replace(/[^0-9]/g, "");
    const result = await pool.query(
      "SELECT * FROM function_obtener_codigo($1,$2);",
      [email, telefono]
    );

    const rows = result.rows;
    if (!rows[0]?.estadoflag) {
      return res.status(400).json({ error: "No se pudo obtener el código" });
    }
    const codigo = rows[0].code;
    let mensaje = `
    👋 Hola *${nombre}*, te damos la bienvenida a *calculadoradefletes.com*.

    🔐 Tu código de verificación es: *${codigo}*

    Si no solicitaste este código, puedes ignorar este mensaje.

    🚚 ¡Gracias por usar nuestro servicio!
    `;

    await client.sendMessage(`${telefono}@c.us`, mensaje);

    res.json({
      status: 200,
      statusBol: true,
      mensaje: rows[0].mensaje,
      estadoflag: rows[0].estadoflag,
    });
  } catch (err) {
    console.error("Error enviando mensaje:", err);
    res.status(500).json({ error: "Error enviando mensaje" });
  }
};
