
select *from table_documents;
select *from table_branch;

-- table documents
ALTER TABLE table_documents
ADD id_branch INTEGER;

-- LIST | FILTER
drop function if exists function_list_table_documents;
CREATE OR REPLACE FUNCTION function_list_table_documents(
    p_search_code INTEGER,
    p_search_name VARCHAR,
    p_search_description VARCHAR,
    p_search_status INTEGER,
    p_search_id_branch INTEGER
)
RETURNS table
(
    code INTEGER,
    name VARCHAR,
    description VARCHAR,
    status INTEGER,
    tb_business_name VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
-- DB: FF
    RETURN QUERY
    SELECT 
        tdoc.code,
        tdoc.name,
        tdoc.description,
        tdoc.status,
        tb.business_name as tb_business_name,
        tdoc.created_at,
        tdoc.updated_at
        FROM table_documents tdoc
            INNER JOIN table_branch tb ON tb.id = tdoc.id_branch
        WHERE
            tdoc.status = 1;
END
$$ LANGUAGE 'plpgsql' security definer set search_path = public, pg_temp;


CREATE SEQUENCE table_documents_code_seq;

-- INSERT
drop function if exists function_insert_table_documents;
CREATE OR REPLACE FUNCTION function_insert_table_documents(
    p_name VARCHAR(255),
    p_description VARCHAR(255),
    p_status INTEGER,
    p_id_branch INTEGER
) RETURNS table (status boolean, message text) AS $$
DECLARE
    next_code INTEGER;
BEGIN
-- DB: FF
    -- Obtiene el próximo valor de la secuencia
    SELECT nextval('table_documents_code_seq') INTO next_code;

    INSERT INTO table_documents (
        code,
        name,
        description,
        status,
        id_branch,
        created_at,
        updated_at
    )
    VALUES (
        next_code,
        p_name,
        p_description,
        p_status,
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
drop function if exists function_edit_table_documents;
CREATE OR REPLACE FUNCTION function_edit_table_documents(
    p_id INTEGER,
    p_name VARCHAR(255),
    p_description VARCHAR(255),
    p_status INTEGER,
    p_id_branch INTEGER
) RETURNS table (status boolean, message text) AS $$
BEGIN
-- DB: FF

    UPDATE table_documents
    SET
            id = p_id,
            name = p_name,
            description = p_description,
            status = p_status,
            id_branch = p_id_branch,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id and status = 1;

    RETURN QUERY SELECT true, 'Actualización exitosa.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;


-- SEE ENTERPRISE
drop function if exists function_see_table_documents;
CREATE OR REPLACE FUNCTION function_see_table_documents(
    p_id INTEGER
)
RETURNS table
(
    code INTEGER,
    name VARCHAR,
    description VARCHAR,
    status INTEGER,
    tb_business_name VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
-- DB: FF
    RETURN QUERY
    SELECT 
        tdoc.code,
        tdoc.name,
        tdoc.description,
        tdoc.status,
        tb.business_name as tb_business_name,
        tdoc.created_at,
        tdoc.updated_at
        FROM table_documents tdoc
            INNER JOIN table_branch tb ON tb.id = tdoc.id_branch
        WHERE
            tdoc.status = 1 and tdoc.id = p_id;
END
$$ LANGUAGE 'plpgsql' security definer set search_path = public, pg_temp;



-- EXAMPLE: DELETE
drop function if exists function_delete_table_documents;
CREATE OR REPLACE FUNCTION function_delete_table_documents(
    p_id INTEGER
) RETURNS table (status boolean, message text) AS $$
BEGIN
-- DB: FF

    UPDATE table_documents
    SET
        status = 2,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;

    RETURN QUERY SELECT true, 'Eliminación exitosa.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;


-- EXAMPLE: SWITCH
drop function if exists function_switch_table_documents;
CREATE OR REPLACE FUNCTION function_switch_table_documents(
    p_id INTEGER,
    p_new_status INTEGER
) RETURNS table (status boolean, message text) AS $$
BEGIN
-- DB: FF

    UPDATE table_documents
    SET
        status = p_new_status,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;

    RETURN QUERY SELECT true, 
        CASE WHEN p_new_status THEN 'Activado' ELSE 'Desactivado' END AS message;

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;
