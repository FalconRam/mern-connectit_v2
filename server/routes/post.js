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
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// router.use(auth);

router.get("/getCommentsByPost", getCommentsByPost);

router.get("/feeds", auth, getPostsByFollowing);

router.get("/all", auth, getPosts);

router.get("/search", auth, getPostsBySearch);

router.get("/:id", auth, getPostsById);

router.post("/create", auth, createPost);

router.patch("/update/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.patch("/like/:id", auth, likePost);

router.patch("/:id/addComment/byPost", auth, addCommentByPost);

router.get("/user-posts/:id", auth, postsByUserId);

export default router;
