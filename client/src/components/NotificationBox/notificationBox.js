import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./notificationBox.css";
import { useDispatch, useSelector } from "react-redux";
import LoaderMini from "../Shared/utils/loaderMini";
import NotificationItem from "./notificationItem";
import { fetchNotificationList } from "../../actions/notification";

const NotificationBox = ({ showNotificationBox, setShowNotificationBox }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isNotificationListLoading, notifications } = useSelector(
    (state) => state.notification
  );

  const [localNotificationList, setLocalNotificationList] = useState([]);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [notificationPageMetaData, setNotificationPageMetaData] = useState({
    skip: 3,
    totalPage: 0,
    notificationCount: 0,
  });

  useEffect(() => {
    setLocalNotificationList(notifications?.notifications);
    setNotificationPageMetaData((prev) => ({
      ...prev,
      totalPage: Math.ceil(notifications.count / 3),
      notificationCount: notifications.count,
    }));
  }, [isNotificationListLoading]);

  useEffect(() => {
    setCanLoadMore(
      notificationPageMetaData.skip <=
        notificationPageMetaData.notificationCount &&
        notifications?.notifications?.length !== // from state (will have prev fetched notifications)
          notificationPageMetaData.notificationCount
    );
  }, [notificationPageMetaData]);

  const openNotificationPage = () => {
    history.push("/notification");
    setShowNotificationBox(false);
  };

  const handleLoadMore = () => {
    if (canLoadMore) {
      dispatch(fetchNotificationList(true, notificationPageMetaData.skip));
      setNotificationPageMetaData((prev) => ({
        ...prev,
        skip: prev.skip + 3,
      }));
    }
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
          <div className="">
            {localNotificationList?.map((notification, index) => (
              <NotificationItem
                notification={notification}
                key={index}
                setShowNotificationBox={setShowNotificationBox}
                notificationPageMetaData={notificationPageMetaData}
              />
            ))}
            <p
              className={`mb-1 mt-1 eyeButton commenterCmt ${
                !canLoadMore ? "text-muted" : ""
              }`}
              onClick={handleLoadMore}
            >
              {canLoadMore ? "Load More..." : "No More Notifications"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationBox;
