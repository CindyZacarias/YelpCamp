const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

const ExpressError = require('../utilities/ExpressError');
const catchAsync = require('../utilities/catchAsync');

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/', validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', catchAsync(reviews.deleteReview));

module.exports = router;