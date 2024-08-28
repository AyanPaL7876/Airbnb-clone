const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

const connectToDB = async function Dbconnect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Airband");
        console.log("MongoDB connected successfully");
        // await initDb();
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// connectToDB();
// const initDb= async()=> {
//     try {
//         // await Listing.deleteMany({});
//         // await Listing.deleteMany({}, { timeout: false });
//         // console.log(data);
//         initData.data = initData.data.map((obj)=>({
//             ...obj,
//             owner:"65f1e8a1a630c2c8400b300d",
//         }));
//         await Listing.insertMany(initData.data);
//         console.log("Data insert done ");
//     } catch (error) {
//         console.error("Error initializing database:", error);
//     }
// }
// initDb();

module.exports = connectToDB;
