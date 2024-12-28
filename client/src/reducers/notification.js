import {
  START_NOTIFICATION_LIST_LOADING,
  STOP_NOTIFICATION_LIST_LOADING,
  FETCH_NOTIFICATION_COUNT,
  FETCH_NOTIFICATIONS_LIST,
} from "../constants/actionTypes";

const initialState = {
  notificationCount: 0,
  notifications: { count: 0, notifications: [] },
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
      const mergedNotifications = [];
      if (!action.payload.clearOld) {
        const existingNotifications = state.notifications.notifications;
        mergedNotifications.push(...existingNotifications);
        const existingNotificationsIds = new Set(
          existingNotifications.map((item) => item._id)
        );
        const newNotifications = action.payload.notifications;
        mergedNotifications.push(
          ...newNotifications.filter(
            (new_notif) => !existingNotificationsIds.has(new_notif._id)
          )
        );
      }

      return {
        ...state,
        notifications: {
          count: action.payload.count,
          notifications: action.payload.clearOld
            ? action.payload.notifications
            : mergedNotifications,
        },
      };
    default:
      return state;
  }
};

// notifications: [
//   ...state.notifications.notifications,
//   ...action.payload.notifications.filter(
//     (notif) => notif._id !== state.notifications.notifications._id
//   ),
// ],
