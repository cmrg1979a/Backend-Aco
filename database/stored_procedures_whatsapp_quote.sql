-- =====================================================
-- STORED PROCEDURES PARA INTEGRACIÓN WHATSAPP - COTIZACIONES
-- =====================================================
-- Fecha: 2024
-- Descripción: Procedimientos para manejar cotizaciones desde WhatsApp
-- =====================================================

-- =====================================================
-- 1. BUSCAR CLIENTE POR NOMBRE Y APELLIDOS
-- =====================================================
-- Busca un cliente en Table_Entities por nombre y apellidos (case insensitive)
-- Retorna el primer cliente encontrado

CREATE OR REPLACE FUNCTION function_whatsapp_buscar_cliente_por_nombre(
    p_nombre VARCHAR,
    p_apellidos VARCHAR,
    p_id_branch INTEGER
)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER,
    names VARCHAR,
    surname VARCHAR,
    second_surname VARCHAR,
    nombrecompleto VARCHAR,
    id_branch INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TRUE AS estadoflag,
        'Cliente encontrado'::TEXT AS mensaje,
        e.id,
        e.names,
        e.surname,
        e.second_surname,
        CONCAT(e.names, ' ', COALESCE(e.surname, ''), ' ', COALESCE(e.second_surname, '')) AS nombrecompleto,
        e.id_branch
    FROM Table_Entities e
    WHERE 
        LOWER(TRIM(e.names)) = LOWER(TRIM(p_nombre))
        AND LOWER(TRIM(CONCAT(COALESCE(e.surname, ''), ' ', COALESCE(e.second_surname, '')))) = LOWER(TRIM(p_apellidos))
        AND (p_id_branch IS NULL OR e.id_branch = p_id_branch)
        AND e.status = 1  -- Solo clientes activos
    ORDER BY e.id DESC  -- Tomar el más reciente
    LIMIT 1;
    
    -- Si no se encuentra ningún cliente
    IF NOT FOUND THEN
        RETURN QUERY
        SELECT 
            FALSE AS estadoflag,
            'Cliente no encontrado'::TEXT AS mensaje,
            NULL::INTEGER AS id,
            NULL::VARCHAR AS names,
            NULL::VARCHAR AS surname,
            NULL::VARCHAR AS second_surname,
            NULL::VARCHAR AS nombrecompleto,
            NULL::INTEGER AS id_branch;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 2. BUSCAR COTIZACIÓN ACTIVA DE UN CLIENTE
-- =====================================================
-- Busca la cotización más reciente y activa de un cliente

CREATE OR REPLACE FUNCTION function_whatsapp_buscar_cotizacion_cliente(
    p_id_entitie INTEGER,
    p_id_branch INTEGER
)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER,
    quote VARCHAR,
    id_entitie INTEGER,
    peso NUMERIC,
    volumen NUMERIC,
    monto NUMERIC,
    descripcionMercancia TEXT,
    statusquote INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TRUE AS estadoflag,
        'Cotización encontrada'::TEXT AS mensaje,
        q.id,
        q.quote,
        q.id_entitie,
        q.peso,
        q.volumen,
        q.monto,
        q.descripcionMercancia,
        q.statusquote
    FROM Table_Quote q
    WHERE 
        q.id_entitie = p_id_entitie
        AND (p_id_branch IS NULL OR q.id_branch = p_id_branch)
        AND q.status = 1  -- Solo cotizaciones activas
    ORDER BY q.id DESC  -- Tomar la más reciente
    LIMIT 1;
    
    -- Si no se encuentra cotización
    IF NOT FOUND THEN
        RETURN QUERY
        SELECT 
            FALSE AS estadoflag,
            'No se encontró cotización activa para este cliente'::TEXT AS mensaje,
            NULL::INTEGER AS id,
            NULL::VARCHAR AS quote,
            NULL::INTEGER AS id_entitie,
            NULL::NUMERIC AS peso,
            NULL::NUMERIC AS volumen,
            NULL::NUMERIC AS monto,
            NULL::TEXT AS descripcionMercancia,
            NULL::INTEGER AS statusquote;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 3. ACTUALIZAR COTIZACIÓN CON DATOS DE WHATSAPP
-- =====================================================
-- Actualiza los campos peso, volumen, monto y descripción de mercancía

