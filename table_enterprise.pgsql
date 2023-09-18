-- table enterprise
ALTER TABLE table_enterprise
ADD code varchar(50);

ALTER TABLE table_enterprise
ADD id_branch INTEGER;

ALTER TABLE table_enterprise
ALTER COLUMN ic TYPE VARCHAR(255);

CREATE SEQUENCE empresa_code_seq;

-- select id, status, document, TO_CHAR(created_at, 'DD/MM/YY') from table_enterprise
-- select *from loc_pais;
-- select *from loc_state;
-- select *from loc_city;
-- select *from loc_town;
-- select *from table_documents;


-- LIST | FILTER
drop function if exists function_list_enterprise;
CREATE OR REPLACE FUNCTION function_list_enterprise(
    p_search_branch INTEGER,
    p_search_document BIGINT,
    p_search_trade_name VARCHAR,
    p_search_business_name VARCHAR,
    p_search_address VARCHAR,
    p_search_status INTEGER,
    p_search_id_pais INTEGER,
    p_search_id_state INTEGER,
    p_search_id_city INTEGER,
    p_search_id_town INTEGER,
    p_search_id_document INTEGER
)
RETURNS table
(
    id INTEGER,
    code VARCHAR,
    document BIGINT,
    trade_name VARCHAR,
    business_name VARCHAR,
    address VARCHAR,
    status INTEGER,
    lp_name VARCHAR,
    ls_name VARCHAR,
    lc_name VARCHAR,
    lt_name VARCHAR,
    td_name VARCHAR,
    created_at TEXT,
    updated_at TEXT
) AS $$
BEGIN
-- DB: FF
    RETURN QUERY
    SELECT 
        te.id,
        te.code,
        te.document,
        te.trade_name,
        te.business_name,
        te.address,
        te.status,
        lp.name as lp_name,
        ls.name as ls_name,
        lc.name as lc_name,
        lt.name as lt_name,
        td.name as td_name,
        TO_CHAR(te.created_at, 'DD/MM/YY'),
        TO_CHAR(te.updated_at, 'DD/MM/YY')
        FROM table_enterprise te
            INNER JOIN loc_pais lp ON lp.id = te.id_pais
            INNER JOIN loc_state ls ON ls.id = te.id_state
            INNER JOIN loc_city lc ON lc.id = te.id_city
            INNER JOIN loc_town lt ON lt.id = te.id_town
            INNER JOIN table_documents td ON td.id = te.id_document
        WHERE
            (te.status = 1) AND (te.id_branch = p_search_branch) AND
            (p_search_document IS NULL OR te.document = p_search_document) AND
            (p_search_trade_name IS NULL OR te.trade_name = p_search_trade_name) AND
            (p_search_business_name IS NULL OR te.business_name = p_search_business_name) AND
            (p_search_address IS NULL OR te.address = p_search_address) AND
            (p_search_status IS NULL OR te.status = p_search_status) AND
            (p_search_id_pais IS NULL OR te.id_pais = p_search_id_pais) AND
            (p_search_id_state IS NULL OR te.id_state = p_search_id_state) AND
            (p_search_id_city IS NULL OR te.id_city = p_search_id_city) AND
            (p_search_id_town IS NULL OR te.id_town = p_search_id_town) AND
            (p_search_id_document IS NULL OR te.id_document = p_search_id_document);
END
$$ LANGUAGE 'plpgsql' security definer set search_path = public, pg_temp;



-- VALIDATED REQUIRED FIELDS
drop function if exists validate_required_fields_enterprise;
CREATE OR REPLACE FUNCTION validate_required_fields_enterprise(
    p_trade_name VARCHAR(255),
    p_business_name VARCHAR(255),
    p_document BIGINT
) RETURNS void AS $$
BEGIN
    IF p_trade_name IS NULL OR p_trade_name = '' THEN
        RAISE EXCEPTION 'El nombre comercial es obligatorio.';
    END IF;

    IF p_business_name IS NULL OR p_business_name = '' THEN
        RAISE EXCEPTION 'El nombre del negocio es obligatorio.';
    END IF;

    -- IF p_document IS NULL OR p_document = '' THEN
    --     RAISE EXCEPTION 'El número de documento es obligatorio.';
    -- END IF;

    IF LENGTH(p_trade_name) > 255 OR LENGTH(p_business_name) > 255 THEN
        RAISE EXCEPTION 'Los campos nombre comercial y nombre del negocio deben tener como máximo 255 caracteres.';
    END IF;
