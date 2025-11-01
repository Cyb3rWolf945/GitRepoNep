//Encryption module
const bcryptjs = modules.bcryptjs;

// Request data from body
const data = req.body;

// User form information
const email = data.email;
const display_name = data.display_name;
const password = data.password;

// Hash password
const password_hash = await bcryptjs.hash(password, 10);

// Insert user
const entity = await entities.users.insert({
    EMAIL: email,
    PASSWORD_HASH: password_hash,
    DISPLAY_NAME: display_name,
    createdBy: display_name,
    updatedBy: display_name
});

// Return result
result = {
  data: "User registered successfully",
};