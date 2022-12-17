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

const User = mongoose.model("User", userSchema);

export default User;
