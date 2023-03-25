import express from "express";
import { signUp, logIn, getSearchUsers } from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create-user", signUp);

router.post("/login-user", logIn);

router.get("/searchUsers", auth, getSearchUsers);

export default router;
