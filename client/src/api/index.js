import axios from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";
import { tokenMiddleware } from "../middleware/tokenMiddleware";

// let URL =
//   window.location.origin === process.env.REACT_APP_LOCAL_HOST_FE_URL
//     ? process.env.REACT_APP_LOCAL_HOST_BE_URL
//     : process.env.REACT_APP_PRODUCTION_BE_URL;

let localURL = "http://localhost:5000/";
let productionURL = "https://52.88.88.188/";
// let productionURL = "https://connectit-v2-api.onrender.com/"; // Render

let URL =
  window.location.origin === "http://localhost:3000" ? localURL : productionURL;

const API = axios.create({ baseURL: URL });

API.interceptors.request.use(async (req) => {
  let accessTokenFromCookie = await Cookies.get("userToken");
  try {
    if (accessTokenFromCookie) {
      req.headers.authorization = `Bearer ${accessTokenFromCookie}`;
    } else if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).accessToken
      }`;
    }
    return req;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
});

let refreshTokenCount = 0;
let failedApiRequests = [];

API.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    failedApiRequests.push(error.config);
    if (
      error?.response?.status === 403 &&
      !error?.config?.sent &&
      refreshTokenCount === 0
    ) {
      refreshTokenCount += 1; // To block the Cascading Request
      error.config.sent = true; // To block the Cascading Request

      await tokenMiddleware();

      failedApiRequests.map(async (failedReq) => {
        try {
          failedReq.headers["authorization"] = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).accessToken
          }`;

          await API(failedReq);
        } catch (retryError) {
          // console.error("Retrying request failed:", retryError);
        }
      });
      window.location.reload();
    }

    return error;
  }
);

// Login/Signup APIs
export const logIn = (formData) => API.post("/user/login-user", formData);

export const signUp = (formData) => API.post("/user/create-user", formData);

// export const refreshSession = (refreshToken) =>
//   API.post("/user/refresh-session", refreshToken);

// Post Related APIs
export const fetchPostsByFollowing = () => API.get(`/posts/feeds`);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostById = (id) => API.get(`/posts/${id}`);

export const fetchCommentsByPostId = (id) =>
  API.get(`/posts/getCommentsByPost?postId=${id}`);

export const fetchRepliesByComment = (commentId, postId) =>
  API.get(
    `/posts/replies/getRepliesByComment?commentId=${commentId}&postId=${postId}`
  );

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags || "none"
    }`
  );

export const fetchPostByUser = (id) => API.get(`/posts/user-posts/${id}`);

// Post CRUD APIs
export const createPost = (newPost) => API.post("/posts/create", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/update/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/like/${id}`);

export const likeCommentReply = (postId, commentId, replyId, isComment) =>
  API.patch(
    `/posts/comment-reply-like?postId=${postId}&commentId=${commentId}&replyId=${
      replyId ? replyId : ""
    }&isComment=${isComment}`
  );

export const commentPostWithUserDetails = (id, resultComment) =>
  API.patch(`/posts/${id}/addCommentByPost`, resultComment);

export const replyToCommentPost = (postId, replyToCommentBody) =>
  API.patch(`/posts/${postId}/addReplyToComment`, replyToCommentBody);

export const replyToReplyOfComment = (postId, replyToReplyBody) =>
  API.patch(`/posts/${postId}/addReplyToReply`, replyToReplyBody);

export const deletePostComment = (commentId, postId) =>
  API.delete(
    `/posts/comment/deleteComment?commentId=${commentId}&postId=${postId}`
  );

export const deletePostReply = (replyId, commentId, postId) =>
  API.delete(
    `/posts/reply/deleteReply?replyId=${replyId}&commentId=${commentId}&postId=${postId}`
  );

// Profile APIs
export const fetchFollowingAndFollowersCount = (id) =>
  API.get(`/profile/following-followers/count?profileId=${id}`);

export const fetchFollowingProfileDetails = (id) =>
  API.get(`/profile/following/details?profileId=${id}`);

export const fetchFollowersProfileDetails = (id) =>
  API.get(`/profile/followers/details?profileId=${id}`);

export const fetchProfileDetails = (id, accessTokenFromCookie) =>
  API.get(`/profile/details?profileId=${id}`, {
    token: accessTokenFromCookie,
  });

export const updateProfileDetails = (id, userData) =>
  API.patch(`/profile/update/${id}`, userData);

export const updateProfilePassword = (id, newUpdatePassword) =>
  API.patch(`/profile/update/password/${id}`, newUpdatePassword);

export const updateProfilePictures = (id, newPictures) =>
  API.patch(`/profile/update/profile-pictures/${id}`, newPictures);

// request - Follow/UnFollow

export const sendFollowRequest = (id) => API.post(`/request/follow/${id}`);

export const sendUnFollowRequest = (id) => API.post(`/request/unFollow/${id}`);

export const sendRemoveFollowerRequest = (id) =>
  API.post(`/request/removeFollower/${id}`);

// Chat & Messages

export const fetchUsersBySearch = (search) =>
  API.get(`/user/searchUsers?search=${search}`);
