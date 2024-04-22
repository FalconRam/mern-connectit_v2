import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  profileBgWallPicture: { type: String, default: "" },
  id: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  followers: {
    type: [String],
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const passwordLinkSchema = mongoose.Schema({
  email: { type: String, required: true },
  resetId: { type: String, required: true },
  resetLink: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800, // 30 minutes in seconds - To auto clear the link from DB
  },
});

const User = mongoose.model("User", userSchema);
export const PasswordLink = mongoose.model("PasswordLink", passwordLinkSchema);

export default User;
