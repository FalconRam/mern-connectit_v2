import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import more from "../../assets/more.png";

const LandingNav = () => {
  const history = useHistory();

  const handleLoginPage = (e) => {
    e.stopPropagation();
    history.push("/auth");
  };
  const handleSignInPage = (e) => {
    e.stopPropagation();
    history.push("/auth?new=true");
  };
  return (
    <div>
      {/* For md & lg & above screens */}
      <div role="navigation" className="d-none d-sm-none d-md-block">
        <ul className="nav d-flex align-items-center  justify-content-end nav-listItems me-2">
          <li className="nav-item sideNavButton">
            <a className="nav-link" onClick={(e) => handleLoginPage(e)}>
              LogIn
            </a>
          </li>
          <li
            className="nav-item sideNavButton"
            onClick={(e) => handleSignInPage(e)}
          >
            <a className="nav-link"> Still no Account?</a>
          </li>
        </ul>
      </div>
      {/* For sm & below screens */}
      <div role="navigation" className="d-md-none dropdown me-4 ">
        <button
          className="btn"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={more} alt="more" title="More" className="more-icon" />
        </button>
        <ul className="dropdown-menu text-center">
          <li className="nav-item sideNavButton mb-1">
            <a
              className="dropdown-item dropdown-item-custom"
              onClick={(e) => handleLoginPage(e)}
            >
              LogIn
            </a>
          </li>
          <li className="nav-item sideNavButton">
            <a
              onClick={(e) => handleSignInPage(e)}
              className="dropdown-item dropdown-item-custom"
            >
              Still no Account?
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingNav;
