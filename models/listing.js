const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

let listingSchema = new Schema(
    {
        title : {
            type : String, 
            required: true 
        },
        description : {
            type : String
        },
        image : {
            filename: {
                type: String
            },
            url: {
                type: String,
                default: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            }
        },
        price : Number,
        location : String,
        country : String,
        // one to many
        reviews : [{
            type: Schema.Types.ObjectId,
            ref : "Review"
        }],
        //one to one
        owner : {
            type: Schema.Types.ObjectId,
            ref : "User"
        },
        // for map 
        geometry: {
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
        }
    }
);

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})


const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;
