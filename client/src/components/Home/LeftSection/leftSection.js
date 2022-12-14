import React from "react";

import { useHistory } from "react-router-dom";

import "./leftSection.css";

const LeftSection = ({ profileDetails }) => {
  const history = useHistory();

  const handleFollowFollows = (id) => {
    history.push(`/following-followers/details?profileId=${id}`);
  };

  const handleProfile = (id) => {
    history.push(`/profile/details?profileId=${id}`);
  };

  const handleSettings = () => {
    history.push("/");
  };

  const handleSavedItems = () => {
    history.push("/");
  };

  return (
    <>
      <div className="card sticky-md-top sticky-lg-top">
        <img
          src={
            profileDetails?.userDetails?.profileBgWallPicture ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          className="card-img-top profileBgWall"
          alt="Bg Picture"
        ></img>

        <img
          src={
            profileDetails?.userDetails?.profilePicture ||
            profileDetails?.userDetails?.name.charAt(0).toUpperCase() ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          className="img-thumbnail rounded-circle profilePic d-flex align-items-center justify-content-center"
          alt={profileDetails?.userDetails?.name.charAt(0).toUpperCase()}
        ></img>
        <div
          className="card-body pt-2 profileUser"
          onClick={() => handleProfile(profileDetails?.userDetails?._id)}
        >
          <h6 className="card-title text-center text-primary">
            {profileDetails?.userDetails?.name}
          </h6>
          <p className="card-text text-center text-muted headline">
            {profileDetails?.userDetails?.bio}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item liLeft">
            <div
              className="text-center d-flex flex-row justify-content-center text-muted followFollows"
              onClick={() =>
                handleFollowFollows(profileDetails?.userDetails?._id)
              }
            >
              <span className="card-link followCount">
                <p className="mb-0 followCount">
                  {profileDetails?.userDetails?.following?.length}
                </p>
                Following
              </span>
              <span className="card-link followCount">
                <p className="mb-0 followCount">
                  {profileDetails?.userDetails?.followers?.length}
                </p>
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
              <i className="bi bi-bookmark-fill"></i> My items
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LeftSection;
