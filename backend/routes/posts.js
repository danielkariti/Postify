const express = require ('express');
const PostController = require ('../controllers/post');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

// Add post to the database
router.post("", checkAuth, extractFile, PostController.createPost );

// Get all posts from the database
router.get("", PostController.getPosts);

// Get post by id
router.get("/:id", PostController.getPost);

// Update a post by id in the database
router.put("/:id", checkAuth, extractFile, PostController.updatePost);

// Delete post by id from the database
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
