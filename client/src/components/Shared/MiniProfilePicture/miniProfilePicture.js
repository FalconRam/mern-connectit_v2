import React from "react";
import { useHistory } from "react-router-dom";

const MiniProfilePictureWrapper = ({ children, handleProfile }) => {
  return (
    <div
      className="d-flex flex-row align-items-center gap-2 likeBtn"
      onClick={handleProfile}
    >
      {children}
    </div>
  );
};

const MiniProfilePicture = ({
  post,
  isComment, // TODO: Check is the condition working as expected
  isSideNav = false, // TODO: Check is the condition working as expected
  comment,
  reply,
  isNotification = false,
  actionURL, // For Notification
  setShowNotificationBox, // For Notification
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const profileId = comment ? comment?.commenterId : reply?.replierId;
  const history = useHistory();

  const handleProfile = () => {
    if (isNotification) {
      setShowNotificationBox(false);
      history.push(decodeURIComponent(actionURL));
      return;
    }

    const routeProfileId = isComment
      ? profileId
      : isSideNav
      ? user._id
      : post.creator;
    history.push(`/profile/details?profileId=${routeProfileId}`);
  };

  const getImageSrc = () => {
    if (isComment) {
      return (
        comment?.profilePicture ||
        reply?.profilePicture ||
        comment?.commenterName?.charAt(0).toUpperCase() ||
        reply?.replierName?.charAt(0).toUpperCase() ||
        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
      );
    } else if (isSideNav) {
      return (
        user?.profilePicture ||
        user?.name.charAt(0).toUpperCase() ||
        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
      );
    } else {
      return (
        post?.profilePicture ||
        post?.name?.charAt(0).toUpperCase() ||
        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
      );
    }
  };

  const getAltText = () => {
    if (isComment) {
      return (
        comment?.commenterName?.charAt(0).toUpperCase() ||
        reply?.replierName?.charAt(0).toUpperCase()
      );
    } else if (isSideNav) {
      return user?.name.charAt(0).toUpperCase();
    } else {
      return post?.name?.charAt(0).toUpperCase();
    }
  };

  return (
    <MiniProfilePictureWrapper handleProfile={handleProfile}>
      <img
        src={getImageSrc()}
        className="img-thumbnail rounded-circle miniPostProfilePic d-flex align-items-center justify-content-center"
        alt={getAltText()}
      />
      {/* Post Card Lower section - Name */}
      {!isSideNav && !isNotification && (
        <h6 className="mb-0 postCreator">{post?.name}</h6>
      )}
      {isSideNav && (
        <h6 className="d-lg-inline-block d-none d-sm-none d-md-none m-0">
          {user?.name}
        </h6>
      )}
    </MiniProfilePictureWrapper>
  );
};

export default MiniProfilePicture;
