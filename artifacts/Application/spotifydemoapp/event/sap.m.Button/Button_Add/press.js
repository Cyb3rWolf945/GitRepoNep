// Get fields from form
const name = txtSimpleForm1name.getText();
const uri = LinkToArtist.getHref();
const popular = parseInt(txtSimpleForm1popularity.getText());


// Get id from user logged
const _id_user = getId();


/**
 * Name: users_spotify_demo
 * Description:
 *
 * Path: /AddArtist
 * Method: POST
 *
 * Body:
 */
var options = { data: {id: _id_user, name: name, uri: uri, popular: popular } };

apiArtistApi(options).then( () => {
    var options = { data: {id: _id_user} };

    apiGetArtists(options);

}
);