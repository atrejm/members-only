var express = require("express");

const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

router.get("/log-in", user_controller.index);

router.post("/log-in", user_controller.login);

router.get("/sign-up", user_controller.sign_up);

router.post("/sign-up", user_controller.post_sign_up);

router.get("/messages", message_controller.list_messages);

router.post("/messages", message_controller.post_message);

router.post("/messages/delete-post/:id", message_controller.delete_message);

router.get("/user/:id", user_controller.userpage);

module.exports = router;
