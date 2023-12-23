const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  date_time_posted: { type: Date },
});

MessageSchema.virtual("url").get(function () {
  return `${this.id}`;
});

module.exports = mongoose.model("Message", MessageSchema);
