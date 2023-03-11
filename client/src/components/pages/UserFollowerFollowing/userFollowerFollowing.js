import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  getFollowersProfileDetails,
  getFollowingProfileDetails,
} from "../../../actions/profile";


import ProfileListItem from "./profileListItem";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UserFollowerFollowing = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user) {
    if (window.location.pathname !== "/auth") history.push("/auth");
  }

  const query = useQuery();
  const profileId = query.get("profileId");

  const history = useHistory();

  const {
    followingProfile,
    followersProfile,
    isProfileFollowersLoading,
    isProfileFollowingLoading,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getFollowingProfileDetails(profileId));
    dispatch(getFollowersProfileDetails(profileId));
  }, []);


  return (
    <>
      <div className="container-md customMargin">
        {/* Follwers & Following list */}
        <div className="row">
          <div className="col-sm-12 col-md-8 mb-2">
            <ul className="list-group list-group-flush">
              {followingProfile &&
                followingProfile?.map((profile, i) => (
                  <li className="list-group-item" key={i}>
                    <ProfileListItem profile={profile} />
                  </li>
                ))}
            </ul>
          </div>

          {/* New Peoplo Suggesstion */}
          <div className="col-sm-12 col-md-4 mb-2">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">An item</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFollowerFollowing;
