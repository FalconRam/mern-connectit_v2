import * as api from "../api";
import {
  START_LOADING,
  END_LOADING,
  GET_FOLLOWING_AND_FOLLOWERS_COUNT,
  GET_FOLLOWERS_PROFILE_DETAILS,
  GET_FOLLOWING_PROFILE_DETAILS,
  GET_PROFILE_DETAILS,
} from "../constants/actionTypes";

export const getFollowingAndFollowersCount = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchFollowingAndFollowersCount(id);
    dispatch({ type: GET_FOLLOWING_AND_FOLLOWERS_COUNT, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingProfileDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchFollowingProfileDetails(id);
    dispatch({ type: GET_FOLLOWING_PROFILE_DETAILS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowersProfileDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchFollowersProfileDetails(id);
    dispatch({ type: GET_FOLLOWERS_PROFILE_DETAILS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getProfileDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchProfileDetails(id);
    dispatch({ type: GET_PROFILE_DETAILS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}