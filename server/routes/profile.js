import express from "express";
import {
  followersProfileDetails,
  followingProfileDetails,
  followingAndFollowersCount,
  userDetails,
  updateUserDetails,
  updateUserPassword,
} from "../controllers/profile.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/following-followers/count", auth, followingAndFollowersCount);

router.get("/following/details", auth, followingProfileDetails);

router.get("/followers/details", auth, followersProfileDetails);

router.post("/details", auth, userDetails);

router.patch("/update/:id", auth, updateUserDetails);

router.patch("/update/password/:id", auth, updateUserPassword);

export default router;
