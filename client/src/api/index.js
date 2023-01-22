import axios from "axios";

let localURL = "http://localhost:5000/";
let productionURL = "https://connectit.onrender.com/";

let URL =
  window.location.origin === "http://localhost:3000" ? localURL : productionURL;

const API = axios.create({ baseURL: URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPostsByFollowing = () => API.get(`/posts/feeds`);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostById = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags || "none"
    }`
  );

export const createPost = (newPost) => API.post("/posts/create", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/update/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/like/${id}`);

export const commentPostWithUserDetails = (id, resultComment) =>
  API.patch(`/posts/${id}/addComment/byPost`, resultComment);

export const logIn = (formData) => API.post("/user/login-user", formData);

export const signUp = (formData) => API.post("/user/create-user", formData);

export const fetchFollowingAndFollowersCount = (id) =>
  API.get(`/profile/following-followers/count?profileId=${id}`);

export const fetchFollowingProfileDetails = (id) =>
  API.get(`/profile/following/details?profileId=${id}`);

export const fetchFollowersProfileDetails = (id) =>
  API.get(`/profile/followers/details?profileId=${id}`);

export const fetchProfileDetails = (id) =>
  API.get(`/profile/details?profileId=${id}`);

export const fetchPostByUser = (id) => API.get(`/posts/user-posts/${id}`);
