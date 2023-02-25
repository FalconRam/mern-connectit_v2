import * as api from "../api";
import {
  START_LOADING,
  END_LOADING,
  GET_FOLLOWING_AND_FOLLOWERS_COUNT,
  GET_FOLLOWERS_PROFILE_DETAILS,
  GET_FOLLOWING_PROFILE_DETAILS,
  GET_PROFILE_DETAILS,
  UPDATE_PROFILE_DETAILS,
  // UPDATE_PROFILE_PASSWORD,
  UPDATE_PROFILE_PICTURES,
} from "../constants/actionTypes";
import { toast } from "react-toastify";

export const getFollowingAndFollowersCount = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchFollowingAndFollowersCount(id);
    dispatch({ type: GET_FOLLOWING_AND_FOLLOWERS_COUNT, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getFollowingProfileDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchFollowingProfileDetails(id);
    dispatch({ type: GET_FOLLOWING_PROFILE_DETAILS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getFollowersProfileDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchFollowersProfileDetails(id);
    dispatch({ type: GET_FOLLOWERS_PROFILE_DETAILS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getProfileDetails = (id, tokenFromCookie) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.fetchProfileDetails(id, tokenFromCookie);
    dispatch({ type: GET_PROFILE_DETAILS, payload: data });

    // dispatch({ type: END_LOADING });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateProfileDetails = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.updateProfileDetails(id, userData);
    dispatch({ type: UPDATE_PROFILE_DETAILS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const updateProfilePassword =
  (id, newUpdatePassword) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await api.updateProfilePassword(id, newUpdatePassword);
      // dispatch({ type: UPDATE_PROFILE_PASSWORD, payload: data });

      dispatch({ type: END_LOADING });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

export const updateProfilePictures = (id, newPictures) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.updateProfilePictures(id, newPictures);
    dispatch({ type: UPDATE_PROFILE_PICTURES, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
