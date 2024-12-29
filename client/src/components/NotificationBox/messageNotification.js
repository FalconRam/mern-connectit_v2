import React, { useState } from "react";
import NotificationItem from "./notificationItem";

const MessageNotification = ({
  setShowNotificationBox,
  isNotificationListLoading,
  notifications,
}) => {
  const [localNotificationList, setLocalNotificationList] = useState(
    notifications?.notifications
  );
  return (
    <div>
      {localNotificationList?.map((notification, index) => (
        <NotificationItem
          notification={notification}
          key={index}
          setShowNotificationBox={setShowNotificationBox}
          notificationPageMetaData={{ skip: 0 }}
        />
      ))}
    </div>
  );
};

export default MessageNotification;
