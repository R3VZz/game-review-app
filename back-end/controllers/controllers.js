// model for review JSON structure to follow
const Review = require('../models/review-model.js')

// GET request - read review
const getReview = async (req, res) => {
    // get id from ':id' param from the route (the :id in the route path)
    const { id } = req.params
    // find review with Model.findById()
    const review = await Review.findById(id)
    // response (res) with .json with the todo found
    res.status(200).json(review)
}

// GET request for all items - read all reviews
const getReviews = async (req, res) => {
    // find all items from a mongoose Model method 
    const reviews = await Review.find({})
    // respond with an object that has a message and the items from the DB
    res.json({
        message: "all reviews", reviews
    })
    // respond with a success message
    res.status(200).json(reviews)
}

// POST request - add review
const createReview = async (req, res) => {
    const { score, description, hoursPlayed} = req.body

    const reviewObject = new Review({
        score,
        description,
        hoursPlayed
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
    const review = await Review.findByIdAndUpdate(id, updates);
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
    getReviews,
    createReview,
    editReview,
    deleteReview
}
