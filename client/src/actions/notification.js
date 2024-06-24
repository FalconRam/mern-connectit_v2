import { toast } from "react-toastify";
import * as api from "../api";

import {
  FETCH_NOTIFICATION_COUNT,
  FETCH_NOTIFICATIONS_LIST,
  START_NOTIFICATION_LIST_LOADING,
  STOP_NOTIFICATION_LIST_LOADING,
} from "../constants/actionTypes";

export const fetchNotificationCount = () => async (dispatch) => {
  try {
    const { data } = await api.getNotificationCount();
    dispatch({
      type: FETCH_NOTIFICATION_COUNT,
      payload: data.data,
    });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(error);
    toast.error("Something went wrong!");
  }
};

export const fetchNotificationList = () => async (dispatch) => {
  try {
    dispatch({
      type: START_NOTIFICATION_LIST_LOADING,
    });
    const { data } = await api.getNotificationsList();
    dispatch({
      type: FETCH_NOTIFICATIONS_LIST,
      payload: data.data,
    });
    dispatch({
      type: STOP_NOTIFICATION_LIST_LOADING,
    });
  } catch (error) {
    dispatch({
      type: STOP_NOTIFICATION_LIST_LOADING,
    });
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(error);
    toast.error("Something went wrong!");
  }
};

export const updateReadNotificationAction = () => async (dispatch) => {
  try {
    // dispatch({
    //   type: START_NOTIFICATION_LIST_LOADING,
    // });
    const { data } = await api.updateReadNotificationAPI();
    // dispatch({
    //   type: FETCH_NOTIFICATIONS_LIST,
    //   payload: data.data,
    // });
    // dispatch({
    //   type: STOP_NOTIFICATION_LIST_LOADING,
    // });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(error);
    toast.error("Something went wrong!");
  }
};
