import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import "./leftSection.css";

const LeftSection = ({
  userProfileDetails,
  isProfileLoading,
  id,
  profileId,
  post,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const handleFollowFollows = (id) => {
    history.push(`/profile/following-followers/details?profileId=${id}`);
  };

  const handleProfile = () => {
    history.push(
      `/profile/details?profileId=${
        userProfileDetails?.id || userProfileDetails?.userDetails?._id
      }`
    );
  };

  const handleSettings = () => {
    history.push("/profile/settings");
  };

  const handleSavedItems = () => {
    history.push(
      `/profile/details?profileId=${
        userProfileDetails?.id || userProfileDetails?.userDetails?._id
      }&type=my-items`
    );
  };

  // Only changes the state, if post is available, by default true to support on home page
  const [isLoggedInUser, setisLoggedInUser] = useState(true);

  useEffect(() => {
    // Only changes the state, if post is available
    if (post) setisLoggedInUser(post?.creator === user._id);
  }, [post, user]);

  return (
    <>
      {isProfileLoading ? (
        <div className="card sticky-md-top sticky-lg-top" aria-hidden="true">
          <img
            src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            className="card-img-top profileBgWall placeholder"
            alt="Loading"
          />
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        </div>
      ) : (
        <div className="card sticky-md-top sticky-lg-top">
          <img
            src={
              userProfileDetails?.profileBgWallPicture ||
              userProfileDetails?.userDetails?.profileBgWallPicture ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="card-img-top profileBgWall"
            alt="Bg Picture"
          ></img>

          <img
            src={
              userProfileDetails?.profilePicture ||
              userProfileDetails?.userDetails?.profilePicture ||
              userProfileDetails?.name?.charAt(0).toUpperCase() ||
              userProfileDetails?.userDetails?.name.charAt(0).toUpperCase() ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="img-thumbnail rounded-circle profilePic d-flex align-items-center justify-content-center"
            alt={
              userProfileDetails?.name?.charAt(0).toUpperCase() ||
              userProfileDetails?.userDetails?.name.charAt(0).toUpperCase()
            }
          ></img>
          <div
            className="card-body pt-2 profileUser"
            onClick={() =>
              handleProfile(
                userProfileDetails?.id || userProfileDetails?.userDetails?._id
              )
            }
          >
            <h6 className="card-title text-center text-primary">
              {userProfileDetails?.name ||
                userProfileDetails?.userDetails?.name}
            </h6>
            <p className="card-text text-center text-muted headline">
              {userProfileDetails?.bio || userProfileDetails?.userDetails?.bio}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item liLeft">
              <div
                className="text-center d-flex flex-row justify-content-center text-muted followFollows"
                onClick={() =>
                  handleFollowFollows(
                    userProfileDetails?.id ||
                      userProfileDetails?.userDetails?._id
                  )
                }
              >
                <span className="card-link followCount">
                  <p className="mb-0 followCount">
                    {userProfileDetails?.following?.length ||
                      userProfileDetails?.userDetails?.following?.length}
                  </p>
                  Following
                </span>
                <span className="card-link followCount">
                  <p className="mb-0 followCount">
                    {userProfileDetails?.followers?.length ||
                      userProfileDetails?.userDetails?.followers?.length}
                  </p>
                  Followers
                </span>
              </div>
            </li>
            {isLoggedInUser && (
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
            )}
            {isLoggedInUser && (
              <li className="list-group-item text-center text-muted savedItems liLeft">
                <div onClick={handleSavedItems}>
                  <i className="bi bi-bookmark-fill"></i> My items
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default LeftSection;
