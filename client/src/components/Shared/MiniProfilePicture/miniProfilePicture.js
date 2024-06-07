import React from "react";

import { useHistory } from "react-router-dom";

const MiniProfilePicture = ({
  post,
  isComment,
  isSideNav = false,
  comment,
  reply,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  let profileId = comment ? comment?.commenterId : reply?.replierId;
  const history = useHistory();
  const handleProfile = () => {
    const routeProfileId = isComment
      ? profileId // If Comment
      : isSideNav
      ? user._id // If SideNav
      : post.creator; // For other Users
    // console.log(`/profile/details?profileId=${routeProfileId}`);
    history.push(`/profile/details?profileId=${routeProfileId}`);
  };
  return (
    <>
      <div
        className="d-flex flex-row align-items-center gap-2 likeBtn"
        onClick={handleProfile}
      >
        {isComment ? (
          // For Comment Modal
          <>
            <img
              src={
                comment?.profilePicture === "" || reply?.profilePicture === ""
                  ? comment?.commenterName?.charAt(0).toUpperCase() ||
                    reply.replierName.charAt(0).toUpperCase()
                  : comment?.profilePicture ||
                    reply?.profilePicture ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              className="rounded-circle miniPostProfilePic d-flex align-items-center justify-content-center"
              alt={
                comment?.commenterName?.charAt(0).toUpperCase() ||
                reply?.replierName?.charAt(0).toUpperCase()
              }
            ></img>
          </>
        ) : !isSideNav ? (
          // For Post Card - lower section
          <img
            src={
              post?.profilePicture === ""
                ? post?.name?.charAt(0).toUpperCase()
                : post?.profilePicture ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="img-thumbnail rounded-circle miniPostProfilePic d-flex align-items-center justify-content-center"
            alt={post?.name?.charAt(0).toUpperCase()}
          ></img>
        ) : (
          // For Side Nav
          <span className="d-flex align-items-center justify-content-center gap-2 sideNavButton">
            <img
              src={
                user?.profilePicture ||
                user?.name.charAt(0).toUpperCase() ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              className="img-thumbnail rounded-circle sideNavProfilePic d-flex align-items-center justify-content-center"
              alt={user?.name.charAt(0).toUpperCase()}
            />
            <h6 className="d-lg-inline-block d-none d-sm-none d-md-none m-0">
              {user?.name}
            </h6>
          </span>
        )}
        {!isSideNav && (
          <div>
            <h6 className="mb-0 postCreator">{post?.name}</h6>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniProfilePicture;
