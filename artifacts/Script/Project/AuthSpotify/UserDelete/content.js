// Request data from body
const data = req.body;


// User form information
const id = data.id;


await entities.users.delete(id);

resultresult = {
  data: "User deleted successfully",
};