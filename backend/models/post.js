const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  textPost: String,
  taskStatus: String,
  imageUrl: String,
  date: { type: Date, default: Date.now },
});

const post = mongoose.model("post", postSchema);
module.exports = post;
