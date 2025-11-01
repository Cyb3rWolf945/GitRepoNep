// Serviço único: get_and_search_spotify
try {
    // 1. Primeiro obtém o token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=6fbf3a5a0c924bcebabf6fa2fd9bd922&client_secret=1fd448feecb94a72a797bdcde07f9eef'
    });
    
    if (!tokenResponse.ok) {
        throw new Error(`Token request failed: ${tokenResponse.status}`);
    }
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    // 2. Depois usa o token para pesquisar
    const searchResponse = await fetch('https://api.spotify.com/v1/search?q=adele%20hello&type=track&limit=10', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    if (!searchResponse.ok) {
        throw new Error(`Search request failed: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    
    // 3. Retorna os resultados
    return {
        success: true,
        tracks: searchData.tracks.items,
        token: accessToken // opcional, para debug
    };
    
} catch (error) {
    console.error('Error:', error);
    return {
        success: false,
        error: error.message
    };
}