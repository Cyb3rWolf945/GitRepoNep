// Get email by request body



// Get user By email
const user = await entities.users.findOne({
    EMAIL: email
});

