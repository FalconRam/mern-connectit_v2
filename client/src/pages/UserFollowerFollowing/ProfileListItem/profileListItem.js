import React, { useState } from "react";

import moment from "moment";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./profileListItem.css";
import {
  sendFollowRequestAction,
  sendRemoveFollowerAction,
  sendUnFollowRequestAction,
} from "../../../actions/request";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProfileListItem = ({ profile, isFollowingNavTab }) => {
  const query = useQuery();
  const profileId = query.get("profileId");

  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  let isLoggedInUser = user?.id === profileId;

  const [isUnFollow, setIsUnFollow] = useState(true);
  const [isRemove, setIsRemove] = useState(true);
  // const [isOtherUser, setIsOtherUserFollow] = useState(true);

  const handleProfile = (id) => {
    history.push(`/profile/details?profileId=${id}`);
  };

  const handleFollowUnFollow = (id) => {
    if (isUnFollow) {
      dispatch(sendUnFollowRequestAction(id));
      setIsUnFollow(!isUnFollow);
    } else {
      dispatch(sendFollowRequestAction(id));
      setIsUnFollow(!isUnFollow);
    }
  };

  const handleRemoveFollower = (id) => {
    if (isRemove) {
      dispatch(sendRemoveFollowerAction(id, profileId));
      setIsRemove(!isRemove);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        {/* DP + Name + CreatedAt */}
        <div
          className="d-flex flex-row align-items-center gap-2 likeBtn"
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

        {/* Follow/UnFollow Button */}
        {isFollowingNavTab && isLoggedInUser && (
          <button
            type="button"
            className="btn btn-primary customFollowBtn"
            onClick={() => handleFollowUnFollow(profile?._id)}
          >
            {isUnFollow ? "Un Follow" : "Follow"}
          </button>
        )}

        {/* Remove/Add-again Button */}
        {!isFollowingNavTab && isLoggedInUser && (
          <button
            disabled={!isRemove}
            type="button"
            className="btn btn-primary customFollowBtn"
            onClick={() => handleRemoveFollower(profile?._id)}
          >
            {isRemove ? "Remove" : "Removed"}
          </button>
        )}
      </div>
    </>
  );
};

export default ProfileListItem;
