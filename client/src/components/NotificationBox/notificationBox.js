import React, { useState, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./notificationBox.css";
import RequestNotification from "./requestNotification";
import MessageNotification from "./messageNotification";

const notificationsTypes = ["messageNotification", "followRequests"];

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab, tabs }) => (
  <ul
    className="nav nav-tabs text-center postCreator"
    id="myTab"
    role="tablist"
  >
    {tabs.map((tab, index) => (
      <li className="nav-item" role="presentation" key={tab}>
        <button
          className={activeTab === tab ? "nav-link active" : "nav-link"}
          id={`${tab}-tab`}
          data-bs-toggle="tab"
          data-bs-target={`#${tab}-tab-pane`}
          type="button"
          role="tab"
          aria-controls={`${tab}-tab-pane`}
          aria-selected={activeTab === tab}
          onClick={() => setActiveTab(tab)}
        >
          {index === 0 ? "Notifications" : "Follow Requests"}
        </button>
      </li>
    ))}
  </ul>
);

// NotificationBox Component
const NotificationBox = ({ showNotificationBox, setShowNotificationBox }) => {
  const history = useHistory();
  const [tab, setTab] = useState(notificationsTypes[0]);

  const { isNotificationListLoading, notifications } = useSelector(
    (state) => state.notification
  );

  const { messageNotifications, requestNotifications } = useMemo(() => {
    return notifications?.notifications?.reduce(
      (acc, notif) => {
        if (notif.type === "request") acc.requestNotifications.push(notif);
        else acc.messageNotifications.push(notif);
        return acc;
      },
      {
        messageNotifications: [],
        requestNotifications: [],
      }
    );
  }, [notifications]);

  const openNotificationPage = useCallback(() => {
    history.push("/notification");
    setShowNotificationBox(false);
  }, [history, setShowNotificationBox]);

  const closeNotificationBox = useCallback(() => {
    setShowNotificationBox(false);
  }, [setShowNotificationBox]);

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
            onClick={closeNotificationBox}
          />
        </div>
        <div className="custom-divider-1 mb-2" />
        <TabNavigation
          activeTab={tab}
          setActiveTab={setTab}
          tabs={notificationsTypes}
        />
        {tab === notificationsTypes[0] ? (
          <MessageNotification
            setShowNotificationBox={setShowNotificationBox}
            isNotificationListLoading={isNotificationListLoading}
            notifications={{
              ...notifications,
              notifications: messageNotifications,
            }}
          />
        ) : (
          <RequestNotification
            setShowNotificationBox={setShowNotificationBox}
            isNotificationListLoading={isNotificationListLoading}
            notifications={{
              ...notifications,
              notifications: requestNotifications,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationBox;
