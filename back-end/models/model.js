const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    score: { type: Number },
    description: { type: String },
    hoursPlayed: { type: Number }
})

module.exports = mongoose.model('Review', reviewSchema);
