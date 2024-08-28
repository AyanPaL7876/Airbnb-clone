if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
    // console.log(process.env.CLOUD_NAME);
}

const express = require("express");
const connectToDB = require("./init/index.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingsRoute = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");
const usersRoute = require("./routes/user.js");
const searchRoute = require("./routes/search.js");

const Listing = require('./models/listing.js');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "./views"));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"public")));

let port = 8080;
app.listen(port, async () => {
    console.log(`App listen at port http://localhost:${port}/listings`); 
    await connectToDB();
});

const sessionOption = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized :true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 *60 * 1000,
        httpOnly : true
    }
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize()); // a middleware that initilize passport
app.use(passport.session());  // idemtify user
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/demoUser", async (req,res)=>{
//     let fakeUser = new User({
//         email : "Student@gmail.com",
//         username : "Student"
//     });

//     let registeredUser = await User.register(fakeUser,"HelloWorld");
//     res.send(registeredUser);
// });

app.use(async(req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.post("/search",async(req,res)=>{
    let {searchCountry} = req.body;
    console.log(searchCountry);
    if(searchCountry){
        const allListing = await Listing.find({country:searchCountry});
        console.log({allListing});
        if(!allListing){
            // console.log("True");
            req.flash("error","No listing is Present in this country");
            return res.redirect("/listings");
        }
        res.render("listing/index.ejs",{ allListing });
        // console.log("false");
    }
    else{
        req.flash("error","please enter a valid country");
        return res.redirect("/listings");
    }

    // res.send("Search");
});

app.use("/listings",listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/user", usersRoute);
// app.use("/search", searchRoute);

// Error handel middleware
app.use("*",(req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error/error.ejs", {err});
});
