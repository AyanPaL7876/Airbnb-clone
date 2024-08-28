const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggIn, isOwner,validateListing} = require('../middleWare.js');
const listingController = require("../controllers/listings.js");
const Listing = require('../models/listing.js');

const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

router.post("/search",(req,res)=>{
    let {country} = req.body;
    if(!country){
        req.flash("error","please enter a valid country");
        return res.redirect("/listings");
    }
    // res.send("Search");
});