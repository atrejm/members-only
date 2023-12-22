const Message = require("../models/message");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {

    res.render("index", {title: "Index", user: false})
});

