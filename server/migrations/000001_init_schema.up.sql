CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'package_status') THEN
        CREATE TYPE package_status AS ENUM ('WAITING', 'PICKED', 'HANDED_OVER', 'EXPIRED');
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(150),
    modified_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(150)
);


CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id VARCHAR(150) UNIQUE NOT NULL,
    order_ref VARCHAR(150) NOT NULL,
    driver VARCHAR(150),
    status package_status NOT NULL DEFAULT 'WAITING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(150),
    modified_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS package_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
    old_status package_status,
    new_status package_status NOT NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(150),
    note TEXT
);

CREATE INDEX IF NOT EXISTS idx_package_logs_package_id ON package_logs(package_id);
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);

-- Function to update modified_at timestamp on packages
CREATE OR REPLACE FUNCTION update_modified_column() RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for modified_at update
DROP TRIGGER IF EXISTS set_modified_at ON packages;
CREATE TRIGGER set_modified_at
BEFORE UPDATE ON packages
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Function to capitalize certain fields in users
CREATE OR REPLACE FUNCTION capitalize_users() RETURNS TRIGGER AS $$
BEGIN
    NEW.username := UPPER(NEW.username);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for capitalizing users
DROP TRIGGER IF EXISTS capitalize_users_trigger ON users;
CREATE TRIGGER capitalize_users_trigger
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION capitalize_users();

-- Function to capitalize certain fields in packages
CREATE OR REPLACE FUNCTION capitalize_packages() RETURNS TRIGGER AS $$
BEGIN
    NEW.package_id := UPPER(NEW.package_id);
    NEW.order_ref := UPPER(NEW.order_ref);
    NEW.driver := UPPER(NEW.driver);
    NEW.created_by := UPPER(NEW.created_by);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for capitalizing packages
DROP TRIGGER IF EXISTS capitalize_packages_trigger ON packages;
CREATE TRIGGER capitalize_packages_trigger
BEFORE INSERT OR UPDATE ON packages
FOR EACH ROW
EXECUTE FUNCTION capitalize_packages();
