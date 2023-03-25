import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    id: { type: String },
    sender: { type: String, ref: "User", required: true },
    message: { type: String, required: true },
    chat: { type: String, ref: "Chat", required: true },
    readBy: {
      type: [String],
      default: [],
      ref: "User",
    },
    likes: {
      type: [String],
      default: [],
    },
    reply: {
      type: [String],
      default: [],
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
