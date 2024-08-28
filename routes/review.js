const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const review = require("../models/review.js");
const { isLoggIn, validateRiview } = require("../middleWare.js");
const reviewController = require("../controllers/reviews.js");

//post rout
router.post("/",isLoggIn,validateRiview,wrapAsync(reviewController.insertReview));

module.exports = router;