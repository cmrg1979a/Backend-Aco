
-- Agregar nuevo módulo en el menu
-- id_table_module: 1 ->Operativo
-- id_entitie : 3711
-- id_rol: 11
-- id_group: 1 -> ficheros

select *from table_modules 
SELECT *from table_entities
	where names like '%Aldo%'
	where names like '%Fanny%'

select *from table_menu
select *from table_role


-- FUNCION PARA AGREGAR UN ELEMENTO 

drop function if exists function_insert_table_menu;
CREATE OR REPLACE FUNCTION function_insert_table_menu(
    p_id_branch INTEGER,
	p_id_group INTEGER,
	P_name VARCHAR,
	p_icon VARCHAR,
	p_description VARCHAR,
	p_route VARCHAR,
	p_id_role INTEGER

) RETURNS table (status boolean, message text) AS $$
DECLARE
    next_code INTEGER;
BEGIN
-- DB: FF

    INSERT INTO table_menu (
		id_branch,
		id_group,
		name,
		icon,
		description,
		route,
		id_role,
		status,
        created_at,
        updated_at
    )
    VALUES (
		p_id_branch,
		p_id_group,
		p_name,
		p_icon,
		p_description,
		p_route,
		p_id_role,
		1,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP 
    );

    RETURN QUERY SELECT true, 'Registro exitoso.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;


select *from function_insert_table_menu(
	p_id_branch := 1,
	p_id_group := 1,
	P_name := 'EMPRESAS',
	p_icon := 'mdi-code-tags',
	p_description := 'Menu para fichero de empresas',
	p_route := 'listEnterprise',
	p_id_role := 11
);




drop function if exists function_update_table_menu;
CREATE OR REPLACE FUNCTION function_update_table_menu(
    p_id INTEGER
) RETURNS table (status boolean, message text) AS $$
BEGIN
-- DB: FF
    UPDATE table_menu
    SET
        status = 1,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;

    RETURN QUERY SELECT true, 'Actualización exitosa.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;



select *from function_update_table_menu(
	p_id := 39
);




-- INSERTAR EN entitie_menu
select *from entitie_menu
select *from table_menu where route = 'listEnterprise'


drop function if exists function_insert_entitie_menu;
CREATE OR REPLACE FUNCTION function_insert_entitie_menu(
    p_id_entitie INTEGER,
    p_id_menu INTEGER

) RETURNS table (status boolean, message text) AS $$
BEGIN
-- DB: FF

    INSERT INTO entitie_menu (
		id_entitie,
		id_menu,
		status,
        created_at,
        updated_at
    )
    VALUES (
		p_id_entitie,
		p_id_menu,
		1,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP 
    );

    RETURN QUERY SELECT true, 'Registro exitoso.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;



select *from function_insert_entitie_menu(
	p_id_entitie := 3711,
	p_id_menu := 39 
);



-- INSERTAR EN modules_menu

select *from MODULES_MENU
select *from TABLE_MODULES

drop function if exists function_insert_module_menu;
CREATE OR REPLACE FUNCTION function_insert_module_menu(
    p_id_module INTEGER,
    p_id_menu INTEGER

) RETURNS table (status boolean, message text) AS $$
BEGIN
-- DB: FF

    INSERT INTO modules_menu (
		id_modules,
		id_menu,
		status,
        created_at,
        updated_at
    )
    VALUES (
		p_id_module,
		p_id_menu,
		1,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP 
    );

    RETURN QUERY SELECT true, 'Registro exitoso.';

exception
when others then
raise exception 'MENSAJE:% %', SQLERRM,SQLSTATE;
END
$$ LANGUAGE plpgsql;



select *from function_insert_module_menu(
	p_id_module := 1,
	p_id_menu := 39 
);


SELECT * FROM ENTITIE_MENU_cargar(3711, 1,null);


select *from function_insert_entitie_menu(
	p_id_entitie := 3711,
	p_id_menu := 39 
);

