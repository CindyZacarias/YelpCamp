const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, validateCampground, catchAsync (campgrounds.updateCampground))
    .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, catchAsync(campgrounds.renderEditForm));

module.exports = router;