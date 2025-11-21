-- ============================================
-- Script para crear datos ficticios completos
-- Este script crea las tablas maestras más importantes
-- ============================================

-- ============================================
-- TABLAS MAESTRAS ADICIONALES
-- ============================================

-- Tabla de modalidades
CREATE TABLE IF NOT EXISTS table_modality (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de monedas
CREATE TABLE IF NOT EXISTS table_coins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    acronym VARCHAR(10),
    symbol VARCHAR(5),
    status INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de bancos
CREATE TABLE IF NOT EXISTS table_banks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    acronym VARCHAR(50),
    status INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tipos de cuenta
CREATE TABLE IF NOT EXISTS table_account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de puertos
CREATE TABLE IF NOT EXISTS table_port (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(50),
    id_pais INTEGER,
    id_state INTEGER,
    status INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de aerolíneas
CREATE TABLE IF NOT EXISTS table_airlines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(50),
    status INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de contenedores
CREATE TABLE IF NOT EXISTS table_containers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tipos de teléfono
CREATE TABLE IF NOT EXISTS table_type_phone (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de entidades (clientes/proveedores)
CREATE TABLE IF NOT EXISTS table_entities (
    id SERIAL PRIMARY KEY,
    id_branch INTEGER,
    trade_name VARCHAR(200),
    names VARCHAR(100),
    surname VARCHAR(100),
    second_surname VARCHAR(100),
    id_document INTEGER,
    document VARCHAR(50),
    id_pais INTEGER,
    id_state INTEGER,
    address TEXT,
    email VARCHAR(200),
    status INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INSERTAR DATOS FICTICIOS
-- ============================================

-- Modalidades
INSERT INTO table_modality (id, name, description, status) VALUES
(1, 'Aéreo', 'Transporte aéreo', 1),
(2, 'Marítimo FCL', 'Transporte marítimo contenedor completo', 1),
(3, 'Marítimo LCL', 'Transporte marítimo carga consolidada', 1),
(4, 'Terrestre', 'Transporte terrestre', 1)
ON CONFLICT (id) DO NOTHING;

-- Monedas
INSERT INTO table_coins (id, name, acronym, symbol, status) VALUES
(1, 'Dólar Americano', 'USD', '$', 1),
(2, 'Sol Peruano', 'PEN', 'S/', 1),
(3, 'Euro', 'EUR', '€', 1)
ON CONFLICT (id) DO NOTHING;

-- Bancos
INSERT INTO table_banks (id, name, acronym, status) VALUES
(1, 'Banco de Crédito del Perú', 'BCP', 1),
(2, 'Banco Continental', 'BBVA', 1),
(3, 'Scotiabank Perú', 'Scotiabank', 1),
(4, 'Interbank', 'Interbank', 1),
(5, 'Banco de la Nación', 'BN', 1)
ON CONFLICT (id) DO NOTHING;

-- Tipos de cuenta
INSERT INTO table_account (id, name, description, status) VALUES
(1, 'Cuenta Corriente', 'Cuenta corriente bancaria', 1),
(2, 'Cuenta de Ahorros', 'Cuenta de ahorros', 1),
(3, 'Cuenta CCI', 'Código de cuenta interbancario', 1)
ON CONFLICT (id) DO NOTHING;

-- Puertos principales de Perú
INSERT INTO table_port (id, name, code, id_pais, status) VALUES
(1, 'Callao', 'PECLL', 139, 1),
(2, 'Paita', 'PEPIT', 139, 1),
(3, 'Matarani', 'PEMAT', 139, 1),
(4, 'Ilo', 'PEILO', 139, 1),
(5, 'Salaverry', 'PESAL', 139, 1)
ON CONFLICT (id) DO NOTHING;

-- Aerolíneas
INSERT INTO table_airlines (id, name, code, status) VALUES
(1, 'LATAM Airlines', 'LA', 1),
(2, 'Avianca', 'AV', 1),
(3, 'Copa Airlines', 'CM', 1),
(4, 'American Airlines', 'AA', 1),
(5, 'United Airlines', 'UA', 1)
ON CONFLICT (id) DO NOTHING;

-- Tipos de contenedores
INSERT INTO table_containers (id, name, description, status) VALUES
(1, '20 ST', 'Contenedor estándar 20 pies', 1),
(2, '40 ST', 'Contenedor estándar 40 pies', 1),
(3, '40 HC', 'Contenedor high cube 40 pies', 1),
(4, '20 RF', 'Contenedor refrigerado 20 pies', 1),
(5, '40 RF', 'Contenedor refrigerado 40 pies', 1)
ON CONFLICT (id) DO NOTHING;

-- Tipos de teléfono
INSERT INTO table_type_phone (id, name, status) VALUES
(1, 'Fijo', 1),
(2, 'Celular', 1),
(3, 'WhatsApp', 1),
(4, 'Oficina', 1)
ON CONFLICT (id) DO NOTHING;

-- Clientes ficticios
INSERT INTO table_entities (id, id_branch, trade_name, names, surname, id_document, document, id_pais, email, status) VALUES
(1, 1, 'Importaciones SAC', 'Juan', 'Pérez', 1, '20123456789', 139, 'juan.perez@example.com', 1),
(2, 1, 'Exportaciones EIRL', 'María', 'García', 1, '20987654321', 139, 'maria.garcia@example.com', 1),
(3, 1, 'Logística Global', 'Carlos', 'López', 1, '20456789123', 139, 'carlos.lopez@example.com', 1)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- FUNCIONES ADICIONALES NECESARIAS
-- ============================================

-- Función para listar modalidades
CREATE OR REPLACE FUNCTION table_modality_listar(p_id_branch INTEGER)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER,
    name VARCHAR,
    description TEXT,
    status INTEGER
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TRUE as estadoflag,
        'Modalidades cargadas' as mensaje,
        m.id,
        m.name,
        m.description,
        m.status
    FROM table_modality m
    WHERE m.status = 1
    ORDER BY m.name;
END;
$$ LANGUAGE plpgsql;

-- Función para listar monedas
CREATE OR REPLACE FUNCTION table_coins_listar(p_id_branch INTEGER)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER,
    name VARCHAR,
    acronym VARCHAR,
    symbol VARCHAR,
    status INTEGER
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TRUE as estadoflag,
        'Monedas cargadas' as mensaje,
        c.id,
        c.name,
        c.acronym,
        c.symbol,
        c.status
    FROM table_coins c
    WHERE c.status = 1
    ORDER BY c.name;
END;
$$ LANGUAGE plpgsql;

-- Función para listar bancos
CREATE OR REPLACE FUNCTION table_banks_listar(p_id_branch INTEGER)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER,
    name VARCHAR,
    acronym VARCHAR,
    status INTEGER
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TRUE as estadoflag,
        'Bancos cargados' as mensaje,
        b.id,
        b.name,
        b.acronym,
        b.status
    FROM table_banks b
    WHERE b.status = 1
    ORDER BY b.name;
END;
$$ LANGUAGE plpgsql;

-- Función para listar puertos
CREATE OR REPLACE FUNCTION table_port_listar(p_id_branch INTEGER, p_id_pais INTEGER DEFAULT NULL)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER,
    name VARCHAR,
    code VARCHAR,
    id_pais INTEGER,
    status INTEGER
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TRUE as estadoflag,
        'Puertos cargados' as mensaje,
        p.id,
        p.name,
        p.code,
        p.id_pais,
        p.status
    FROM table_port p
    WHERE p.status = 1
    AND (p_id_pais IS NULL OR p.id_pais = p_id_pais)
    ORDER BY p.name;
END;
$$ LANGUAGE plpgsql;

-- Función para listar aerolíneas
CREATE OR REPLACE FUNCTION table_airlines_listar(p_id_branch INTEGER)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER,
    name VARCHAR,
    code VARCHAR,
    status INTEGER
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TRUE as estadoflag,
        'Aerolíneas cargadas' as mensaje,
        a.id,
        a.name,
        a.code,
        a.status
    FROM table_airlines a
    WHERE a.status = 1
    ORDER BY a.name;
END;
$$ LANGUAGE plpgsql;

-- Función para listar contenedores
CREATE OR REPLACE FUNCTION table_containers_listar(p_id_branch INTEGER)
RETURNS TABLE (
    estadoflag BOOLEAN,
    mensaje TEXT,
    id INTEGER,
    name VARCHAR,
    description TEXT,
    status INTEGER
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TRUE as estadoflag,
        'Contenedores cargados' as mensaje,
        c.id,
        c.name,
        c.description,
        c.status
    FROM table_containers c
    WHERE c.status = 1
    ORDER BY c.name;
END;
$$ LANGUAGE plpgsql;

-- Comentarios
COMMENT ON TABLE table_modality IS 'Modalidades de transporte';
COMMENT ON TABLE table_coins IS 'Monedas del sistema';
COMMENT ON TABLE table_banks IS 'Bancos disponibles';
COMMENT ON TABLE table_account IS 'Tipos de cuenta bancaria';
COMMENT ON TABLE table_port IS 'Puertos marítimos';
COMMENT ON TABLE table_airlines IS 'Aerolíneas';
COMMENT ON TABLE table_containers IS 'Tipos de contenedores';
COMMENT ON TABLE table_entities IS 'Clientes y proveedores';

-- Mensaje de éxito
DO $$
BEGIN
    RAISE NOTICE 'Datos maestros adicionales creados exitosamente';
END $$;
