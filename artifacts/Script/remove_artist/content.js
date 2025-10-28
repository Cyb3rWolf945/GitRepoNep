// Request data from body
const data = req.body;


// Get ids for artist and user
const id_user = data.userId;
const id_artist = data.artistId;

// Delete row where both id_user and id_artist match
await entities.users_artists.delete({
    user_id: id_user,
    artist_id: id_artist
});