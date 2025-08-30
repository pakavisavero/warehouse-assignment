CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (
    username,
    password_hash,
    created_by,
    modified_by
)
VALUES
    ('manager1', crypt('securepassword', gen_salt('bf')), 'SYSTEM', 'SYSTEM'),
    ('staff1',   crypt('securepassword', gen_salt('bf')), 'SYSTEM', 'SYSTEM')
ON CONFLICT (username) DO NOTHING;
