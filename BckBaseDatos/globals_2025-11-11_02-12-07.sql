--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE chainsolver;
ALTER ROLE chainsolver WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:9sSmLiLyREH+oehCnd4HSg==$U4qSfzfZpk0EtER01jRLHj9DXHsnMAKCcnY1nkBr75o=:AlWXktoa6l5qgFFOLppxme5s1jSJI+34qIl1tGK5t3A=';

--
-- User Configurations
--








--
-- PostgreSQL database cluster dump complete
--

