const Listing = require('./models/listing.js');
const ExpressError = require('./utils/ExpressError.js');
const {listingSchema} = require('./schema.js');
const {riviewSchema} = require("./schema.js");

module.exports.isLoggIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be loggedin !");
        return res.redirect("/user/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl) res.locals.redirectUrl = req.session.redirectUrl;
    next();
};

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing  = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (!req.user || !listing.owner.equals(req.user._id)) {
        req.flash("error","You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        console.log(`\n\n\n\n\n\nvalidation error ${error}\n\n\n\n\n`);
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
        // req.flash("error",`${errMsg}`);
        // next();
    } else {
        next();
    }
};

module.exports.validateRiview = (req,res,next)=>{
    let {error} = riviewSchema.validate(req.body);
    if(error){ 
        throw new ExpressError(400,error.message||'Invalid review data');
    }
    else{
        next();
    }
};

