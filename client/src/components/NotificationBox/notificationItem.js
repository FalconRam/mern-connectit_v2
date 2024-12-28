import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import MiniProfilePicture from "../Shared/MiniProfilePicture/miniProfilePicture";
import { followRequestResponseAction } from "../../actions/request";
import { updateReadNotificationAction } from "../../actions/notification";
import moment from "moment";

const NotificationItem = ({
  notification,
  index,
  setShowNotificationBox,
  notificationPageMetaData,
}) => {
  const [localNotification, setLocalNotification] = useState(notification);
  const history = useHistory();
  const dispatch = useDispatch();

  // const handleProfile = () => {
  //   setShowNotificationBox(false);
  //   history.push(decodeURIComponent(notification.actionURL));
  //   return;
  // };

  // console.log(localNotification);

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

    dispatch(
      updateReadNotificationAction(readNotifPayload, {
        include_count: true,
        skip: notificationPageMetaData.n_skip,
        limit: notificationPageMetaData.n_limit,
      })
    );
  };

  const handleRemoveFollower = () => {};

  const getButtonAction = () => {
    if (
      typeof localNotification?.metaData?.requestBy?.isAccepted !== "boolean"
    ) {
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
    if (!localNotification?.metaData?.requestBy?.isAccepted) {
      return (
        <>
          <button
            className="btn btn-outline-danger btn-sm-custom"
            onClick={() => handleRemoveFollower()}
          >
            Unfollow
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
        notificationPageMetaData={notificationPageMetaData}
      >
        <div className="d-flex justify-content-between align-items-center ms-2 me-2">
          <div className="notification-item d-flex justify-content-center align-items-center gap-2 likeBtn">
            <MiniProfilePicture
              post={localNotification?.metaData?.requestBy}
              isNotification={true}
              actionURL={localNotification?.actionURL}
              setShowNotificationBox={setShowNotificationBox}
            />
            <div className="d-flex flex-column align-items-start">
              <p className="mb-0 postCreator">{localNotification?.message}</p>
              <p className="mb-0 commenterCmt text-muted">
                {moment(localNotification?.createdAt).fromNow()}
              </p>
            </div>
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
  notificationPageMetaData,
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
    !isRead &&
      dispatch(
        updateReadNotificationAction(payload, {
          include_count: true,
          skip: notificationPageMetaData.n_skip,
          limit: notificationPageMetaData.n_limit,
        })
      );
  };
  return (
    <div
      className={`${
        !isRead && "notification-unread"
      } notification-wrapper  p-1`}
      onClick={handleUpdate}
    >
      <div className="m-1 mt-1">{children}</div>
    </div>
  );
};

export default NotificationItem;
