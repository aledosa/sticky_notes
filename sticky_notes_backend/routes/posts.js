const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Return all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Return specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Submit a post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Update a post put or patch
router.put("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.status(200).json(removedPost);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
