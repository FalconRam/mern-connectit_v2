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
} from "../controllers/request.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.post("/follow/:companionId", followRequest);

router.post("/unFollow/:companionId", unFollowRequest);

router.post("/accept/:companionId", acceptFriendRequest);

router.post("/reject/:companionId", rejectFriendRequest);

router.post("/removeFollower/:companionId", removeFollowerRequest);

router.get("/followers/list", getFollowersByUserId);

router.get("/following/list", getFollowingByUserId);

router.get("/new-people/suggestions", suggestPeoples);

router.get("/profile", getProfile);

export default router;
