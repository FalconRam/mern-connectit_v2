import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import profile from "./profile";
import request from "./request";
import chat from "./chat";
import notification from "./notification";

export default combineReducers({
  posts,
  auth,
  profile,
  request,
  chat,
  notification,
});
