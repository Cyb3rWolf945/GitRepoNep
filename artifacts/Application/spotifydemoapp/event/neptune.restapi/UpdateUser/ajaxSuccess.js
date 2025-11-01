// Update user info and display name

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
var options = { data: { email: email} };

apiGetUserInfo(options);


displayUserName();