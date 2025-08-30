#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DO
    \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$APP_DB_USER') THEN
            CREATE ROLE $APP_DB_USER WITH LOGIN PASSWORD '$APP_DB_PASSWORD';
        ELSE
            -- Update password if role exists
            ALTER ROLE $APP_DB_USER WITH LOGIN PASSWORD '$APP_DB_PASSWORD';
        END IF;
    END
    \$\$;

    DO
    \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '$APP_DB') THEN
            CREATE DATABASE $APP_DB OWNER $APP_DB_USER;
        END IF;
    END
    \$\$;
EOSQL
