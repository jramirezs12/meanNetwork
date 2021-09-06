const Post = require("../models/post");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const savePost = async (req, res) => {
  if (!req.body.textPost)
    return res.status(400).send("Incomplete data");

  let post = new Post({
    userId: req.user._id,
    textPost: req.body.textPost,
    taskStatus: "to-do",
  });

  let result = await post.save();
  if (!result) return res.status(400).send("Error registering post");
  return res.status(200).send({ result });
};

const listPost = async (req, res) => {
  let post = await Post.find({ userId: req.user._id });
  if (!post || post.length === 0)
    return res.status(400).send("You have no posted anything yet.");
  return res.status(200).send({ post });
};

const savePostImg = async (req, res) => {
  if (!req.body.textPost)
    return res.status(400).send("Incomplete data");

  console.log(req.files); 
  let imageUrl = ""; 
  if (req.files !== undefined && req.files.image.type) {
    let url = req.protocol + "://" + req.get("host") + "/";
    let serverImg =
      "./uploads/" + moment().unix() + path.extname(req.files.image.path);
    fs.createReadStream(req.files.image.path).pipe(
      fs.createWriteStream(serverImg)
    );
    imageUrl =
      url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
  }

  let post = new Post({
    userId: req.user._id,
    textPost: req.body.textPost,
    taskStatus: "to-do",
    imageUrl: imageUrl,
  });

  let result = await post.save();
  if (!result) return res.status(400).send("Error registering post");
  return res.status(200).send({ result });
};

const updatePost = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send("Incomplete data");

  let post = await Post.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    taskStatus: req.body.taskStatus,
  });

  if (!post) return res.status(400).send("Post not found");
  return res.status(200).send({ post });
};

const deletePost = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");
  console.log(validId);
  let post = await Post.findByIdAndDelete(req.params._id);
  if (!post) return res.status(400).send("Post not found");
  return res.status(200).send({ message: "Post deleted"});
};

module.exports = { savePost: savePost, listPost: listPost, updatePost: updatePost, deletePost: deletePost, savePostImg: savePostImg };
