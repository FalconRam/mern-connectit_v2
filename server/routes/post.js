import express from "express";
import {
  getPosts,
  getPostsBySearch,
  createPost,
  getPostsById,
  updatePost,
  deletePost,
  likePost,
  getPostsByFollowing,
  postsByUserId,
  addCommentByPost,
  getCommentsByPost,
  addReplyToComment,
  getRepliesByComment,
  likeComentReply,
  addReplyToReply,
  deleteComment,
  deleteReply,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

// GET Methods

router.get("/getCommentsByPost", getCommentsByPost);

router.get("/feeds", auth, getPostsByFollowing);

router.get("/all", getPosts);

router.get("/search", getPostsBySearch);

router.get("/:id", getPostsById);

router.get("/replies/getRepliesByComment", getRepliesByComment);

// Modification Methods (Create, Patch, Delete)

router.post("/create", createPost);

router.patch("/update/:id", updatePost);

router.delete("/:id", deletePost);

router.patch("/like/:id", likePost);

router.patch("/comment-reply-like", likeComentReply);

router.patch("/:postId/addCommentByPost", addCommentByPost);

router.patch("/:postId/addReplyToComment", addReplyToComment);

router.patch("/:postId/addReplyToReply", addReplyToReply);

router.get("/user-posts/:id", postsByUserId);

router.delete("/comment/deleteComment", deleteComment);

router.delete("/reply/deleteReply", deleteReply);

export default router;
