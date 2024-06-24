import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import MiniProfilePicture from "../Shared/MiniProfilePicture/miniProfilePicture";
import { followRequestResponseAction } from "../../actions/request";
import { updateReadNotificationAction } from "../../actions/notification";

const NotificationItem = ({ notification, index, setShowNotificationBox }) => {
  const [localNotification, setLocalNotification] = useState(notification);
  const history = useHistory();
  const dispatch = useDispatch();

  // const handleProfile = () => {
  //   setShowNotificationBox(false);
  //   history.push(decodeURIComponent(notification.actionURL));
  //   return;
  // };

  console.log(localNotification);

  // const updateNotification = () => {
  //   const payload = {
  //     notificationId: localNotification._id,
  //     type: localNotification.type,
  //     isAccepted: null,
  //   };
  //   dispatch(updateReadNotificationAction(payload));
  // };

  // useEffect(() => {
  //   if (localNotification.isRead) updateNotification();
  // }, [localNotification.isRead]);

  const handleRequest = (isAccept) => {
    console.log(isAccept);
    setLocalNotification((prev) => {
      return { ...prev, isRead: true };
    });
    dispatch(
      followRequestResponseAction({
        notificationId: localNotification._id,
        isAccept,
      })
    );
    const readNotifPayload = {
      notificationId: localNotification._id,
      type: localNotification.type,
      isAccepted: isAccept,
    };

    dispatch(updateReadNotificationAction(readNotifPayload));
  };

  const handleRemoveFollower = () => {};

  const getButtonAction = () => {
    if (localNotification?.metaData?.requestBy?.isAccepted === null) {
      return (
        <>
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
        </>
      );
    }
    if (localNotification?.metaData?.requestBy?.isAccepted === true) {
      return (
        <>
          <button
            className="btn btn-outline-success btn-sm-custom"
            onClick={() => handleRemoveFollower()}
          >
            Remove
          </button>
        </>
      );
    }
    return;
  };

  if (localNotification.type === "request")
    return (
      <NotificationItemWrapper
        key={index}
        localNotification={localNotification}
        isRead={localNotification?.isRead}
        setLocalNotification={setLocalNotification}
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
            {getButtonAction()}
          </div>
        </div>
      </NotificationItemWrapper>
    );
};

const NotificationItemWrapper = ({
  children,
  localNotification,
  isRead,
  setLocalNotification,
}) => {
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    setLocalNotification((prev) => {
      return { ...prev, isRead: true };
    });
    const payload = {
      notificationId: localNotification._id,
      type: localNotification.type,
      isAccepted: null,
    };
    !isRead && dispatch(updateReadNotificationAction(payload));
  };
  return (
    <div
      className={`${
        !isRead && "notification-unread"
      } notification-wrapper custom-divider-2 p-1`}
      onClick={handleUpdate}
    >
      <div className="m-1 mt-1">{children}</div>
    </div>
  );
};

export default NotificationItem;