CREATE OR REPLACE FUNCTION function_whatsapp_actualizar_cotizacion(
    p_id_quote INTEGER,
    p_peso NUMERIC,
    p_volumen NUMERIC,
    p_monto NUMERIC,
    p_tipo_producto TEXT
)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER
) AS $$
BEGIN
    -- Actualizar la cotización
    UPDATE Table_Quote
    SET 
        peso = p_peso,
        volumen = p_volumen,
        monto = p_monto,
        descripcionMercancia = p_tipo_producto,
        updated_at = NOW()  -- Si existe este campo
    WHERE id = p_id_quote;
    
    -- Verificar si se actualizó
    IF FOUND THEN
        RETURN QUERY
        SELECT 
            TRUE AS estadoflag,
            'Cotización actualizada exitosamente desde WhatsApp'::TEXT AS mensaje,
            p_id_quote AS id;
    ELSE
        RETURN QUERY
        SELECT 
            FALSE AS estadoflag,
            'No se pudo actualizar la cotización'::TEXT AS mensaje,
            NULL::INTEGER AS id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 4. INSERTAR NUEVA COTIZACIÓN DESDE WHATSAPP
-- =====================================================
-- Crea una nueva cotización con datos mínimos desde WhatsApp

CREATE OR REPLACE FUNCTION function_whatsapp_insertar_cotizacion(
    p_id_branch INTEGER,
    p_peso NUMERIC,
    p_volumen NUMERIC,
    p_monto NUMERIC,
    p_tipo_producto TEXT,
    p_nombre VARCHAR,
    p_apellidos VARCHAR,
    p_statusquote INTEGER
)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER,
    nro_quote VARCHAR
) AS $$
DECLARE
    v_id_quote INTEGER;
    v_nro_quote VARCHAR;
    v_quote_number INTEGER;
BEGIN
    -- Generar número de cotización
    -- Obtener el último número de cotización
    SELECT COALESCE(MAX(CAST(SUBSTRING(quote FROM '[0-9]+') AS INTEGER)), 0) + 1
    INTO v_quote_number
    FROM Table_Quote
    WHERE id_branch = p_id_branch OR p_id_branch IS NULL;
    
    -- Formatear número de cotización (ejemplo: COT-000001)
    v_nro_quote := 'WA-' || LPAD(v_quote_number::TEXT, 6, '0');
    
    -- Insertar cotización
    INSERT INTO Table_Quote (
        id_branch,
        peso,
        volumen,
        monto,
        descripcionMercancia,
        quote,
        statusquote,
        status,
        created_at,
        -- Campos opcionales con NULL
        id_marketing,
        id_entitie,
        idsentido,
        idtipocarga,
        idincoterms,
        idorigen,
        iddestino,
        numerobultos,
        idVendedor,
        idProvincia,
        idDistrito,
        fullflag,
        seguro,
        proveedor,
        telefonoproveedor,
        direccionproveedor,
        ganancia,
        idPricing,
        tiporeporte,
        id_percepcionaduana
    ) VALUES (
        p_id_branch,
        p_peso,
        p_volumen,
        p_monto,
        p_tipo_producto,
        v_nro_quote,
        p_statusquote,
        1,  -- status activo
        NOW(),
        -- Todos NULL
        NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
    )
    RETURNING Table_Quote.id INTO v_id_quote;
    
    -- Retornar resultado
    RETURN QUERY
    SELECT 
        TRUE AS estadoflag,
        'Cotización creada exitosamente desde WhatsApp'::TEXT AS mensaje,
        v_id_quote AS id,
        v_nro_quote AS nro_quote;
        
EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY
        SELECT 
            FALSE AS estadoflag,
            ('Error al crear cotización: ' || SQLERRM)::TEXT AS mensaje,
            NULL::INTEGER AS id,
            NULL::VARCHAR AS nro_quote;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMENTARIOS Y NOTAS
-- =====================================================
-- 
-- IMPORTANTE: Estos stored procedures asumen la siguiente estructura:
-- 
-- Table_Entities:
--   - id (INTEGER)
--   - names (VARCHAR)
--   - surname (VARCHAR)
--   - second_surname (VARCHAR)
--   - id_branch (INTEGER)
--   - status (INTEGER)
--
-- Table_Quote:
--   - id (INTEGER)
--   - quote (VARCHAR) - Número de cotización
--   - id_branch (INTEGER)
--   - id_entitie (INTEGER)
--   - peso (NUMERIC)
--   - volumen (NUMERIC)
--   - monto (NUMERIC)
--   - descripcionMercancia (TEXT)
--   - statusquote (INTEGER)
--   - status (INTEGER)
--   - created_at (TIMESTAMP)
--   - updated_at (TIMESTAMP)
--
-- AJUSTES NECESARIOS:
-- 1. Verificar nombres exactos de columnas en tu base de datos
-- 2. Ajustar el formato de generación de número de cotización según tu lógica
-- 3. Verificar si existen campos created_at/updated_at o usar otros
-- 4. Ajustar el prefijo 'WA-' del número de cotización si lo deseas
--
-- =====================================================
