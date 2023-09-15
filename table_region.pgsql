

SELECT *FROM loc_state

-- LISTAR | FILTRAR
drop function if exists listar_regiones;
CREATE OR REPLACE FUNCTION listar_regiones(
    p_search_code VARCHAR(50),
    p_search_name VARCHAR(255),
    p_search_description VARCHAR(255),
    p_search_id_loc_pais INTEGER,
    p_search_status BOOLEAN
)
RETURNS table
(
    code VARCHAR,
    name VARCHAR,
    description VARCHAR,
    pais_name VARCHAR,
    status BOOLEAN	,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
-- DB: FF
    RETURN QUERY
    SELECT 
        lp.name as pais_name,
        tr.code,
        tr.name,
        tr.description,
        tr.status,
        tr.created_at,
        tr.updated_at
        FROM table_region tr
            INNER JOIN loc_pais lp ON lp.id = tr.id_loc_pais
        WHERE
            (p_search_status IS NULL OR tr.status = p_search_status) AND
            (p_search_code IS NULL OR tr.code = p_search_code) AND
            (p_search_name IS NULL OR tr.name = p_search_name) AND
            (p_search_description IS NULL OR tr.description = p_search_description) AND
            (p_search_id_loc_pais IS NULL OR tr.id_loc_pais = p_search_id_loc_pais);
END
$$ LANGUAGE 'plpgsql' security definer set search_path = public, pg_temp;


-- INSERTAR
drop function if exists insertar_region;
CREATE OR REPLACE FUNCTION insertar_region(
    p_code VARCHAR(50),
    p_name VARCHAR(255),
    p_description VARCHAR(255),
    p_id_loc_pais INTEGER,
    p_status BOOLEAN
) RETURNS table (status boolean, message text) AS $$
BEGIN
-- DB: FF
    INSERT INTO table_region (code, name, description, id_loc_pais, status)
    VALUES (p_code, p_name, p_description, p_id_loc_pais, p_status);

    RETURN QUERY SELECT true, 'Registro exitoso.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;

-- MODIFICAR
drop function if exists editar_region;
CREATE OR REPLACE FUNCTION editar_region(
    p_id INTEGER,
    p_new_id_loc_pais INTEGER,
    p_new_code VARCHAR(50),
    p_new_name VARCHAR(255),
    p_new_description VARCHAR(255),
    p_new_status BOOLEAN
) RETURNS (status boolean, message text) AS $$
BEGIN
-- DB: FF
    UPDATE table_region
    SET
        code = p_new_code,
        name = p_new_name,
        description = p_new_description,
        id_loc_pais = p_new_id_loc_pais,
        status = p_new_status
        updated_at = CURRENT_TIMESTAMP
    WHERE
        id = p_id;
    RETURN QUERY SELECT true, 'Actualización exitosa.'
END;
$$ LANGUAGE plpgsql;

-- VER
drop function if exists ver_region;
CREATE OR REPLACE FUNCTION ver_region(
    p_id INTEGER
)
RETURNS table
(
    code VARCHAR,
    name VARCHAR,
    description VARCHAR,
    pais_name VARCHAR,
    status BOOLEAN	,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
-- DB: FF
    RETURN QUERY
    SELECT 
        lp.name as pais_name,
        tr.code,
        tr.name,
        tr.description,
        tr.status,
        tr.created_at,
        tr.updated_at
        FROM table_region tr
        INNER JOIN loc_pais lp ON lp.id = tr.id_loc_pais
        WHERE tr.id = p_id
    
END
$$ LANGUAGE 'plpgsql' security definer set search_path = public, pg_temp;

-- ELIMINAR
drop function if exists eliminar_region;
CREATE OR REPLACE FUNCTION eliminar_region(
    p_id INTEGER
) RETURNS (status boolean, message text) AS $$
BEGIN
-- DB: FF
    UPDATE table_region
    SET
        status = false
        updated_at = CURRENT_TIMESTAMP
    WHERE
        id = p_id;
    RETURN QUERY SELECT true, 'Eliminación exitosa.'
END;
$$ LANGUAGE plpgsql;

-- SWITCH
drop function if exists swicth_region;
CREATE OR REPLACE FUNCTION swicth_region(
    p_id INTEGER,
    p_new_status BOOLEAN
) RETURNS (status boolean, message text) AS $$
BEGIN
-- DB: FF
    UPDATE table_region
    SET
        status = p_new_status
        updated_at = CURRENT_TIMESTAMP
    WHERE
        id = p_id;

    RETURN QUERY SELECT true, 
        CASE WHEN p_new_status THEN 'Activado' ELSE 'Desactivado' END AS message;
END;
$$ LANGUAGE plpgsql;

-- examples

select *from insertar_region(
    p_code := '01000',
    p_name := 'Chachapoyas',
    p_description := 'Chachapoyas',
    p_id_loc_pais := 139,
    p_status := true
);

select *from listar_regiones(
    p_search_code := NULL,
    p_search_name := NULL,
    p_search_description := NULL,
    p_search_id_loc_pais := NULL,
    p_search_status := NULL
);

-- uuu
