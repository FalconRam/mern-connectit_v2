import * as api from "../api";
import {
  FETCH_ALL_POSTS,
  FETCH_POSTS_BY_FOLLOWING,
  FETCH_BY_SEARCH,
  CREATE_POST,
  UPDATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST_WITH_USER_DETAILS,
  DELETE_POST,
  DELETE_USER_POST,
  START_POST_LOADING,
  END_POST_LOADING,
  FETCH_POST_BY_ID,
  FETCH_POST_BY_USER,
} from "../constants/actionTypes";
import { toast } from "react-toastify";

// Action Creators

export const getPostsByFollowing = () => async (dispatch) => {
  try {
    dispatch({ type: START_POST_LOADING });

    const { data } = await api.fetchPostsByFollowing();
    dispatch({ type: FETCH_POSTS_BY_FOLLOWING, payload: data });

    dispatch({ type: END_POST_LOADING });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_POST_LOADING });

    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL_POSTS, payload: data });

    dispatch({ type: END_POST_LOADING });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_POST_LOADING });

    const { data } = await api.fetchPostById(id);
    dispatch({ type: FETCH_POST_BY_ID, payload: data });

    dispatch({ type: END_POST_LOADING });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getPostByUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_POST_LOADING });

    const { data } = await api.fetchPostByUser(id);
    dispatch({ type: FETCH_POST_BY_USER, payload: data });

    dispatch({ type: END_POST_LOADING });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getPostsBySearch = (search) => async (dispatch) => {
  try {
    dispatch({ type: START_POST_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(search);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    dispatch({ type: END_POST_LOADING });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    const { data } = await toast.promise(api.createPost(post), {
      pending: "Posting...",
      success: "Posted Successfully 👌",
      error: "Posting Unsuccessfull 🤯",
    });
    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }

  try {
    const { data } = await toast.promise(api.fetchPostsByFollowing(), {
      pending: "Fetching New Posts...",
      success: "Fetched Successfully 👌",
      error: "Fetching Unsuccessfull 🤯",
    });
    dispatch({ type: FETCH_POSTS_BY_FOLLOWING, payload: data });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updatePost = (id, post, history) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    history.push(`/posts/${id}`);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const deleteUserPost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_USER_POST, payload: id });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const unLikePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UNLIKE_POST, payload: data });
  } catch (error) {
    if (error.response.data.message === "jwt expired")
      window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const commentPostWithUserDetails =
  (id, resultComment) => async (dispatch) => {
    try {
      const { data } = await api.commentPostWithUserDetails(id, resultComment);
      dispatch({ type: COMMENT_POST_WITH_USER_DETAILS, payload: data });
      return data.commentsInfo;
    } catch (error) {
      if (error.response.data.message === "jwt expired")
        window.location.href = "/auth";
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
