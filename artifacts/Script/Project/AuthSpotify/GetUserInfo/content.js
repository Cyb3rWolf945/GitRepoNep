// Request data from body
const data = req.body;

// User form information
const email = data.email;

// Get user info
const user = await entities.users.findOne({
    EMAIL: email
});

if(user){
    result = {
        data: {email: user.EMAIL, display_name: user.DISPLAY_NAME, password: user.PASSWORD_HASH}
    };
}else{
    req.res.status(400);
    result = {
        error: "User not found",
    };
}