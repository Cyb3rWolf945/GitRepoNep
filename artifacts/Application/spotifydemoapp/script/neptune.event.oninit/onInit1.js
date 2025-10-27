user_auth = verify_user();

if(user_auth){
    App.to(HomePage);
}