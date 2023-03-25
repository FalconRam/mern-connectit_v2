import express from "express";
import { accessChat } from "../controllers/chat.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, accessChat);

export default router;
