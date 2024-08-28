const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require('passport');
const { saveRedirectUrl } = require("../middleWare.js");
const userController = require("../controllers/users");
// Signin 
router
  .route("/signup")
  .get(userController.signinForm)
  .post(wrapAsync(userController.createUser));

//Login
router
  .route("/login")
  .get(userController.loginForm)
  .post(saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect : '/user/login',
    failureFlash : true
}),(userController.userLogin));

// logout
router.get("/logout",(userController.userLogout));

module.exports = router;