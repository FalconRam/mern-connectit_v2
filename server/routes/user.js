import express from "express";
import {
  signUp,
  logIn,
  getSearchUsers,
  refreshUserController,
  initiateResetPassword,
  validateResetLink,
  resetPassword,
  reportPassword,
  logoutUser,
} from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create-user", signUp);

router.post("/login-user", logIn);

router.post("/logout", logoutUser);

router.post("/initiate-resetPassword", initiateResetPassword);

router.get("/validate-resetLink", validateResetLink);

router.post("/resetPassword", resetPassword);

router.post("/reportPassword", reportPassword);

router.post("/refresh-session", auth, refreshUserController); // By Refresh token, Generate Access Token

router.get("/searchUsers", auth, getSearchUsers);

export default router;
