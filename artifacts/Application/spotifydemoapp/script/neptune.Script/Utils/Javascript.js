// Function to display user name in ContentRight

function displayUserName() {
        // Get user data from localStorage
        const userData = localStorage.getItem('userData');
        
        if (userData) {
            // Parse the user data
            const user = JSON.parse(userData);

            return user.user_display_name;
        }
}


function verify_user(){

    const user = localStorage.getItem('userData');
    if(!user){
        return false;
    }

    return true;

}

function logout(){
    localStorage.removeItem('userData');
    App.to(Login);
}