import React, { useEffect } from "react";
import Cookies from "js-cookie";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./profilePage.css";

import LeftSideProfilePage from "./LeftSideProfilePage/leftSideProfilePage";
import RightSideProfilePage from "./RightSideProfilePage/rightSideProfilePage";
import { getPostByUser, getSavedPosts } from "../../actions/posts";
import { getProfileDetails } from "../../actions/profile";
import ShareModal from "../../components/Home/MiddleSection/SharePost/ShareModal/shareModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const history = useHistory();
  const query = useQuery();

  const profileId = query.get("profileId");
  if (!profileId) history.push("/");

  const isLoggedInUser = user?.id === profileId;

  const dispatch = useDispatch();

  const { userPosts, savedPosts, isPostLoading } = useSelector(
    (state) => state.posts
  );
  const {
    profileDetails,
    userProfileDetails,
    isProfileLoading,
    isUserProfileLoading,
  } = useSelector((state) => state.profile);

  let tokenFromCookie = Cookies.get("userToken");

  useEffect(() => {
    if (user && profileId) {
      dispatch(getPostByUser(profileId));
      dispatch(getProfileDetails(profileId, isLoggedInUser, tokenFromCookie));
      isLoggedInUser && dispatch(getSavedPosts());
    }
  }, [profileId]);

  return (
    <>
      <div className="container">
        {/* ProfilePage Left Section - Side NavBar */}
        <div className="row">
          <div className="col-sm-1 col-md-1 col-lg-2 d-none d-sm-block bg-white customSideNav">
            <LeftSideProfilePage />
          </div>

          {/* ProfilePage Right Section */}
          <div className="col-sm-11 col-md-10 col-lg-10  offset-md-1 offset-lg-2 customOffset customMargin">
            <RightSideProfilePage
              userPosts={userPosts}
              savedPosts={savedPosts}
              profileDetails={
                isLoggedInUser ? userProfileDetails : profileDetails
              }
              isPostLoading={isPostLoading}
              isProfileLoading={
                isLoggedInUser ? isUserProfileLoading : isProfileLoading
              }
              isLoggedInUser={isLoggedInUser}
            />
          </div>
        </div>
        <ShareModal />
      </div>
    </>
  );
};

export default ProfilePage;