END
$$ LANGUAGE plpgsql;



-- INSERT
drop function if exists function_insert_enterprise;
CREATE OR REPLACE FUNCTION function_insert_enterprise(
    p_document BIGINT,
    p_trade_name VARCHAR(255),
    p_business_name VARCHAR(255),
    p_slogan VARCHAR(255),
    p_address VARCHAR(255),
    p_status INTEGER,
    p_id_pais INTEGER,
    p_id_state INTEGER,
    p_id_city INTEGER,
    p_id_town INTEGER,
    p_id_document INTEGER,
    p_ic VARCHAR(255),
    p_id_branch INTEGER
) RETURNS table (status boolean, message text) AS $$
DECLARE
    next_code INTEGER;
BEGIN
-- DB: FF

    -- Validaciones
    -- PERFORM FROM validate_required_fields_enterprise(p_trade_name, p_business_name, p_document);
    
    -- Obtiene el próximo valor de la secuencia
    SELECT nextval('empresa_code_seq') INTO next_code;

    INSERT INTO table_enterprise (
        code,
        document,
        trade_name,
        business_name,
        slogan,
        address,
        status,
        id_pais,
        id_state,
        id_city,
        id_town,
        id_document,
        ic,
        id_branch,
        created_at,
        updated_at
    )
    VALUES (
        next_code,
        p_document,
        p_trade_name,
        p_business_name,
        p_slogan,
        p_address,
        p_status,
        p_id_pais,
        p_id_state,
        p_id_city,
        p_id_town,
        p_id_document,
        p_ic,
        p_id_branch,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP 
    );

    RETURN QUERY SELECT true, 'Registro exitoso.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;



-- EXAMPLE: EDIT
drop function if exists function_edit_enterprise;
CREATE OR REPLACE FUNCTION function_edit_enterprise(
    p_id INTEGER,
    -- p_id_logo INTEGER,
    p_document BIGINT,
    p_trade_name VARCHAR(255),
    p_business_name VARCHAR(255),
    p_slogan VARCHAR(255),
    p_address VARCHAR(255),
    p_status INTEGER,
    p_id_pais INTEGER,
    p_id_state INTEGER,
    p_id_city INTEGER,
    p_id_town INTEGER,
    p_id_document INTEGER,
    p_ic VARCHAR(255)
) RETURNS table (status boolean, message text) AS $$
BEGIN
-- DB: FF

    -- Validaciones
    -- PERFORM FROM validate_required_fields_enterprise(p_trade_name, p_business_name, p_document);

    UPDATE table_enterprise
    SET
            document = p_document,
            trade_name = p_trade_name,
            business_name = p_business_name,
            slogan = p_slogan,
            address = p_address,
            status = p_status,
            id_pais = p_id_pais,
            id_state = p_id_state,
            id_city = p_id_city,
            id_town = p_id_town,
            id_document = p_id_document,
            ic = p_ic,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;

    RETURN QUERY SELECT true, 'Actualización exitosa.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;



