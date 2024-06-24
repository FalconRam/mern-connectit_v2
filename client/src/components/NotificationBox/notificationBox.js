import React from "react";
import { useHistory } from "react-router-dom";

import "./notificationBox.css";
import { useSelector } from "react-redux";
import LoaderMini from "../Shared/utils/loaderMini";
import NotificationItem from "./notificationItem";

const NotificationBox = ({ showNotificationBox, setShowNotificationBox }) => {
  const { isNotificationListLoading, notificationCount, notificationsList } =
    useSelector((state) => state.notification);
  console.log({ notificationCount, notificationsList });

  const history = useHistory();

  const openNotificationPage = () => {
    history.push("/notification");
    setShowNotificationBox(false);
  };

  return (
    <div className="notification">
      <div className="card notification-card text-center">
        <div className="d-flex justify-content-between align-items-center m-2 mb-1">
          <button
            className="btn text-primary postCreator"
            onClick={openNotificationPage}
          >
            All Notifications
          </button>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowNotificationBox(false)}
          />
        </div>
        <div className="custom-divider-1 mb-2" />
        {isNotificationListLoading ? (
          <LoaderMini />
        ) : (
          <div className="mb-2">
            {notificationsList?.map((notification, index) => (
              <NotificationItem
                notification={notification}
                key={index}
                setShowNotificationBox={setShowNotificationBox}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationBox;
