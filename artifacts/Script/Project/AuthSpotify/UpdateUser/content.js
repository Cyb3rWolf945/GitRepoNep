// Encryption module
const bcryptjs = modules.bcryptjs;

// Request data from body
const data = req.body;

// User form information
const id = data.id
const email = data.email;
const display_name = data.display_name;
const password = data.password;


await entities.users.update(id, { EMAIL: email, DISPLAY_NAME: display_name, PASSWORD_HASH:password });

result = {
    data: "User updated successfully"
};