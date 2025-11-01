const email = inputEmail1.getValue();
const display_name = inputUsername.getValue();
const password = inputPassword1.getValue();

if (!email || !password || !display_name) {
    sap.m.MessageToast.show("All fields are required.");
    return;
}

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
if (!emailRegex.test(email)) {
    sap.m.MessageToast.show("Invalid email format");
    return;
}

var options = { data: { email, display_name, password } };

sap.ui.core.BusyIndicator.show(0);

apiRegisterAPI(options)
    .success(function(result) {
        sap.m.MessageToast.show("Registration successful! Please log in.");
        inputEmail1.setValue('');
        inputUsername.setValue('');
        inputPassword1.setValue('');
        App.to(Login);
    })
    .error(function(error) {
        sap.m.MessageBox.error("Registration failed. An account with this email may already exist.");
    })
    .complete(function() {
        sap.ui.core.BusyIndicator.hide();
    });