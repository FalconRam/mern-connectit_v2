import mongoose from "mongoose";

const NotificationTypes = ["message", "request"];

// Notification created by
const userMetaData = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: { type: String, default: "" },
  email: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
};

const notificationSchema = mongoose.Schema(
  {
    // Notification To
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: { type: String, required: true },
    type: {
      type: String,
      enum: NotificationTypes,
      required: true,
    },
    metaData: {
      requestBy: userMetaData,
      messageBy: userMetaData,
    },
    message: { type: String, required: true },
    actionURL: { type: String, default: "" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
