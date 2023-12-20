import React, { useEffect } from "react";
import Cookies from "js-cookie";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./profileEdit.css";
import {
  getProfileDetails,
  updateProfileDetails,
  updateProfilePassword,
  updateProfilePictures,
} from "../../../actions/profile";
import { findChangePasswordFormErrors } from "../../../errorHandling/changePassWordEH";
import Loader from "../../../components/Shared/utils/loader";
import ProfileEditComponent from "../../../components/Profile/ProfileEditComponent";

const ProfileEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user) {
    if (window.location.pathname !== "/auth") history.push("/auth");
  }

  let isUser = user.id === id;

  let tokenFromCookie = Cookies.get("userToken");

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getProfileDetails(id, true, tokenFromCookie));
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
            id={id}
        />
      )}
    </>
  );
};

export default ProfileEdit;
