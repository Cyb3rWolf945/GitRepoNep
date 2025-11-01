
# Spotify Demo App

This project is a demo application developed as part of a challenge to explore and adapt to the Neptune DXP - Open Edition platform.

The app combines an internal API, which leverages table definitions for user management, with an external API ( Spotify API ) to retrieve artist information.

With this application, users can:

- Create accounts and authenticate;

- Manage their user accounts within the platform;

- Search and list artists from Spotify;

- View detailed artist pages;

- Add artists to their favorites list;

## Spotify API Guide

To use the Spotify API, you must obtain an access token generated through Spotify’s authentication endpoint.

This token is required for all requests to the Spotify API.

You can generate the token by making a POST request to the following endpoint, providing your Client ID and Client Secret:

`curl -X POST "https://accounts.spotify.com/api/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"
`

Once you have your token, update the PaginationClass file to include it, so that API requests can be properly authenticated.

## Feedback

If you have any feedback, please let me know at ajosegoncalves01@gmail.com