import React from "react";

import moment from "moment";

import { useLocation, useHistory } from "react-router-dom";

const ProfileListItem = ({ profile }) => {
  const history = useHistory();

  const handleProfile = (id) => {
    history.push(`/profile/details?profileId=${id}`);
  };
  return (
    <>
      <div
        className="d-flex flex-row align-items-center gap-2 likeBtn"
        data-bs-dismiss="modal"
        onClick={() => handleProfile(profile?._id)}
      >
        <img
          src={
            profile?.profilePicture === ""
              ? profile?.name?.charAt(0).toUpperCase()
              : (profile?.profilePicture && profile?.profilePicture) ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          className="img-thumbnail rounded-circle postProfilePic d-flex align-items-center justify-content-center"
          alt={profile?.name?.charAt(0).toUpperCase()}
        ></img>
        <div>
          <h6 className="mb-0 postCreator">{profile?.name}</h6>
          <p className="text-muted m-0 postCreated">
            {moment(profile?.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileListItem;
