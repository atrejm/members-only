const Message = require("../models/message");
const User = require("../models/user");

const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.index = asyncHandler(async (req, res, next) => {
    console.log(res.locals.currentUser)
    res.render("index", {title: "Index", user: req.user, error: false})
});

exports.login = asyncHandler(async (req, res, next) => {
    console.log(`Attempting login authentication..`)
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })

    //res.render("index", {title: "Index", user:req.body.user, error:false})
});

exports.sign_up = asyncHandler(async (req, res, next) => {

    res.render("signup", {title: "Sign up", errors:false})
});


exports.post_sign_up = [
    // Validate fields
    body("firstname")
        .trim()
        .isAlpha()
        .withMessage("First name must only contain english letters")
        .escape(),
    
    body("lastname")
        .trim()
        .isAlpha()
        .withMessage("Last name must only contain english letters")
        .escape(),

    body("username")
        .trim()
        .isAlphanumeric()
        .withMessage("Username can only contain letters and numbers")
        .escape(),
    
    body("password")
        .isLength({min:5, max: 12})
        .withMessage("Password must be between 5 and 12 characters"),
    
    body("useremail")
        .trim()
        .escape(),
    
    asyncHandler(async (req, res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            // There are errors, reload sign-up page with error text
            console.log(errors.array());

            res.render("signup", {
                title: "Sign up", 
                errors : errors.array(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.useremail,
                username: req.body.username
            });
            return;
        } else {
            // successfull validation
            console.log("Successful validation")

            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if(err) {
                    console.log(err);
                    res.redirect("/");
                } else {
                    const user = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        email: req.body.useremail,
                        password: hashedPassword,
                        messages: [],
                        admin: false
                    });

                    const result = await user.save();
                }
            })

            res.redirect("/");
        }
})];
