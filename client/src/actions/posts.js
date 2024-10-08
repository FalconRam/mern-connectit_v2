import * as api from "../api";
import {
  FETCH_ALL_POSTS,
  FETCH_POSTS_BY_FOLLOWING,
  FETCH_POSTS_BY_FOLLOWING_UPDATED_SAVE,
  FETCH_POSTS_BY_FOLLOWING_UPDATED_UNSAVE,
  FETCH_BY_SEARCH,
  FETCH_SAVED_POST_BY_USER,
  CREATE_POST,
  UPDATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  LIKE_UNLIKE_COMMENT_REPLY,
  COMMENT_POST_WITH_USER_DETAILS,
  SUBMIT_REPLY_TO_COMMENT_OR_REPLY,
  DELETE_POST,
  DELETE_USER_POST,
  START_POST_LOADING,
  END_POST_LOADING,
  FETCH_POST_BY_ID,
  FETCH_POST_BY_USER,
  FETCH_COMMENT_BY_POST_ID,
  START_FETCH_COMMENT_BY_POST_ID,
  END_FETCH_COMMENT_BY_POST_ID,
  START_FETCH_REPLIES_BY_COMMENT,
  FETCH_REPLIES_BY_COMMENT,
  END_FETCH_REPLIES_BY_COMMENT,
  SET_STATE_FOR_COMMENT_REPLY,
  SET_COMMENT_REPLY_DETAILS,
  DELETE_POST_COMMENT,
  DELETE_POST_REPLY,
  GET_PROFILE_DETAILS,
  END_PROFILE_LOADING,
} from "../constants/actionTypes";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Action Creators

export const getPostsByFollowing = () => async (dispatch) => {
  try {
    dispatch({ type: START_POST_LOADING });

    const { data } = await api.fetchPostsByFollowing();
    dispatch({ type: FETCH_POSTS_BY_FOLLOWING, payload: data });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  } finally {
    dispatch({ type: END_POST_LOADING });
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_POST_LOADING });

    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL_POSTS, payload: data });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  } finally {
    dispatch({ type: END_POST_LOADING });
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    const accessTokenFromCookie = Cookies.get("userToken");

    dispatch({ type: START_POST_LOADING });

    const { data } = await api.fetchPostById(id);
    dispatch({ type: FETCH_POST_BY_ID, payload: data });

    const { data: profileData } = await api.fetchProfileDetails(
      data.data.creator,
      accessTokenFromCookie
    );
    dispatch({ type: GET_PROFILE_DETAILS, payload: profileData });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);

    toast.error("Something went wrong!");
  } finally {
    dispatch({ type: END_POST_LOADING });
    dispatch({ type: END_PROFILE_LOADING });
  }
};

export const getCommentsWithProfilePicture =
  (id, isLoad) => async (dispatch) => {
    try {
      isLoad && dispatch({ type: START_FETCH_COMMENT_BY_POST_ID });

      const { data } = await api.fetchCommentsByPostId(id);
      dispatch({ type: FETCH_COMMENT_BY_POST_ID, payload: data });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        if (error.response.data.message === "jwt expired")
          window.location.href = "/auth";
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      toast.error("Something went wrong!");
    } finally {
      isLoad && dispatch({ type: END_FETCH_COMMENT_BY_POST_ID });
    }
  };

export const getRepliesWithProfilePicture =
  (commentId, postId) => async (dispatch) => {
    try {
      dispatch({ type: START_FETCH_REPLIES_BY_COMMENT });

      const { data } = await api.fetchRepliesByComment(commentId, postId);
      dispatch({ type: FETCH_REPLIES_BY_COMMENT, payload: data });

      return data.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        if (error.response.data.message === "jwt expired")
          window.location.href = "/auth";
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      toast.error("Something went wrong!");
    } finally {
      dispatch({ type: END_FETCH_REPLIES_BY_COMMENT });
    }
  };

export const getPostByUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_POST_LOADING });

    const { data } = await api.fetchPostByUser(id);
    dispatch({ type: FETCH_POST_BY_USER, payload: data });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  } finally {
    dispatch({ type: END_POST_LOADING });
  }
};

export const getSavedPosts =
  (loadingRequired = false) =>
  async (dispatch) => {
    try {
      loadingRequired && dispatch({ type: START_POST_LOADING });

      const { data } = await api.fetchSavedPosts();

      dispatch({ type: FETCH_SAVED_POST_BY_USER, payload: data.data });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      toast.error("Something went wrong!");
    } finally {
      loadingRequired && dispatch({ type: END_POST_LOADING });
    }
  };

