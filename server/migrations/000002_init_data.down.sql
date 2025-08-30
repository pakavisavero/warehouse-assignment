DELETE FROM users
WHERE username IN ('manager1', 'staff1', 'staff2');

DELETE FROM roles
WHERE role_name IN ('Manager', 'Staff');
