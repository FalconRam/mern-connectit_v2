import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "24h", // 25 hours * 00 minutes * 00 seconds - To auto clearr the token from DB
  },
});

export const Token = mongoose.model("Token", tokenSchema);
