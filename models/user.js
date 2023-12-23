const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  admin: { type: Boolean, required: true },
});

UserSchema.virtual("url").get(function () {
  return `${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
