require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const reviewRoutes = require('./routes/reviews')

const app = express();
const PORT = process.env.PORT || 4000

app.use( cors() );
app.use( express.json() );

// route for reviews
app.use('/reviews', reviewRoutes);

// route for all games
app.get('/api/games', async (req, res) => {
    try {
        const response = await axios.get(
            `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?include_appinfo=true&key=${process.env.STEAM_API_KEY}&steamid=${process.env.STEAM_ID}&format=json`
        );
        const responseData = response.data

        res.json(responseData);
    } catch (err) {
        console.error('Error fetching data from Steam API:', err);
        res.status(500).json( { error: err.message} );
    }
});

// route to get single game by id
app.get('/api/games/:id', async (req, res) => {
    try{
        const gameID = parseInt(req.params.id, 10);
        const response = await axios.get(
            `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?include_appinfo=true&key=${process.env.STEAM_API_KEY}&steamid=${process.env.STEAM_ID}&format=json`
        );
        const games = response.data.response.games;
        const game = games.find( game => game.appid === gameID );

        if (game) {
            res.json(game);
        } else {
            res.status(404).json( { error: 'Game not found'} );
        }
    } catch (err) {
        console.error('Error fetching data from Steam API: ', err);
        res.status(500).json( { error: err.message} );
    }
});


mongoose.connect(process.env.MONGODB_URL) // add MONGODB_URL in .env file
.then( () => console.log('Connected to MongoDB') )
.catch( (err) => console.error('Failed to connect to MongoDB', err) );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
