//Encryption module
const bcryptjs = modules.bcryptjs;

// Request data from body
const data = req.body;

// User form information
const email = data.email;
const password = data.password;

// Find user by email
const user = await entities.users.findOne({
    EMAIL: email
});

// Check if user exists and verify password
if (user && await bcryptjs.compare(password, user.PASSWORD_HASH)) {

    data_to_send = { id:user.id, user_email: user.EMAIL, user_display_name: user.DISPLAY_NAME }

    result = {
        data: data_to_send,
    };
} else {
    req.res.status(400);
    result = {
        error: "Invalid credentials",
    };
}