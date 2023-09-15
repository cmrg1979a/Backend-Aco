import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import * as pg from "pg";
const { Pool } = pg;
const pool = conexion();

import { region } from "../interface/region";

export const ListRegions = async (req: Request, res: Response) => {
    const result = await pool.query("SELECT *from TABLE_REGION_list();");
    const { rows } = result;

    try {
        if (rows.length > 0) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ error: 'No se encontraron regiones.' });
        }
    } catch (error) {
        console.error('Error al listar las regiones:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });    
    }
}

export const InsertRegion = async (req: Request, res: Response) => {
    const dataObj: region = req.body;

    try {   
        const result = await pool.query("SELECT *from insertar_region($1, $2, $3, $4, $5)", [
            dataObj.code, 
            dataObj.name, 
            dataObj.description, 
            dataObj.id_loc_pais, 
            dataObj.status
        ]); 
        const { rows } = result;

        if (rows.length > 0) {
            const { status, message } = rows[0];
            return res.status(200).json({ status, message });
        } else {
            return res.status(500).json({ error: 'No se pudo insertar la región.' });
        }
        
    } catch (error) {
        console.error('Error al insertar región:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });    
    }
    
}

