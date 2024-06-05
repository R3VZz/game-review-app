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