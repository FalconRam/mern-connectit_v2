import { FETCH_NOTIFICATION_COUNT } from "../constants/actionTypes";

export const fetchNotificationCount = () => async (dispatch) => {
  try {
    const { data } = await api.getNotificationCount();
    dispatch({
      type: FETCH_NOTIFICATION_COUNT,
      payload: data.data.notificationCount,
    });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error("Something went wrong!");
  }
};
