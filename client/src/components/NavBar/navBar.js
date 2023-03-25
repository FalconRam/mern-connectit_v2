import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";

import logo from "../../assets/logo.png";
import more from "../../assets/more.png";
import Chat from "../Chat/chat";
import "./navBar.css";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const { profileDetails } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const isChatPage = useLocation().pathname === "/chats";

  const [isScreenBelowMd, setIsScreenBelowMd] = useState(false);
  const [winHeight, setWinHeight] = useState(window.outerHeight);
  const [winWidth, setWinWidth] = useState(window.outerWidth);

  // Get the Win Height & Width when the Win size changes
  // and remove the event - resize when page is unmounted
  useEffect(() => {
    const handleResize = () => {
      setWinHeight(window.outerHeight);
      setWinWidth(window.outerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set the boolean if the Win size is reduced below md
  useEffect(() => {
    if (winHeight <= 1080 && winWidth <= 758) {
      setIsScreenBelowMd(true);
    } else {
      setIsScreenBelowMd(false);
    }
  }, [winHeight, winWidth]);

  // set spanProps in the Message span tag only if Win size is above sm
  let spanProps = {};
  if (!isScreenBelowMd)
    spanProps = {
      "data-bs-toggle": "offcanvas",
      "data-bs-target": "#offcanvasWithBothOptions",
      "aria-controls": "offcanvasWithBothOptions",
    };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const handleProfile = () => {
    history.push(`/profile/details?profileId=${user?.id}`);
  };

  const handleMessages = () => {
    // Push to path only if not a Chat page and Win is below md
    isChatPage || (isScreenBelowMd && history.push("/chats"));
  };

  const handleNotification = () => {
    history.push("/notification");
  };

  return (
    <>
      <div className="container-fluid">
        <nav className="navbar fixed-top navbar-dark navBgColor">
          <a
            className="navbar-brand mx-3 navFontColor d-flex align-items-center text-primary"
            href={user ? "/" : "/auth"}
          >
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block"
            />
            ConnectIT
          </a>

          {/* From Medium to xxl Devices Component*/}
          {user && (
            <div role="navigation " className="d-none d-sm-none d-md-block">
              <ul className="nav d-flex align-items-center  justify-content-end nav-listItems me-2">
                <li className="nav-item sideNavButton" onClick={handleProfile}>
                  <a className="nav-link d-flex align-items-center justify-content-center gap-2">
                    <img
                      src={
                        profileDetails?.userDetails?.profilePicture ||
                        profileDetails?.userDetails?.name
                          .charAt(0)
                          .toUpperCase() ||
                        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                      }
                      className="img-thumbnail rounded-circle navProfilePic d-flex align-items-center justify-content-center"
                      alt={profileDetails?.userDetails?.name
                        .charAt(0)
                        .toUpperCase()}
                    />
                    {profileDetails?.userDetails?.name}
                  </a>
                </li>
                <li className="nav-item sideNavButton">
                  <a className="nav-link" onClick={handleProfile}>
                    My Profile
                  </a>
                </li>
                <li
                  className="nav-item sideNavButton"
                  {...(isChatPage || spanProps)}
                  onClick={handleMessages}
                >
                  <a className="nav-link">Messages</a>
                </li>
                <li
                  className="nav-item sideNavButton"
                  onClick={handleNotification}
                >
                  <a className="nav-link">Notification</a>
                </li>
                <li className="nav-item sideNavButton">
                  <a className="nav-link">Settings</a>
                </li>
                <li className="nav-item sideNavButton">
                  <a className="dropdown-item" href="/auth">
                    <button className="btn" onClick={logout}>
                      Logout
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile and below mobile Component */}
          {user && (
            <div className="d-md-none dropdown me-4 ">
              <button
                className="btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={more} alt="more" title="More" className="more-icon" />
              </button>
              <ul className="dropdown-menu text-center">
                <li
                  className="nav-item sideNavButton"
                  {...(isChatPage || spanProps)}
                  onClick={handleProfile}
                >
                  <a className="dropdown-item dropdown-item-custom">
                    {profileDetails?.userDetails?.name}
                  </a>
                </li>
                <li className="nav-item sideNavButton" onClick={handleProfile}>
                  <a className="dropdown-item dropdown-item-custom">
                    My Profile
                  </a>
                </li>
                <li className="nav-item sideNavButton" onClick={handleMessages}>
                  <a className="dropdown-item dropdown-item-custom">Messages</a>
                </li>
                <li
                  className="nav-item sideNavButton"
                  onClick={handleNotification}
                >
                  <a className="dropdown-item dropdown-item-custom">
                    Notification
                  </a>
                </li>
                <li className="nav-item sideNavButton">
                  <a className="dropdown-item dropdown-item-custom">Settings</a>
                </li>
                <li className="nav-item sideNavButton">
                  <a className="dropdown-item" href="/auth">
                    <button
                      className="post-image-btn dropdown-item dropdown-item-custom"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>
        <Chat />
      </div>
    </>
  );
};

export default NavBar;
