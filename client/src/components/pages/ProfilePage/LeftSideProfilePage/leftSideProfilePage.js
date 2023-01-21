import React from "react";

import { useHistory } from "react-router-dom";
import ShareModal from "../../../Home/MiddleSection/SharePost/ShareModal/shareModal";

import "./leftSideProfilePage.css";

const LeftSideProfilePage = () => {
  const history = useHistory();

  const handleHome = () => {
    history.push("/");
  };

  const handleSearch = () => {
    history.push("/search");
  };

  const handleMessages = () => {
    history.push("/chats");
  };

  const handleNotification = () => {
    history.push("/notification");
  };

  const handleSettings = () => {
    history.push("/profile/settings");
  };

  // const handleCreate = () => {
  //   ShareModal();
  // };

  return (
    <>
      <div className="">
        <div className="nav flex-sm-row flex-md-column justify-content-between customMargin2 customFontSideNav">
          <li className="nav-item p-2 text-dark">
            <span onClick={handleHome} className="sideNavButton">
              <i className="bi bi-house-door-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Home
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span
              className="sideNavButton"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i className="bi bi-plus-circle-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Create
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span onClick={handleSearch} className="sideNavButton">
              <i className="bi bi-search"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Search
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span onClick={handleMessages} className="sideNavButton">
              <i className="bi bi-chat-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Messages
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span onClick={handleNotification} className="sideNavButton">
              <i className="bi bi-bell-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Notification
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span onClick={handleSettings} className="sideNavButton">
              <i className="bi bi-gear-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Settings
              </h6>
            </span>
          </li>
        </div>
      </div>
    </>
  );
};

export default LeftSideProfilePage;
