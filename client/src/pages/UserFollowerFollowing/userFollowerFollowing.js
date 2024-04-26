import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  getFollowersProfileDetails,
  getFollowingProfileDetails,
} from "../../actions/profile";

import ProfileListItem from "../UserFollowerFollowing/ProfileListItem/profileListItem";
import ProfileListItemLoading from "./ProfileListItem/profileListItemLoading";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UserFollowerFollowing = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isFollowingNavTab, setIsFollowingNavTab] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));

  const query = useQuery();
  const profileId = query.get("profileId");
  if (!profileId) history.push("/");

  const {
    followingProfile,
    followersProfile,
    isProfileFollowersLoading,
    isProfileFollowingLoading,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (profileId) {
      dispatch(getFollowingProfileDetails(profileId));
      dispatch(getFollowersProfileDetails(profileId));
    }
  }, []);

  return (
    <>
      <div className="container-md customMargin">
        {/* Follwers & Following list */}
        <div className="row">
          <div className="col-sm-12 col-md-8 mb-2">
            <ul className="list-group list-group-flush">
              <div>
                {/* Content Navigator */}
                <ul
                  className="nav nav-tabs text-center"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active headline"
                      id="following-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#following-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="following-tab-pane"
                      aria-selected="true"
                      onClick={() =>
                        isFollowingNavTab ||
                        setIsFollowingNavTab(!isFollowingNavTab)
                      }
                    >
                      Following
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link postCreator"
                      id="followers-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#followers-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="followers-tab-pane"
                      aria-selected="false"
                      onClick={() =>
                        isFollowingNavTab &&
                        setIsFollowingNavTab(!isFollowingNavTab)
                      }
                    >
                      Followers
                    </button>
                  </li>
                </ul>

                {/* Following and Followers List */}
                <div className="tab-content" id="myTabContent">
                  {isProfileFollowingLoading || isProfileFollowersLoading ? (
                    <>
                      <ProfileListItemLoading />
                      <ProfileListItemLoading />
                      <ProfileListItemLoading />
                      <ProfileListItemLoading />
                      <ProfileListItemLoading />
                    </>
                  ) : (
                    <>
                      {/* User following */}
                      <div
                        className="tab-pane fade show active"
                        id="following-tab-pane"
                        role="tabpanel"
                        aria-labelledby="following-tab"
                        tabIndex="0"
                      >
                        <div className="container mt-3">
                          {followingProfile &&
                            followingProfile?.map((profile, i) => (
                              <li className="list-group-item mb-1" key={i}>
                                <ProfileListItem
                                  profile={profile}
                                  isFollowingNavTab={isFollowingNavTab}
                                />
                              </li>
                            ))}
                        </div>
                      </div>

                      {/* User followers */}
                      <div
                        className="tab-pane fade"
                        id="followers-tab-pane"
                        role="tabpanel"
                        aria-labelledby="followers-tab"
                        tabIndex="0"
                      >
                        <div className="container mt-3">
                          {followersProfile &&
                            followersProfile?.map((profile, i) => (
                              <li className="list-group-item mb-1" key={i}>
                                <ProfileListItem
                                  profile={profile}
                                  isFollowingNavTab={isFollowingNavTab}
                                />
                              </li>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
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
