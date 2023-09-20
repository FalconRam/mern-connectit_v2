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

router.use(auth);

router.get("/getCommentsByPost", getCommentsByPost);

router.get("/feeds", getPostsByFollowing);

router.get("/all", getPosts);

router.get("/search", getPostsBySearch);

router.get("/:id", getPostsById);

router.post("/create", createPost);

router.patch("/update/:id", updatePost);

router.delete("/:id", deletePost);

router.patch("/like/:id", likePost);

router.patch("/:id/addCommentByPost", addCommentByPost);

router.get("/user-posts/:id", postsByUserId);

export default router;
