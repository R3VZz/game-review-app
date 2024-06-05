const editReview = async (req, res) => {
    // get id from ':id' parameter from the route
    const { id } = req.params;
    //get the updated data
    const updates = req.body;
    // use the mongoose model method - findByIdAndUpdate
    const review = await Review.findByIdAndUpdate(id, updates);
    // if the review item is not found:
    if (!review) {
        return res.status(404).json( { message: "Item not found"} );
    }
    // response with json
    res.status(200).json(review);
}

const deleteReview = async (req, res) => {
    // get id from ':id' param from the route
    const { id } = req.params
    // use mongoose model method findByIdAndDelete
    const deletedReview = await Review.findByIdAndDelete(id, updates)
    // message if the review is not found
    if (!review) {
        return res.status(404).json( { message: "Item not found"} );
    }
    // respond with a success message
    res.status(200).json(deletedReview)
}


const getReview = async (req, res) => {
    // get id from ':id' param from the route (the :id in the route path)
    const { id } = req.params
    // find review with Model.findById()
    const review = await Review.findById(id)
    // response (res) with .json with the todo found
    res.status(200).json(review)
}

const getReviews = async (req, res) => {
    // find all items from a mongoose Model method 
    const Reviews = await Review.find({})
    // respond with an object that has a message and the items from the DB
    res.json({
        message: "all items",
        reviews: items
    })
}