const Listing = require('../models/listing.js');
const mbxGeocoddinng = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoddinng({ accessToken: mapToken });

module.exports.index = async(req,res,next)=>{
    const allListing = await Listing.find();
    res.render("listing/index.ejs", { allListing });
};

module.exports.createListingFormPage = (req, res) => {
    res.render("listing/new.ejs");
};

module.exports.createListing = async (req, res) => {
    // geocoding with proximity
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        proximity: [-95.4431142, 33.6875431]
      })
    .send();
    
    let url = req.file.path;
    let filename = req.file.filename;
    let newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    newlisting.geometry = (response.body.features[0].geometry);
    await newlisting.save();
    
    console.log(newlisting);
    req.flash("success","New Listings Created !");
    res.redirect("/listings");
};

module.exports.listingDetails = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    .populate({
        path:"reviews",
        populate:{path:"author"}
    }).populate("owner");
    // console.log(listing);
    if (!listing) {
        req.flash("error","Listing you request that does not exit!");
        res.redirect("/listings");
    }
    res.render("listing/details.ejs", { listing });
};

module.exports.editListingFormPage = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error","Listing you request that does not exit!");
        res.redirect("/listings");
    }
    
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload","/upload/c_scale,w_200");
    res.render("listing/edit.ejs", { listing,originalImage });
};


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let updateListing = await Listing.findByIdAndUpdate(id,{...req.body.listing}); 

    // console.log(id, update);
    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updateListing.image = {url,filename};
        await updateListing.save();
    }

    req.flash("success","Update Done ");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let del = await Listing.findByIdAndDelete(id); 
    console.log(del);
    req.flash("success",`Delete listing "${del.title}"`);
    res.redirect("/listings");
};