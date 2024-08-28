const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email : {
        type : String,
        required : true
    }
});

// Automatically added Username , Password & hashing & salting 
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);