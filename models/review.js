const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewiewSchema = new Schema ({
    comment : String,
    rating : {
        type : Number,
        nim : 1,
        max : 5
    },
    createdAt :{
        type : Date,
        default : Date.now()
    },
    author : {
        type: Schema.Types.ObjectId,
        ref : "User"
    }
});

module.exports = mongoose.model("Review", rewiewSchema);