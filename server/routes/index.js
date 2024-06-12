import express from "express";

import postRoutes from "./post.js";
import userRoutes from "./user.js";
import requestRoutes from "./request.js";
import profileRoutes from "./profile.js";
import chatRoutes from "./chat.js";
import notificationRoutes from "./notification.js";
import { createErrorResponse } from "../services/returnResponse/createResponse.js";

const router = express.Router();

router.use("/posts", postRoutes);
router.use("/user", userRoutes);
router.use("/request", requestRoutes);
router.use("/profile", profileRoutes);
router.use("/chat", chatRoutes);
router.use("/notification", notificationRoutes);

router.use("*", (req, res) => {
  createErrorResponse(res, 404, {}, "Not Found");
});

export default router;
