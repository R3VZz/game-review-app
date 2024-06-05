const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// json model for reviews
const reviewSchema = new Schema({
    score: { type: Number },
    description: { type: String },
    hoursPlayed: { type: Number }
})

module.exports = mongoose.model('Review', reviewSchema);
