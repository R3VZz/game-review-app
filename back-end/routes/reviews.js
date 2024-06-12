const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/controllers.js')

// get all reviews for a specific game
router.get('/game/:gameId', itemsController.getReviewsByGame);

// get one review by ID
router.get('/:id', itemsController.getReview);

 // create a review
router.post('/', itemsController.createReview);

 // edit a review by ID
router.patch('/:id', itemsController.editReview);

// delete a review by ID
router.delete('/:id', itemsController.deleteReview);

module.exports = router;
