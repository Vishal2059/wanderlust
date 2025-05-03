require("dotenv").config();
console.log(process.env.SECRET);

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isOwner, isloggedIn, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isloggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
);

// new route
router.get("/new",
    isloggedIn, 
    listingController.renderNewForm);

router
.route("/:id") 
.get(wrapAsync(listingController.showListing))
.put(
    isloggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
     wrapAsync(listingController.updateListing)
    )
.delete( 
        isloggedIn, 
        isOwner, 
        wrapAsync(listingController.destroyListing)
    );

// edit route
router.get("/:id/edit", 
    isloggedIn, 
    isOwner, 
    wrapAsync(listingController.rendereditForm)
);


module.exports = router;

// //Index route
// router.get("/", wrapAsync(listingController.index));

// //create route
// router.post("/" ,
//     isloggedIn,
//     validateListing, 
//     wrapAsync(listingController.showListing)
// );


//show route
// router.get("/:id",wrapAsync(listingController.createListing)
// );




 
//update route 
// router.put("/:id",
//     isloggedIn,
//     isOwner,
//     validateListing,
//      wrapAsync(listingController.updateListing)
//     );



//Delete route
// router.delete("/:id", 
//     isloggedIn, 
//     isOwner, 
//     wrapAsync(listingController.destroyListing)
// );

