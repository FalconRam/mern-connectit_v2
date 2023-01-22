import express from "express";
import {
  followersProfileDetails,
  followingProfileDetails,
  followingAndFollowersCount,
  userDetails,
} from "../controllers/profile.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/following-followers/count", auth, followingAndFollowersCount);

router.get("/following/details", auth, followingProfileDetails);

router.get("/followers/details", auth, followersProfileDetails);

router.post("/details", auth, userDetails);

export default router;
