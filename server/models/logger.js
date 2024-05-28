import mongoose from "mongoose";

const loggerSchema = mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  userSession: {
    ip: { type: String },
    platform: { type: String },
    browser: { type: String },
    userAgent: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sessionDuration: { type: String }, // In MilliSeconds
  logoutAt: {
    type: Date,
  },
});

const Logger = mongoose.model("Logger", loggerSchema);
export default Logger;
