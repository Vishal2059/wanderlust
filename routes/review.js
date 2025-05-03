const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isloggedIn, isreviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js");

 

//Reviewa
//post Route
router.post("/",isloggedIn, 
    validateReview, 
    wrapAsync(reviewController.createReview));

//Delete Review route
router.delete("/:reviewId",
     isloggedIn,
      isreviewAuthor,
     wrapAsync(reviewController.destroyReview));

module.exports = router;