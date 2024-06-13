import {
  START_NOTIFICATION_LIST_LOADING,
  STOP_NOTIFICATION_LIST_LOADING,
  FETCH_NOTIFICATION_COUNT,
  FETCH_NOTIFICATIONS_LIST,
} from "../constants/actionTypes";

const initialState = {
  notificationCount: 0,
  notificationsList: [],
  isNotificationListLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_NOTIFICATION_LIST_LOADING:
      return { ...state, isNotificationListLoading: true };
    case STOP_NOTIFICATION_LIST_LOADING:
      return { ...state, isNotificationListLoading: false };
    case FETCH_NOTIFICATION_COUNT:
      return { ...state, notificationCount: action.payload.notificationCount };
    case FETCH_NOTIFICATIONS_LIST:
      return { ...state, notificationsList: action.payload };
    default:
      return state;
  }
};
