import React, { useEffect, useState } from "react";
import NotificationItem from "./notificationItem";
import { useDispatch } from "react-redux";
import { fetchNotificationList } from "../../actions/notification";
import LoaderMini from "../Shared/utils/loaderMini";

const RequestNotification = ({
  setShowNotificationBox,
  isNotificationListLoading,
  notifications,
}) => {
  const dispatch = useDispatch();

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
    <div className="">
      {localNotificationList?.map((notification, index) => (
        <NotificationItem
          notification={notification}
          key={index}
          setShowNotificationBox={setShowNotificationBox}
          notificationPageMetaData={notificationPageMetaData}
        />
      ))}
      {!isNotificationListLoading ? (
        <p
          className={`mb-1 mt-1 eyeButton commenterCmt ${
            !canLoadMore ? "text-muted" : ""
          }`}
          onClick={handleLoadMore}
        >
          {canLoadMore ? "Load More..." : "No More Notifications"}
        </p>
      ) : (
        <LoaderMini />
      )}
    </div>
  );
};

export default RequestNotification;
