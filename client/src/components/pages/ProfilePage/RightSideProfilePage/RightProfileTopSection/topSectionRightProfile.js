import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";

import "./topSectionRightProfile.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TopSectionRightProfile = ({
  profileDetails,
  postCount,
  isProfileLoading,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const query = useQuery();
  const profileId = query.get("profileId");

  let isUser = user.id === profileId;

  const history = useHistory();

  // useEffect(() => {
  //   loadBgWall();
  // }, [profileDetails?.userDetails?.profileBgWallPicture]);

  // const loadBgWall = () => {
  //   let bgImageUrl = profileDetails?.userDetails?.profileBgWallPicture;
  //   let userDetailsCard = document.querySelector(".user-details-card");
  //   userDetailsCard.style.backgroundImage = `url(${bgImageUrl})`;
  //   userDetailsCard.style.backgroundSize = "cover";
  // };

  const handleProfileEdit = () => {
    history.push(`/profile/edit/${profileDetails?.userDetails?._id}`);
  };

  return (
    <>
      {isProfileLoading ? (
        <>
          <div
            aria-hidden="true"
            className="user-details-card shadow-lg p-3 mb-2 bg-body-tertiary rounded"
          >
            <div className="row mb-4 d-flex justify-content-center">
              <div className="col-sm-10 col-md-9 col-lg-8 ">
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <img
                    src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    alt=""
                    className="img-thumbnail rounded-circle profilePicture d-flex align-items-center justify-content-center"
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="user-details-card shadow-lg p-3 mb-2 bg-body-tertiary rounded">
          <div className="row mb-4 d-flex justify-content-center">
            <div className="col-sm-10 col-md-9 col-lg-8 ">
              <div className="d-flex justify-content-center align-items-center gap-3">
                {/* Profile Image */}
                <img
                  src={
                    profileDetails?.userDetails?.profilePicture !== ""
                      ? profileDetails?.userDetails?.profilePicture
                      : profileDetails?.userDetails?.name
                          .charAt(0)
                          .toUpperCase() ||
                        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                  }
                  alt={profileDetails?.userDetails?.name
                    .charAt(0)
                    .toUpperCase()}
                  className="img-thumbnail rounded-circle profilePicture d-flex align-items-center justify-content-center"
                />

                {/* User Details */}
                <div className="d-flex flex-column justify-content-center">
                  {/* User Name and Edit */}
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="profName mb-0 text-primary">
                      {profileDetails?.userDetails?.name}
                    </h5>
                    {isUser && (
                      <button
                        className="btn btn-outline-dark profEdit"
                        type="button"
                        onClick={handleProfileEdit}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                    )}
                  </div>

                  {/* Post, Followers & Followings Count*/}
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <p className="profPost">
                      {postCount}
                      <i className="bi bi-dot text-success"></i>
                      {postCount === 1 && postCount === 0 ? "Post" : "Posts"}
                    </p>

                    {/* Followers & Followings Count + Button */}
                    <button className="d-flex justify-content-center align-items-center gap-2 btn btn-none">
                      <p className="profFollowCount">
                        {profileDetails?.userDetails?.following?.length}
                        <i className="bi bi-dot text-success"></i>
                        {profileDetails?.userDetails?.following?.length === 1 &&
                        profileDetails?.userDetails?.following?.length === 0
                          ? "Following"
                          : "Followings"}
                      </p>

                      <p className="profFollowCount">
                        {profileDetails?.userDetails?.followers?.length}
                        <i className="bi bi-dot text-success"></i>
                        {profileDetails?.userDetails?.followers?.length === 1 &&
                        profileDetails?.userDetails?.followers?.length === 0
                          ? "Follower"
                          : "Followers"}
                      </p>
                    </button>
                  </div>
                  {/* User Bio */}
                  <p className="profBio">{profileDetails?.userDetails?.bio}</p>
                  {/* User Location */}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="profLocation">
                      <i className="bi bi-geo-fill text-danger"></i>{" "}
                      {profileDetails?.userDetails?.city},{" "}
                      {profileDetails?.userDetails?.country}
                    </p>
                    <p className="profCreated fw-semibold me-2 text-muted">
                      <i className="bi bi-dot text-success" />
                      Since{" "}
                      {moment(profileDetails?.userDetails?.createdAt).fromNow(
                        true
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopSectionRightProfile;
