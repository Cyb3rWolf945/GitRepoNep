sap.m.MessageBox.confirm("Are you sure you want to delete your account? This action cannot be undone.", {
    title: "Confirm Deletion",
    actions: [sap.m.MessageBox.Action.DELETE, sap.m.MessageBox.Action.CANCEL],
    emphasizedAction: sap.m.MessageBox.Action.DELETE,
    onClose: function(sAction) {
        if (sAction === sap.m.MessageBox.Action.DELETE) {
            const userDataString = localStorage.getItem('userData');
            if (!userDataString) {
                logout();
                return;
            }
            const user = JSON.parse(userDataString);
            const id = user.id;

            var options = { data: { id } };

            sap.ui.core.BusyIndicator.show(0);

            apiDeleteUser(options)
                .success(function(data) {
                    sap.m.MessageToast.show("User account deleted successfully.");
                    logout();
                })
                .error(function(error) {
                    sap.m.MessageBox.error("Failed to delete user account.");
                })
                .complete(function() {
                    sap.ui.core.BusyIndicator.hide();
                });
        }
    }
});