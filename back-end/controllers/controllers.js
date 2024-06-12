// model for review JSON structure to follow
const Review = require('../models/review-model.js')

// GET request - read review by ID
const getReview = async (req, res) => {
    // get id for ':id' param from the route (the :id in the route path)
    const { id } = req.params
    // find review with Model.findById()
    const review = await Review.findById(id)
    // response (res) with .json with the todo found
    res.status(200).json(review)
}

// GET request - read all reviews for a specific game
const getReviewsByGame = async (req, res) => {
    const { gameId } = req.params;
    // find all items from a mongoose Model method 
    const reviews = await Review.find({ gameId })
    // respond with a success message
    res.status(200).json({ reviews }) 
}

// POST request - add review
const createReview = async (req, res) => {
    const { score, description, hoursPlayed, gameId } = req.body

    const reviewObject = new Review({
        score,
        description,
        hoursPlayed,
        gameId
    });

    const newReview = await reviewObject.save()
    res.status(200).json(newReview)
}

// PATCH request - edit review
const editReview = async (req, res) => {
    // get id from ':id' parameter from the route
    const { id } = req.params;
    //get the updated data
    const updates = req.body;
    // use the mongoose model method - findByIdAndUpdate
    const review = await Review.findByIdAndUpdate(id, updates, { new: true });
    // if the review item is not found:
    if (!review) {
        return res.status(404).json( { message: "Review not found"} );
    }
    // response with json
    res.status(200).json(review);
}

// DELETE request - remove review
const deleteReview = async (req, res) => {
    // get id from ':id' param from the route
    const { id } = req.params
    // use mongoose model method findByIdAndDelete
    const deletedReview = await Review.findByIdAndDelete(id)
    // message if the review is not found
    if (!deletedReview) {
        return res.status(404).json( { message: "Review not found"} );
    }
    // respond with a success message
    res.status(200).json(deletedReview)
}

module.exports = {
    getReview,
    getReviewsByGame,
    createReview,
    editReview,
    deleteReview
}