-- SEE ENTERPRISE
drop function if exists function_see_enterprise;
CREATE OR REPLACE FUNCTION function_see_enterprise(
    p_id INTEGER
)
RETURNS table
(
    code VARCHAR,
    document BIGINT,
    trade_name VARCHAR,
    business_name VARCHAR,
    address VARCHAR,
    status INTEGER,
    lp_name VARCHAR,
    ls_name VARCHAR,
    lc_name VARCHAR,
    lt_name VARCHAR,
    td_name VARCHAR,
    id_pais INTEGER,
    id_state INTEGER,
    id_city INTEGER,
    id_town INTEGER,
    id_document INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
-- DB: FF
    RETURN QUERY
    SELECT 
        te.code,
        te.document,
        te.trade_name,
        te.business_name,
        te.address,
        te.status,
        lp.name as lp_name,
        ls.name as ls_name,
        lc.name as lc_name,
        lt.name as lt_name,
        td.name as td_name,
        lp.id as id_pais, 
        ls.id as id_state, 
        lc.id as id_city, 
        lt.id as id_town, 
        td.id as id_document, 
        te.created_at,
        te.updated_at
        FROM table_enterprise te
            INNER JOIN loc_pais lp ON lp.id = te.id_pais
            INNER JOIN loc_state ls ON ls.id = te.id_state
            INNER JOIN loc_city lc ON lc.id = te.id_city
            INNER JOIN loc_town lt ON lt.id = te.id_town
            INNER JOIN table_documents td ON td.id = te.id_document
        WHERE
            te.id = p_id and te.status = 1;
END
$$ LANGUAGE 'plpgsql' security definer set search_path = public, pg_temp;



-- EXAMPLE: DELETE
drop function if exists function_delete_enterprise;
CREATE OR REPLACE FUNCTION function_delete_enterprise(
    p_id INTEGER
) RETURNS table (status boolean, message text) AS $$
BEGIN
-- DB: FF

    UPDATE table_enterprise
    SET
        status = 0,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;

    RETURN QUERY SELECT true, 'Inhabilitación exitosa.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;




-- VALIDATES: TYPE DOCUMENT AND DOCUMENT 
drop function if exists function_validates_type_document_and_document_in_enterprise;
CREATE OR REPLACE FUNCTION function_validates_type_document_and_document_in_enterprise(
    p_id_document INTEGER,
    p_document BIGINT
) RETURNS table (status boolean, message text) AS $$
DECLARE
v_response varchar;
BEGIN
-- DB: FF
    BEGIN
        SELECT id INTO v_response FROM table_enterprise WHERE id_document = p_id_document AND document = p_document;
        
        IF v_response IS NOT NULL THEN
            RETURN QUERY SELECT true, 'Ya existe una empresa creada con el mismo número de documento. Ingrese un número de documento diferente';
        ELSE
            RETURN QUERY SELECT false, 'El documento no existe en la base de datos';
        END IF;
    
    EXCEPTION
        WHEN OTHERS THEN
            RETURN QUERY SELECT false, 'Ocurrió un error en la consulta de la base de datos';
    END;
END
$$ LANGUAGE 'plpgsql' security definer set search_path = public, pg_temp;


-- EXAMPLE
SELECT *FROM function_validates_type_document_and_document_in_enterprise(2, '20602649090')


-- EXAMPLE LIST | FILTER
select *from function_list_enterprise(
    p_search_document := NULL,
    p_search_trade_name := NULL,
    p_search_business_name := NULL,
    p_search_address := NULL,
    p_search_status := NULL,
    p_search_id_pais := NULL,
    p_search_id_state := NULL,
    p_search_id_city := NULL,
    p_search_id_town := NULL,
    p_search_id_document := NULL
);

-- EXAMPLE INSERT
select *from function_insert_enterprise(
    p_id_logo := NULL,
    p_document := '20602647878',
    p_trade_name := 'REDTEL SAC',
    p_business_name := 'REDTEL SAC',
    p_slogan := NULL,
    p_address := 'AV. JLO 445',
    p_status := 1,
    p_id_pais := 139,
    p_id_state := 15,
    p_id_city := 128,
    p_id_town := 1400,
    p_id_document := 2,
    p_ic := '20602647878'
);

-- EXAMPLE VALIDATE
select *from validate_required_fields(
    p_trade_name := NULL,
    p_business_name := NULL
    p_document := NULL
);

-- EXAMPLE EDIT
select *from function_edit_enterprise(
    p_id := 3,
    p_id_logo := NULL,
    p_document := 20602649898,
    p_trade_name := 'ideas sac',
    p_business_name := 'ideas sac',
    p_slogan := NULL,
    p_address := 'AV. JLO 445',
    p_status := 1,
    p_id_pais := 139,
    p_id_state := 15,
    p_id_city := 128,
    p_id_town := 1400,
    p_id_document := 2,
    p_ic := '20602649898'
);

-- EXAMPLE SEE ENTERPRISE
select *from function_see_enterprise(
    p_id := 1
);

-- EXAMPLE DELETE ENTERPRISE
select *from function_delete_enterprise(
    p_id := 3
);