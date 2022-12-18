import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";

import logo from "../../assets/logo.png";
import more from "../../assets/more.png";

import "./navBar.css";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const location = useLocation();

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
    // window.location.href = "/auth";
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
          {user?.result && (
            <div role="navigation " className="d-none d-sm-none d-md-block">
              <ul className="nav justify-content-end nav-listItems me-2">
                <li className="nav-item ">
                  <a className="nav-link " aria-current="page" href="#">
                    Ram
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    My Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Settings
                  </a>
                </li>
                <li className="nav-item">
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
          {user?.result && (
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
                <li>
                  <a className="dropdown-item dropdown-item-custom" href="#">
                    Ram
                  </a>
                </li>
                <li>
                  <a className="dropdown-item dropdown-item-custom" href="#">
                    My Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item dropdown-item-custom" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/auth">
                    <button
                      className="btn dropdown-item-custom"
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
