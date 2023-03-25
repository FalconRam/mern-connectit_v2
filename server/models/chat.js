import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    id: { type: String },
    chatName: { type: String, trim: true, required: true },
    about: { type: String, required: false },
    isGroupChat: { type: Boolean, default: false },
    groupAdmins: [
      {
        type: String,
        ref: "User",
        default: "",
      },
    ],
    users: [
      {
        type: String,
        ref: "User",
      },
    ],
    latestMessage: { type: String, ref: "Message" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
