const mongoose = require('mongoose');

// json model for reviews
const reviewSchema = new mongoose.Schema({
    score: {
        type: Number, 
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    hoursPlayed: {
        type: Number,
        required: true
    },
    gameId: {
        type: Number,
        required: true 
    }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
