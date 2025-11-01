// Get binding context from the pressed list item
const context = oEvent.getSource().getBindingContext();

// Get entire model data from the list item
const data = context.getObject();

console.log(data)

ImageArtist.setSrc(data.a_image);

LinkToArtist.setHref(data.a_uri);
LinkToArtist.setText("Link to artist: " + data.a_uri);

// Set the data to the detail page form fields
txtSimpleForm1name.setText(data.a_name || '');
txtSimpleForm1popularity.setText(data.a_popular || '');
txtSimpleForm1id.setText(data.a_id || '');

// Navigate to ListItemDetail page
if (mainNavContainer && ListItemDetail) {
    try {
        mainNavContainer.addPage(ListItemDetail);
        
        mainNavContainer.to(ListItemDetail);
        
    } catch (error) {
        console.error('Navigation error:', error);
        sap.m.MessageToast.show('Navigation failed: ' + error.message);
    }
} else {
    const errorMsg = !mainNavContainer ? 'Navigation container not found' : 'ListItemDetail page not found';
    console.error(errorMsg);
    sap.m.MessageToast.show(errorMsg);
}