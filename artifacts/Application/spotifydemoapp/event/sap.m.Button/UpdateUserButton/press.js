const email = inSimpleFormemail.getValue();
const display_name = inSimpleFormdisplay_name.getValue();
const password = inSimpleFormpassword.getValue();

if (!email || !display_name) {
    sap.m.MessageToast.show("Email and Display Name cannot be empty.");
    return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    sap.m.MessageToast.show("Invalid email format");
    return;
}

const userDataString = localStorage.getItem('userData');
if (!userDataString) {
    logout();
    return;
}
const user = JSON.parse(userDataString);
const id = user.id;

var options = { data: { id, email, display_name, password  } };

sap.ui.core.BusyIndicator.show(0);

apiUpdateUser(options)
    .success(function(result) {
        sap.ui.core.BusyIndicator.hide();
        sap.m.MessageToast.show("User Updated Successfully");
        const updatedUserData = {
            ...user,
            email: email,
            display_name: display_name
        };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        displayUserName();
        loadUserDetails();
    })
    .error(function(error) {
        sap.ui.core.BusyIndicator.hide();
        sap.m.MessageBox.error("Failed to update user.");
    });