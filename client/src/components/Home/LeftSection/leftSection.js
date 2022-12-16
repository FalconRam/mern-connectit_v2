import React from "react";

import { useHistory } from "react-router-dom";

import "./leftSection.css";

const LeftSection = () => {
  const history = useHistory();

  const handleFollowFollows = () => {
    history.push("/");
  };

  const handleProfile = () => {
    history.push("/");
  };

  const handleSettings = () => {
    history.push("/");
  };

  const handleSavedItems = () => {
    history.push("/");
  };

  return (
    <>
      <div className="col-sm-12 col-md-3">
        <div className="col-12 col-md-12">
          <div className="card">
            <img
              src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              className="card-img-top profileBgPic"
              alt="Bg Picture"
            ></img>
            <img
              src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              className="img-thumbnail rounded-circle profilePic"
              alt="Profile Picture"
            ></img>
            <div className="card-body pt-2 profileUser" onClick={handleProfile}>
              <h6 className="card-title text-center text-primary">
                Ram Vignesh M
              </h6>
              <p className="card-text text-center text-muted headline">
                Javascript | Typescript | React | NodeJs | Bootstrap | Azure -
                Software Engineer at Capgemini
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item liLeft">
                <div
                  className="text-center d-flex flex-row justify-content-center text-muted followFollows"
                  onClick={handleFollowFollows}
                >
                  <span className="card-link followCount">
                    <p className="mb-0 followCount">5</p>
                    Following
                  </span>
                  <span className="card-link followCount">
                    <p className="mb-0 followCount">5</p>
                    Followers
                  </span>
                </div>
              </li>
              <li className="list-group-item text-muted">
                <div className="text-center">
                  <span
                    className="card-link profileCardLinks"
                    onClick={handleProfile}
                  >
                    My Profile
                  </span>
                  <span
                    className="card-link profileCardLinks"
                    onClick={handleSettings}
                  >
                    Settings
                  </span>
                </div>
              </li>

              <li className="list-group-item text-center text-muted savedItems liLeft">
                <div onClick={handleSavedItems}>
                  <i class="bi bi-bookmark-fill"></i> My items
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSection;
