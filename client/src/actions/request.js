import * as api from "../api";
import {
  START_FOllOW_UNFOLLOW_LOADING,
  END_FOllOW_UNFOLLOW_LOADING,
  SEND_FOllOW_REQUEST,
  SEND_UNFOllOW_REQUEST,
  REMOVE_FOLLOWER,
  GET_FOLLOWERS_PROFILE_DETAILS,
} from "../constants/actionTypes";
import { toast } from "react-toastify";

export const sendFollowRequestAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_FOllOW_UNFOLLOW_LOADING });

    const { data } = await api.sendFollowRequest(id);
    dispatch({ type: SEND_FOllOW_REQUEST, payload: data });

    dispatch({ type: END_FOllOW_UNFOLLOW_LOADING });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message)
      if (error.response.data.message === "jwt expired")
        window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({ type: END_FOllOW_UNFOLLOW_LOADING });
    toast.error("Something went wrong!");
  }
};

export const sendUnFollowRequestAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_FOllOW_UNFOLLOW_LOADING });

    const { data } = await api.sendUnFollowRequest(id);
    dispatch({ type: SEND_UNFOllOW_REQUEST, payload: data });

    dispatch({ type: END_FOllOW_UNFOLLOW_LOADING });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message)
      if (error.response.data.message === "jwt expired")
        window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({ type: END_FOllOW_UNFOLLOW_LOADING });
    toast.error("Something went wrong!");
  }
};

export const sendRemoveFollowerAction = (id, profileId) => async (dispatch) => {
  try {
    dispatch({ type: START_FOllOW_UNFOLLOW_LOADING });

    const { data } = await api.sendRemoveFollowerRequest(id);
    dispatch({ type: REMOVE_FOLLOWER, payload: data });

    const response = await api.fetchFollowersProfileDetails(profileId);
    dispatch({
      type: GET_FOLLOWERS_PROFILE_DETAILS,
      payload: response.data,
    });

    dispatch({ type: END_FOllOW_UNFOLLOW_LOADING });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message)
      if (error.response.data.message === "jwt expired")
        window.location.href = "/auth";
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({ type: END_FOllOW_UNFOLLOW_LOADING });
    toast.error("Something went wrong!");
  }
};

export const followRequestResponseAction = (payload) => async (dispatch) => {
  try {
    // dispatch({ type: START_FOllOW_UNFOLLOW_LOADING });

    const { data } = await api.followRequestResponseAPI(payload);
    // dispatch({ type: ACCEPT_FOLLOW_REQUEST, payload: data });

    // dispatch({ type: END_FOllOW_UNFOLLOW_LOADING });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error("Something went wrong!");
  }
};
