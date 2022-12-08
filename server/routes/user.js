import express from "express";
import {
  signUp,
  logIn,
} from "../controllers/user.js";


const router = express.Router();

router.post("/create-user", signUp);

router.post("/login-user", logIn);

export default router;
