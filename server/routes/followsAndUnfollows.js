import express from "express";
import {
  acceptFriendRequest,
  followRequest,
  getFollowersByUserId,
  getFollowingByUserId,
  getProfile,
  rejectFriendRequest,
  removeFollowerRequest,
  suggestPeoples,
  unFollowRequest,
} from "../controllers/followsAndUnfollows.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/follow/:companionId", auth, followRequest);

router.post("/unFollow/:companionId", auth, unFollowRequest);

router.post("/accept/:companionId", auth, acceptFriendRequest);

router.post("/reject/:companionId", auth, rejectFriendRequest);

router.post("/removeFollower/:companionId", auth, removeFollowerRequest);

router.get("/followers/list", auth, getFollowersByUserId);

router.get("/following/list", auth, getFollowingByUserId);

router.get("/new-people/suggestions", auth, suggestPeoples);

router.get("/profile/:id", auth, getProfile);

export default router;
