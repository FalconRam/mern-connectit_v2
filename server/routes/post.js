import express from "express";
import {
  getPosts,
  getPostsBySearch,
  createPost,
  getPostsById,
  updatePost,
  deletePost,
  likePost,
  addComment,
  getPostsByFollowing,
  postsByUserId,
  addCommentByPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/feeds", auth, getPostsByFollowing);

router.get("/all", auth, getPosts);

router.get("/search", auth, getPostsBySearch);

router.get("/:id", auth, getPostsById);

router.post("/create", auth, createPost);

router.patch("/update/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.patch("/like/:id", auth, likePost);

router.post("/:id/commentPost", auth, addComment);

router.patch("/:id/addComment/byPost",auth, addCommentByPost); //testing

router.get("/user-posts/:id", auth, postsByUserId);

export default router;
