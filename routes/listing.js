const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggIn, isOwner,validateListing} = require('../middleWare.js');
const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

//home
router
  .route("/")
  .get( wrapAsync(listingController.index));

// insert route
router
  .route("/new")
  .get(isLoggIn, (listingController.createListingFormPage))
  .post(isLoggIn,upload.single('listing[image[url]]'),wrapAsync(listingController.createListing));
  // .post(upload.single('listing[image[url]]'),(req,res)=>{
  //   res.send(req.body);
  //   res.send(req.file);

  // })


// view in details
router.get("/:id", wrapAsync(listingController.listingDetails));

// edit route
router
  .route("/:id/edit")
  .get(isLoggIn, wrapAsync(listingController.editListingFormPage))
  .put(isLoggIn,
    isOwner,
    upload.single('listing[image[url]]'),
    // validateListing,
    wrapAsync(listingController.updateListing));

// delete route
router.delete("/:id/delete",isLoggIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;