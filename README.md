# members-api

## POSTGRES 
### Roles
Create a new user/role
`CREATE ROLE new_role_name;`

List users
`\du`

Delete a role/user
`DROP ROLE role_name;`
`DROP ROLE IF EXISTS role_name;`

### Privileges Upon Role Creation
`CREATE ROLE role_name WITH optional_permissions;`
optional_permissions 

### Change User Password
`\password test_user`

### Change User Permissions
`ALTER ROLE demo_role WITH LOGIN;`


### Login as Different User
`psql -U test_user -d postgres -h 127.0.0.1 -W`
`Password for user test_user:`

### Grant Permissions on Table
`GRANT permission_type ON table_name TO role_name;`