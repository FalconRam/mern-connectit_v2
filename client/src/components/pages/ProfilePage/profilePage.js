import React, { useEffect } from "react";
import Cookies from "js-cookie";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./profilePage.css";

import LeftSideProfilePage from "./LeftSideProfilePage/leftSideProfilePage";
import RightSideProfilePage from "./RightSideProfilePage/rightSideProfilePage";
import { getPostByUser } from "../../../actions/posts";
import { getProfileDetails } from "../../../actions/profile";
import ShareModal from "../../Home/MiddleSection/SharePost/ShareModal/shareModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const query = useQuery();
  const profileId = query.get("profileId");
  const history = useHistory();

  if (!user) {
    if (window.location.pathname !== "/auth") history.push("/auth");
  }

  const dispatch = useDispatch();

  const { userPosts, isPostLoading } = useSelector((state) => state.posts);
  const { profileDetails, isProfileLoading } = useSelector(
    (state) => state.profile
  );
  let tokenFromCookie = Cookies.get("userToken");

  useEffect(() => {
    if (user) {
      dispatch(getPostByUser(profileId));
      dispatch(getProfileDetails(profileId, false, tokenFromCookie));
    }
  }, []);

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
              profileDetails={profileDetails}
              isPostLoading={isPostLoading}
              isProfileLoading={isProfileLoading}
            />
          </div>
        </div>
        <ShareModal />
      </div>
    </>
  );
};

export default ProfilePage;
