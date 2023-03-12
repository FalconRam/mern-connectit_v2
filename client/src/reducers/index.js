import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import profile from "./profile";
import request from "./request";

export default combineReducers({
  posts,
  auth,
  profile,
  request,
});
