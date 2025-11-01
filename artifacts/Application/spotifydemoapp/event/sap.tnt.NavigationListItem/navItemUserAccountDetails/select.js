
// The following parameters are available via oEvent.getParameter("parameterName"); 
// 
// item - sap.ui.core.Item
// 


// Navigate to UserAccountDetails page
if (mainNavContainer && UserAccountDetails) {
    try {

        mainNavContainer.addPage(UserAccountDetails);
        
        mainNavContainer.to(UserAccountDetails);
        //loadUserDetails();
        
    } catch (error) {
        console.error('Navigation error:', error);
        sap.m.MessageToast.show('Navigation failed: ' + error.message);
    }
} else {
    const errorMsg = !mainNavContainer ? 'Navigation container not found' : 'UserAccountDetails page not found';
    console.error(errorMsg);
    sap.m.MessageToast.show(errorMsg);
}
