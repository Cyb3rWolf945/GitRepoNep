// Request data from body
const data = req.body;

// User form information
const id_user = data.id;
const name = data.name;
const popular = data.popular;
const uri = data.uri;
const img = data.img;

// Insert if not exist artist with same uri

try {
    // Check if artist with same URI already exists
    const existingArtist = await entities.artists.findOne({
        where: { uri: uri },
    });

    // If artist doesn't exist, insert new record
    if (!existingArtist) {
        const insertResult = await entities.artists.insert({
            name: name,
            popular: popular,
            uri: uri,
            image: img
        });

        // Get the inserted ID from the result
        const insertedId = insertResult.identifiers[0].id;

        // Retrieve the full entity with the generated ID
        const newArtist = await entities.artists.findOne(insertedId);

        console.log(newArtist.id);

        await entities.users_artists
            .createQueryBuilder()
            .insert()
            .values({
                user_id: id_user,
                artist_id: newArtist.id,
                createdBy: "admin",
                updatedBy: "admin",
            })
            .execute();

        result.data = {
            success: false,
            message: "Artist with this URI already exists",
            artist: newArtist,
        };
    } else {
        // Artist already exists
        const artistId = existingArtist.id;

        // case artist exist and user in users artists table
        const existingUserArtist = await entities.users_artists.findOne({
            where: { user_id: id_user, artist_id: artistId },
        });

        if (!existingUserArtist) {
            await entities.users_artists
                .createQueryBuilder()
                .insert()
                .values({
                    user_id: id_user,
                    artist_id: artistId,
                    createdBy: "admin",
                    updatedBy: "admin",
                })
                .execute();

            result.data = {
                success: true,
                message: "Add artist",
                artist: existingArtist,
            };
        } else {
            result.data = {
                success: false,
                message: "Artist already added to user list",
                artist: existingArtist,
            };
        }
    }
} catch (error) {
    log.error("Error inserting artist: ", error);
    fail(error);
}
