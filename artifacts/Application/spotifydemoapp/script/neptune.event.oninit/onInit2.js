const email = getEmail();
const _id_user = getId();
/**
 * Name: users_spotify_demo
 * Description:
 *
 * Path: /GetUserInfo
 * Method: POST
 *
 * Body:
 */
var options = { data: { email: email} };

apiGetUserInfo(options);


/**
 * Name: users_spotify_demo
 * Description:
 *
 * Path: /GetArtistById
 * Method: POST
 *
 * Body:
 */
var options = { data: {id: _id_user} };

apiGetArtists(options);


