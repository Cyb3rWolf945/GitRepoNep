
try {
    // Request data from body
    const data = req.body;

    // User form information
    const id_user = data.id;

    // Validate user ID
    if (!id_user) {
        result.data = { error: "User ID is required" };
        result.statusCode = 400;
        return complete();
    }

    // Get all artists for the specified user
    const artistsData = await entities.users_artists
        .createQueryBuilder("ua") // Create query builder with alias 'ua' for users_artists table
        .leftJoinAndSelect(
            "artists", // Table to join
            "a", // Alias for artists table
            "a.id = ua.artist_id" // Join condition: match artist id with artist_id in users_artists
        )
        .where("ua.user_id = :userId", { userId: id_user }) // Filter by user_id
        .getRawMany();

    result.data = artistsData;
    complete();
} catch (error) {
    log.error("Error fetching artists for user:", error);
    fail(error);
}