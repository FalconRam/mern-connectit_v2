import React, { useEffect } from "react";
import Cookies from "js-cookie";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./profileEdit.css";
import { getProfileDetails } from "../../../actions/profile";
import Loader from "../../../components/Shared/utils/loader";
import ProfileEditComponent from "../../../components/Profile/ProfileEditComponent";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProfileEdit = () => {
  const history = useHistory();

  const query = useQuery();
  const profileId = query.get("profileId");
  if (!profileId) {
    history.push("/");
  }

  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user) {
    if (window.location.pathname !== "/auth") history.push("/auth");
  }

  let isUser = user.id === profileId;

  let tokenFromCookie = Cookies.get("userToken");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && profileId) {
      dispatch(getProfileDetails(profileId, true, tokenFromCookie));
    }
  }, []);

  const { userProfileDetails, isUserProfileLoading } = useSelector(
    (state) => state.profile
  );

  return (
    <>
      {isUserProfileLoading ? (
        <Loader />
      ) : (
        <ProfileEditComponent
          userProfileDetails={userProfileDetails}
          isUser={isUser}
          id={profileId}
        />
      )}
    </>
  );
};

export default ProfileEdit;
