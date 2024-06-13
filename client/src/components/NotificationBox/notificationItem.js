import React from "react";
import MiniProfilePicture from "../Shared/MiniProfilePicture/miniProfilePicture";

const NotificationItem = ({ notification, index }) => {
  console.log(notification);
  if (notification.type === "request")
    return (
      <NotificationItemWrapper key={index}>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div className="notification-item d-flex justify-content-center align-items-center gap-2">
            <MiniProfilePicture
              post={notification?.metaData?.requestBy}
              isNotification={true}
            />
            <p className="mb-0 postCreator">{notification?.message}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-1">
            <button className="btn btn-outline-success btn-sm-cutom">
              Accept
            </button>
            <button className="btn btn-outline-danger btn-sm-cutom">
              Reject
            </button>
          </div>
        </div>
      </NotificationItemWrapper>
    );
};

const NotificationItemWrapper = ({ children }) => {
  return <div className="notification-wrapper m-1">{children}</div>;
};

export default NotificationItem;
