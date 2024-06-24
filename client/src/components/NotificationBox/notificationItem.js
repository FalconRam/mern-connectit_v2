import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import MiniProfilePicture from "../Shared/MiniProfilePicture/miniProfilePicture";
import { followRequestResponseAction } from "../../actions/request";

const NotificationItem = ({ notification, index, setShowNotificationBox }) => {
  const [localNotification, setLocalNotification] = useState(notification);
  const history = useHistory();
  const dispatch = useDispatch();

  // const handleProfile = () => {
  //   setShowNotificationBox(false);
  //   history.push(decodeURIComponent(notification.actionURL));
  //   return;
  // };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLocalNotification((prev) => {
      return { ...prev, isRead: true };
    });
  };
  console.log(localNotification);
  const handleRequest = (isAccept) => {
    dispatch(
      followRequestResponseAction({
        notificationId: localNotification._id,
        isAccept,
      })
    );
  };
  if (localNotification.type === "request")
    return (
      <NotificationItemWrapper
        key={index}
        isRead={localNotification?.isRead}
        handleUpdate={(e) => handleUpdate(e)}
      >
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div className="notification-item d-flex justify-content-center align-items-center gap-2 likeBtn">
            <MiniProfilePicture
              post={localNotification?.metaData?.requestBy}
              isNotification={true}
              actionURL={localNotification?.actionURL}
              setShowNotificationBox={setShowNotificationBox}
            />
            <p className="mb-0 postCreator">{localNotification?.message}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-1">
            <button
              className="btn btn-outline-success btn-sm-custom"
              onClick={() => handleRequest(true)}
            >
              Accept
            </button>
            <button
              className="btn btn-outline-danger btn-sm-custom"
              onClick={() => handleRequest(false)}
            >
              Reject
            </button>
          </div>
        </div>
      </NotificationItemWrapper>
    );
};

const NotificationItemWrapper = ({ children, isRead, handleUpdate }) => {
  return (
    <div
      className={`${
        !isRead && "notification-unread p-1 mb-2"
      } notification-wrapper`}
      onClick={handleUpdate}
    >
      <div className="m-1 mt-1 mb-2">{children}</div>
      {/* <div className="divider custom-divider-2 bg-dark"></div> */}
    </div>
  );
};

export default NotificationItem;
