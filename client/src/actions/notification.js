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
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(error);
    toast.error("Something went wrong!");
  } finally {
    dispatch({
      type: STOP_NOTIFICATION_LIST_LOADING,
    });
  }
};

export const updateReadNotificationAction =
  (notificationId) => async (dispatch) => {
    try {
      const { data: updateNotificationResp } =
        await api.updateReadNotificationAPI(notificationId);
      const { data: notificationListResp } = await api.getNotificationsList();
      dispatch({
        type: FETCH_NOTIFICATIONS_LIST,
        payload: notificationListResp.data,
      });
      const { data: notificationCount } = await api.getNotificationCount();
      dispatch({
        type: FETCH_NOTIFICATION_COUNT,
        payload: notificationCount.data,
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
