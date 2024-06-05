const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/controllers.js')

router.get('/', itemsController.getReviews) // get all reviews
router.get('/:id', itemsController.getReview) // get one review by ID
router.post('/', itemsController.createReview) // create a review
router.patch('/:id', itemsController.editReview) // edit a review by ID
router.delete('/:id', itemsController.deleteReview) // delete a review by ID

module.exports = router;
