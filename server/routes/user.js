import express from "express";
import {
  signUp,
  logIn,
  getSearchUsers,
  refreshUserController,
} from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create-user", signUp);

router.post("/login-user", logIn);

router.post("/refresh-session", auth, refreshUserController); // By Refresh token, Generate Access Token

router.get("/searchUsers", auth, getSearchUsers);

export default router;
