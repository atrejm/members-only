const Message = require("../models/message");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Index", user: req.user });
});

exports.list_messages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({})
    .populate("author")
    .sort({ date_time_posted: -1 })
    .exec();

  res.render("messages", {
    title: "Index",
    user: req.user,
    messages: messages,
    errors: false,
  });
});

exports.post_message = [
  body("title").isAscii().stripLow().trim(),

  body("textbody").isAscii().stripLow().trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const messages = await Message.find({}).populate("author").exec();

    if (!errors.isEmpty()) {
      // there are validation errors
      res.render("messages", {
        title: "Index",
        user: req.user,
        messages: messages,
        errors: false,
      });
    } else {
      // validation successful
      const postTitle = req.body.title;
      const postContent = req.body.textbody;

      console.log(postContent);

      const message = new Message({
        title: postTitle,
        content: postContent,
        author: req.user,
        date_time_posted: new Date(),
      });

      await User.updateOne(
        { _id: req.user._id },
        { $push: { messages: message } }
      );
      await message.save();

      res.redirect("/messages");
    }
  }),
];

exports.delete_message = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  await Message.deleteOne({ _id: req.params.id });

  res.redirect("/messages");
});
