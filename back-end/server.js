require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reviewRoutes = require('./routes/reviews')

const app = express();

app.use( cors() );
app.use( express.json() );

// route for reviews
app.use('/reviews', reviewRoutes);

// test route
app.get('/', (req, res) => {
    res.send('Server running...')
})

mongoose.connect(process.env.MONGODB_URL) // add MONGODB_URL in .env file
.then( () => console.log('Connected to MongoDB') )
.catch( (err) => console.error('Failed to connect to MongoDB', err) );
app.listen(4000, () => {
    console.log('Server is running on port 4000')
});
