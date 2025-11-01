// Request data from body
const data = req.body;

// User form information
const id_user = data.id;
const name = data.name;
const popular = data.popular;
const uri = data.uri;

// Insert if not exist artist with same uri

try {
    // Check if artist with same URI already exists
    const existingArtist = await entities.artists.findOne({
        where: { uri: uri },
    });

    // If artist doesn't exist, insert new record
    if (!existingArtist) {
        const newArtist = await entities.artists.insert({
            name: name,
            popular: popular,
            uri: uri,
        });

        const artistId = newArtist.generatedMaps[0].id;

        // Insert into junction table
        await entities.users_artists.insert({
            user_id: id_user,
            artist_id: artistId,
        });

        // Return success response with created artist
        result.data = {
            success: true,
            message: "Artist created successfully",
            artist: newArtist.generatedMaps[0],
        };
    } else {

         // Artist already exists

        const artistId = existingArtist.id;

        // Insert into junction table
        await entities.users_artists.insert({
            user_id: id_user,
            artist_id: artistId,
        });

        result.data = {
            success: false,
            message: "Artist with this URI already exists",
            artist: existingArtist,
        };
    }
    
} catch (error) {
    log.error("Error inserting artist: ", error);
    fail(error);
}
