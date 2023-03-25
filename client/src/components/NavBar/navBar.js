import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";

import logo from "../../assets/logo.png";
import more from "../../assets/more.png";

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

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const handleProfile = () => {
    history.push(`/profile/details?profileId=${user?.id}`);
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
                <li className="nav-item sideNavButton" onClick={handleProfile}>
                  <a className="dropdown-item dropdown-item-custom">
                    {profileDetails?.userDetails?.name}
                  </a>
                </li>
                <li className="nav-item sideNavButton" onClick={handleProfile}>
                  <a className="dropdown-item dropdown-item-custom">
                    My Profile
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
      </div>
    </>
  );
};

export default NavBar;
