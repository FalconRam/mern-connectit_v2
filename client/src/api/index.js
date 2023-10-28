import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

let localURL = "http://localhost:5000/";
let productionURL = "https://connectit.onrender.com/";

let URL =
  window.location.origin === "http://localhost:3000" ? localURL : productionURL;

const API = axios.create({ baseURL: URL });

API.interceptors.request.use(async (req) => {
  let tokenFromCookie = await Cookies.get("userToken");
  try {
    if (tokenFromCookie) {
      req.headers.authorization = `Bearer ${tokenFromCookie}`;
    } else if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
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
    `/posts/comment-reply-like?postId=${postId}&commentId=${
      isComment && commentId
    }&replyId=${isComment && replyId}&isComment=${isComment}`
  );

export const commentPostWithUserDetails = (id, resultComment) =>
  API.patch(`/posts/${id}/addCommentByPost`, resultComment);

// Login/Signup APIs
export const logIn = (formData) => API.post("/user/login-user", formData);

export const signUp = (formData) => API.post("/user/create-user", formData);

// Profile APIs
export const fetchFollowingAndFollowersCount = (id) =>
  API.get(`/profile/following-followers/count?profileId=${id}`);

export const fetchFollowingProfileDetails = (id) =>
  API.get(`/profile/following/details?profileId=${id}`);

export const fetchFollowersProfileDetails = (id) =>
  API.get(`/profile/followers/details?profileId=${id}`);

export const fetchProfileDetails = (id, tokenFromCookie) =>
  API.post(`/profile/details?profileId=${id}`, { token: tokenFromCookie });

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
