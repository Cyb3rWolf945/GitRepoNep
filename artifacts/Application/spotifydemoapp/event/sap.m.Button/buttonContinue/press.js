const email = inputEmail.getValue();
const password = inputPassword.getValue();

if (!email || !password) {
    sap.m.MessageToast.show("Email and Password are required.");
    return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    sap.m.MessageToast.show("Please enter a valid email address.");
    return;
}

var options = {
    data: { email, password },
};

sap.ui.core.BusyIndicator.show(0);

apiLoginAPI(options)
    .success(function (result) {
        sap.ui.core.BusyIndicator.hide();
        if (result) {
            inputEmail.setValue("");
            inputPassword.setValue("");

            try {
                localStorage.setItem("userData", JSON.stringify(result));
            } catch (error) {
                console.error("Failed to store user data:", error);
            }

            App.to(toolPage);
            mainNavContainer.to(HomePage);
            displayUserName();

            const email = getEmail();

            /**
             * Name: users_spotify_demo
             * Description:
             *
             * Path: /GetUserInfo
             * Method: POST
             *
             * Body:
             */
            var options = { data: { email: email } };

            apiGetUserInfo(options);
        }
    })
    .error(function (error) {
        sap.ui.core.BusyIndicator.hide();
        sap.m.MessageBox.error("Login failed. Please check your credentials and try again.");
    });