export const getPostsBySearch = (search) => async (dispatch) => {
  try {
    dispatch({ type: START_POST_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(search);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  } finally {
    dispatch({ type: END_POST_LOADING });
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
    if (error.response && error.response.data && error.response.data.message)
      if (error.response && error.response.data && error.response.data.message)
        if (error.response.data.message === "jwt expired")
          window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  }

  try {
    const { data } = await toast.promise(api.fetchPostsByFollowing(), {
      pending: "Fetching New Posts...",
      success: "Fetched Successfully 👌",
      error: "Fetching Unsuccessfull 🤯",
    });
    dispatch({ type: FETCH_POSTS_BY_FOLLOWING, payload: data });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  } finally {
  }
};

export const updatePost = (id, post, history) => async (dispatch) => {
  try {
    const { data } = await toast.promise(api.updatePost(id, post), {
      pending: "Updating Post...",
      success: "Updated Successfully 👌",
      error: "Updating Failed 🤯",
    });
    dispatch({ type: UPDATE_POST, payload: data });
    dispatch({ type: FETCH_POST_BY_ID, payload: data });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  }
};

export const deleteUserPost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_USER_POST, payload: id });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  }
};

export const unLikePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UNLIKE_POST, payload: data });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
  }
};

export const saveUnSavePost = (postId, shouldSave) => async (dispatch) => {
  try {
    const { data } = await api.saveUnSavePost(postId);
    if (shouldSave) {
      // console.log("Saving");
      dispatch({
        type: FETCH_POSTS_BY_FOLLOWING_UPDATED_SAVE,
        payload: postId,
      });
    } else {
      // console.log("Un-Saving");
      dispatch({
        type: FETCH_POSTS_BY_FOLLOWING_UPDATED_UNSAVE,
        payload: postId,
      });
    }

    return data.data.isSaved;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    toast.error("Something went wrong!");
    return false;
  }
};

export const likeCommentReply =
  ({ postId, commentId, replyId, isComment }) =>
  async (dispatch) => {
    try {
      const { data } = await api.likeCommentReply(
        postId,
        commentId,
        replyId,
        isComment
      );
      dispatch({ type: LIKE_UNLIKE_COMMENT_REPLY, payload: data });
      const comments = await api.fetchCommentsByPostId(postId);
      dispatch({ type: FETCH_COMMENT_BY_POST_ID, payload: comments.data });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      toast.error("Something went wrong!");
    }
  };

export const commentPostWithUserDetails =
  (id, resultComment) => async (dispatch) => {
    try {
      const { data } = await api.commentPostWithUserDetails(id, resultComment);
      dispatch({ type: COMMENT_POST_WITH_USER_DETAILS, payload: data });
      return data.data.commentsInfo;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      toast.error("Something went wrong!");
    }
  };

export const submitReplyToCommentAction =
  (postId, replyToCommentBody) => async (dispatch) => {
    try {
      const { data } = await api.replyToCommentPost(postId, replyToCommentBody);
      dispatch({ type: SUBMIT_REPLY_TO_COMMENT_OR_REPLY, payload: data });
      return;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      toast.error("Something went wrong!");
    }
  };

export const submitReplyToReplyAction =
  (postId, replyToReplyBody) => async (dispatch) => {
    try {
      const { data } = await api.replyToReplyOfComment(
        postId,
        replyToReplyBody
      );
      dispatch({ type: SUBMIT_REPLY_TO_COMMENT_OR_REPLY, payload: data });
      const replies = await api.fetchRepliesByComment(
        replyToReplyBody.commentId,
        postId
      );
      dispatch({ type: FETCH_REPLIES_BY_COMMENT, payload: replies.data });
      return;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      toast.error("Something went wrong!");
    }
  };

export const deletePostCommentAction =
  (commentId, postId) => async (dispatch) => {
    try {
      await api.deletePostComment(commentId, postId);
      dispatch({ type: DELETE_POST_COMMENT, payload: { commentId, postId } });

      const { data } = await api.fetchCommentsByPostId(postId);
      dispatch({ type: FETCH_COMMENT_BY_POST_ID, payload: data });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      toast.error("Something went wrong!");
    }
  };

export const deletePostReplyAction =
  (replyId, commentId, postId) => async (dispatch) => {
    try {
      await api.deletePostReply(replyId, commentId, postId);
      dispatch({
        type: DELETE_POST_REPLY,
        payload: { replyId, commentId, postId },
      });
      const { data } = await api.fetchRepliesByComment(commentId, postId);
      dispatch({ type: FETCH_REPLIES_BY_COMMENT, payload: data });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      toast.error("Something went wrong!");
    }
  };

// Set Global State to handle Reply to Post, Comment and Reply
export const handleStateForCommentReply = (data) => (dispatch) => {
  try {
    dispatch({ type: SET_STATE_FOR_COMMENT_REPLY, payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};

export const setCommentReplydetails = (data) => (dispatch) => {
  try {
    dispatch({ type: SET_COMMENT_REPLY_DETAILS, payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};
