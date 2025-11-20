import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

interface WhatsAppQuoteData {
  peso: number;
  volumen: number;
  monto: number;
  tipo_producto: string;
  nombre: string;
  apellidos: string;
  ha_importado_antes: boolean;
  id_branch?: number;
}

/**
 * Endpoint para recibir datos de cotización desde WhatsApp
 * POST /whatsapp/quote
 * 
 * Flujo:
 * 1. Si ha_importado_antes = true: Busca cliente por nombre+apellidos
 *    - Si encuentra: Busca su cotización y actualiza
 *    - Si no encuentra: No hace nada
 * 2. Si ha_importado_antes = false: Crea nueva cotización
 */
export const recibirCotizacionWhatsApp = async (
  req: Request,
  res: Response
) => {
  try {
    const data: WhatsAppQuoteData = req.body;

    // Validaciones básicas
    if (!data.peso || !data.volumen || !data.monto || !data.tipo_producto) {
      return res.status(400).json({
        status: 400,
        statusBol: false,
        mensaje: "Faltan datos requeridos: peso, volumen, monto, tipo_producto",
      });
    }

    if (!data.nombre || !data.apellidos) {
      return res.status(400).json({
        status: 400,
        statusBol: false,
        mensaje: "Faltan datos del cliente: nombre y apellidos",
      });
    }

    if (typeof data.ha_importado_antes !== "boolean") {
      return res.status(400).json({
        status: 400,
        statusBol: false,
        mensaje: "El campo ha_importado_antes debe ser true o false",
      });
    }

    // Usar id_branch del body o null (se puede configurar un default en el SP)
    const id_branch = data.id_branch || null;

    if (data.ha_importado_antes) {
      // CASO 1: Cliente existente - Buscar y actualizar
      await actualizarCotizacionExistente(data, id_branch, res);
    } else {
      // CASO 2: Cliente nuevo - Crear cotización
      await crearNuevaCotizacion(data, id_branch, res);
    }
  } catch (error) {
    console.error("Error en recibirCotizacionWhatsApp:", error);
    res.status(500).json({
      status: 500,
      statusBol: false,
      mensaje: "Error interno del servidor",
      error: error.message,
    });
  }
};

/**
 * Busca cliente por nombre y apellidos, luego actualiza su cotización
 */
async function actualizarCotizacionExistente(
  data: WhatsAppQuoteData,
  id_branch: number | null,
  res: Response
) {
  try {
    // 1. Buscar cliente por nombre y apellidos (case insensitive)
    const clienteResult = await pool.query(
      `SELECT * FROM function_whatsapp_buscar_cliente_por_nombre($1, $2, $3)`,
      [
        data.nombre.toLowerCase().trim(),
        data.apellidos.toLowerCase().trim(),
        id_branch,
      ]
    );

    const clientes = clienteResult.rows;

    if (!clientes || clientes.length === 0 || !clientes[0].estadoflag) {
      return res.status(404).json({
        status: 404,
        statusBol: false,
        mensaje: "Cliente no encontrado. No se realizó ninguna acción.",
      });
    }

    // Tomar el primer cliente encontrado
    const cliente = clientes[0];
    const id_entitie = cliente.id;

    // 2. Buscar cotización activa del cliente
    const quoteResult = await pool.query(
      `SELECT * FROM function_whatsapp_buscar_cotizacion_cliente($1, $2)`,
      [id_entitie, id_branch]
    );

    const quotes = quoteResult.rows;

    if (!quotes || quotes.length === 0 || !quotes[0].estadoflag) {
      return res.status(404).json({
        status: 404,
        statusBol: false,
        mensaje: "No se encontró cotización activa para este cliente.",
      });
    }

    const quote = quotes[0];
    const id_quote = quote.id;

    // 3. Actualizar cotización con los nuevos datos
    const updateResult = await pool.query(
      `SELECT * FROM function_whatsapp_actualizar_cotizacion($1, $2, $3, $4, $5)`,
      [
        id_quote,
        data.peso,
        data.volumen,
        data.monto,
        data.tipo_producto,
      ]
    );

    const updateRows = updateResult.rows;

    if (updateRows && updateRows[0].estadoflag) {
      return res.json({
        status: 200,
        statusBol: true,
        mensaje: "Cotización actualizada exitosamente",
        data: {
          id_cliente: id_entitie,
          nombre_cliente: `${cliente.names} ${cliente.surname || ""} ${cliente.second_surname || ""}`.trim(),
          id_cotizacion: id_quote,
          nro_cotizacion: quote.quote,
          datos_actualizados: {
            peso: data.peso,
            volumen: data.volumen,
            monto: data.monto,
            tipo_producto: data.tipo_producto,
          },
        },
      });
    } else {
      return res.status(400).json({
        status: 400,
        statusBol: false,
        mensaje: updateRows[0]?.mensaje || "Error al actualizar cotización",
      });
    }
  } catch (error) {
    console.error("Error en actualizarCotizacionExistente:", error);
    throw error;
  }
}

/**
 * Crea una nueva cotización sin cliente asociado
 */
async function crearNuevaCotizacion(
  data: WhatsAppQuoteData,
  id_branch: number | null,
  res: Response
) {
  try {
    // Crear cotización nueva con estado "Nuevo" (statusquote = 1)
    const result = await pool.query(
      `SELECT * FROM function_whatsapp_insertar_cotizacion($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id_branch,
        data.peso,
        data.volumen,
        data.monto,
        data.tipo_producto,
        data.nombre,
        data.apellidos,
        1, // statusquote = 1 (Nuevo)
      ]
    );

    const rows = result.rows;

    if (rows && rows[0].estadoflag) {
      return res.json({
        status: 200,
        statusBol: true,
        mensaje: "Cotización creada exitosamente",
        data: {
          id_cotizacion: rows[0].id,
          nro_cotizacion: rows[0].nro_quote,
          cliente_potencial: {
            nombre: data.nombre,
            apellidos: data.apellidos,
          },
          datos_cotizacion: {
            peso: data.peso,
            volumen: data.volumen,
            monto: data.monto,
            tipo_producto: data.tipo_producto,
          },
        },
      });
    } else {
      return res.status(400).json({
        status: 400,
        statusBol: false,
        mensaje: rows[0]?.mensaje || "Error al crear cotización",
      });
    }
  } catch (error) {
    console.error("Error en crearNuevaCotizacion:", error);
    throw error;
  }
}
