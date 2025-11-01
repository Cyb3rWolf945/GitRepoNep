var appModel;




function getEmail() {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            return userData.user_email || null;
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
            return null;
        }
    }
    return null;
}

function displayUserName() {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            if (userData.user_display_name && typeof welcomeText !== 'undefined') {
                welcomeText.setText("Welcome back, " + userData.user_display_name);
            }
        } catch (e) {
            console.error("Error parsing user data for display name:", e);
        }
    } else if (typeof welcomeText !== 'undefined') {
         welcomeText.setText("");
    }
}

function logout() {
    localStorage.removeItem("userData");
    if (typeof App !== 'undefined' && typeof Login !== 'undefined') {
        App.to(Login);
    }
}

function onTilePress(oEvent) {
    const header = oEvent.getSource().getHeader();
    sap.m.MessageToast.show("Navigating to " + header);
}

function loadUserDetails() {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            // Using setValue for form elements as a best practice
            if (typeof inSimpleFormemail !== 'undefined') {
                inSimpleFormemail.setValue(userData.user_email);
            }
            if (typeof inSimpleFormdisplay_name !== 'undefined') {
                inSimpleFormdisplay_name.setValue(userData.user_display_name);
            }
            if (typeof inSimpleFormpassword !== 'undefined') {
                inSimpleFormpassword.setValue(""); // Clear password field for security
            }
        } catch (e) {
            console.error("Error loading user details:", e);
            sap.m.MessageBox.error("Could not load user details.");
            logout();
        }
    } else {
        logout();
    }
}

function loadMusicList() {
    sap.ui.core.BusyIndicator.show(0);
    apiRestAPI()
        .success(function(data) {
            sap.ui.core.BusyIndicator.hide();
            if (data && data.tracks && data.tracks.items) {
                // The model component is SearchModel, but we will set data to a new model named 'Spotify'
                // to avoid conflicts and use it specifically for the music list.
                const spotifyModel = new sap.ui.model.json.JSONModel(data.tracks.items);
                if (typeof App !== 'undefined') {
                    App.setModel(spotifyModel, "Spotify");
                }
                
                // The list component is named 'List' and the template item is 'spotifyTrackItem'
                if (typeof List !== 'undefined' && typeof spotifyTrackItem !== 'undefined') {
                     List.bindItems({
                        path: "Spotify>/",
                        template: spotifyTrackItem
                    });
                }
            } else {
                sap.m.MessageToast.show("No music data found in the response.");
            }
        })
        .error(function(error) {
            sap.ui.core.BusyIndicator.hide();
            sap.m.MessageBox.error("Failed to load music list from the API.");
        });
}

displayUserName();


