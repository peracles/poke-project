-- Database: poke_database

-- DROP DATABASE IF EXISTS poke_database;

CREATE DATABASE poke_database
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'es-MX'
    LC_CTYPE = 'es-MX'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

	CREATE TABLE historial (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    information JSONB,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);