import express from "express";
import {
  notificationCountController,
  notificationListController,
  notificationReadUpdateController,
} from "../controllers/notification.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.get("/count", notificationCountController);

router.get("/list", notificationListController);

router.post("/updateRead", notificationReadUpdateController);

export default router;
