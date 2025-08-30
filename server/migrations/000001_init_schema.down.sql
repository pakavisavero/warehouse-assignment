DROP TRIGGER IF EXISTS set_modified_at ON packages;
DROP FUNCTION IF EXISTS update_modified_column;

DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

DROP TYPE IF EXISTS package_status;