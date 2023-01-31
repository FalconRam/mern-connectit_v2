import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import moment from "moment";
import FileBase from "react-file-base64";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./profileEdit.css";
import {
  getProfileDetails,
  updateProfileDetails,
  updateProfilePassword,
  updateProfilePictures,
} from "../../../../actions/profile";
import { findChangePasswordFormErrors } from "../../../../errorHandling/changePassWordEH";

const ProfileEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user) {
    history.push("/auth");
  }

  let isUser = user.id === id;

  let tokenFromCookie = Cookies.get("userToken");

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getProfileDetails(id, tokenFromCookie));
    }
  }, []);

  const { profileDetails } = useSelector((state) => state.profile);

  useEffect(() => {
    //   Current Data, if state updated
    setUserData({
      firstName: profileDetails?.userDetails?.name.split(" ")[0],
      lastName: profileDetails?.userDetails?.name.split(" ")[1],
      bio: profileDetails?.userDetails?.bio,
      city: profileDetails?.userDetails?.city,
      country: profileDetails?.userDetails?.country,
    });

    //   set the Previous User Data, if state updated
    setPrevUserData({
      firstName: profileDetails?.userDetails?.name.split(" ")[0],
      lastName: profileDetails?.userDetails?.name.split(" ")[1],
      bio: profileDetails?.userDetails?.bio,
      city: profileDetails?.userDetails?.city,
      country: profileDetails?.userDetails?.country,
    });

    //   Current Data, if state updated
    setPictures({
      bgWallPicture: profileDetails?.userDetails?.profileBgWallPicture,
      profilePicture: profileDetails?.userDetails?.profilePicture,
    });

    // set the Previous User Data, if state updated
    setPrevPictures({
      bgWallPicture: profileDetails?.userDetails?.profileBgWallPicture,
      profilePicture: profileDetails?.userDetails?.profilePicture,
    });
  }, [profileDetails?.userDetails]);

  //  Set Current Data
  const [userData, setUserData] = useState({
    firstName: profileDetails?.userDetails?.name?.split(" ")[0],
    lastName: profileDetails?.userDetails?.name?.split(" ")[1],
    bio: profileDetails?.userDetails?.bio,
    city: profileDetails?.userDetails?.city,
    country: profileDetails?.userDetails?.country,
  });

  // set the Previous User Data
  const [prevUserData, setPrevUserData] = useState({
    firstName: profileDetails?.userDetails?.name?.split(" ")[0],
    lastName: profileDetails?.userDetails?.name?.split(" ")[1],
    bio: profileDetails?.userDetails?.bio,
    city: profileDetails?.userDetails?.city,
    country: profileDetails?.userDetails?.country,
  });

  const setField = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  // State for Update & Cancel Button to enable/disable
  const [edit, setIsEdit] = useState(false);
  const [editForPassword, setIsEditForPassword] = useState(false);
  const [editForPicture, setIsEditForPicture] = useState(false);

  // State for all User Data to handle enable/disable edit option
  const [profilePictueEdit, setProfilePictueEdit] = useState(false);
  const [profileBgWallEdit, setProfileBgWallEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [bioEdit, setBioEdit] = useState(false);
  const [locationEdit, setLocationEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  const handleNameEdit = () => {
    setUserData(userData);
    setNameEdit(!nameEdit);
    !edit && setIsEdit(!edit);
  };
  const handleBioEdit = () => {
    setUserData(userData);
    setBioEdit(!bioEdit);
    !edit && setIsEdit(!edit);
  };
  const handleLocationEdit = () => {
    setUserData(userData);
    setLocationEdit(!locationEdit);
    !edit && setIsEdit(!edit);
  };

  // Update Dispatch fn with New User Data
  const handleProfileUpdate = () => {
    nameEdit && setNameEdit(!nameEdit);
    bioEdit && setBioEdit(!bioEdit);
    locationEdit && setLocationEdit(!locationEdit);
    edit && setIsEdit(!edit);
    setUserData(userData);
    dispatch(updateProfileDetails(id, userData));
  };

  // Cancel the Update process and set the Previous User Data
  const handleProfileCancel = () => {
    nameEdit && setNameEdit(!nameEdit);
    bioEdit && setBioEdit(!bioEdit);
    locationEdit && setLocationEdit(!locationEdit);
    setUserData(prevUserData);
    edit && setIsEdit(!edit);
  };

  // Form Error
  const [errors, setErrors] = useState({});
  const [showFormError, setShowFormError] = useState(false);

  // Password state
  const [newpassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const setPasswordField = (field, value) => {
    setNewPassword({
      ...newpassword,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const clearPasswordForm = () => {
    newpassword.oldPassword = "";
    newpassword.newPassword = "";
    newpassword.confirmNewPassword = "";
  };

  const handlePasswordEdit = () => {
    setPasswordEdit(!passwordEdit);
    !editForPassword && setIsEditForPassword(!editForPassword);
  };

  const handleProfilePassWordUpdate = (e) => {
    e.preventDefault();
    const newErrors = findChangePasswordFormErrors(newpassword);
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
      setShowFormError(true);
    } else {
      setNewPassword(newpassword);
      passwordEdit && setPasswordEdit(!passwordEdit);
      editForPassword && setIsEditForPassword(!editForPassword);
      dispatch(updateProfilePassword(id, newpassword));
      clearPasswordForm();
    }
  };

  const handleProfilePassWordCancel = () => {
    passwordEdit && setPasswordEdit(!passwordEdit);
    editForPassword && setIsEditForPassword(!editForPassword);
    setErrors(null);
    setShowFormError(!showFormError);
    clearPasswordForm();
  };

  // set the Previous User Data
  const [prevPictures, setPrevPictures] = useState({
    bgWallPicture: profileDetails?.userDetails?.profileBgWallPicture,
    profilePicture: profileDetails?.userDetails?.profilePicture,
  });

  //  Set Current Pictures
  const [pictures, setPictures] = useState({
    bgWallPicture: profileDetails?.userDetails?.profileBgWallPicture,
    profilePicture: profileDetails?.userDetails?.profilePicture,
  });

  const handleBgWallPicture = () => {
    setProfileBgWallEdit(!profileBgWallEdit);
    !editForPicture && setIsEditForPicture(!editForPicture);
  };

  const handleProfilePicture = () => {
    setProfilePictueEdit(!profilePictueEdit);
    !editForPicture && setIsEditForPicture(!editForPicture);
  };

  const handleProfileImage = () => {
    profileBgWallEdit && setProfileBgWallEdit(!profileBgWallEdit);
    profilePictueEdit && setProfilePictueEdit(!profilePictueEdit);
    setPictures(pictures);
    dispatch(updateProfilePictures(id, pictures));
    editForPicture && setIsEditForPicture(!editForPicture);
  };

  const handleProfileImageCancel = () => {
    setPictures(prevPictures);
    profileBgWallEdit && setProfileBgWallEdit(!profileBgWallEdit);
    profilePictueEdit && setProfilePictueEdit(!profilePictueEdit);
    editForPicture && setIsEditForPicture(!editForPicture);
  };

  return (
    <>
      <div className="container customMargin user-details-card shadow-lg p-3 mb-2 bg-body-tertiary rounded">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-10 col-md-9 col-lg-8 ">
            <div className="d-flex flex-column justify-content-center align-items-center gap-3">
              {/* Profile Image */}
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                {/* Profile Bg Wall Picture */}
                <div className="imageHover">
                  <img
                    src={
                      profileDetails?.userDetails?.profileBgWallPicture !== ""
                        ? pictures?.bgWallPicture ||
                          profileDetails?.userDetails?.profileBgWallPicture
                        : "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    alt={profileDetails?.userDetails?.name
                      .charAt(0)
                      .toUpperCase()}
                    className="img-thumbnail profileBgWallPicture d-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalCenter_profileBgWallPicture"
                  />
                  {isUser && profileBgWallEdit && (
                    <div className="fileBase bgWallName">
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                          setPictures({ ...pictures, bgWallPicture: base64 })
                        }
                      />
                    </div>
                  )}

                  {/*  */}
                  {isUser && !profileBgWallEdit && (
                    <span
                      className="text-primary edit"
                      onClick={handleBgWallPicture}
                    >
                      Change Wall Picture ?
                    </span>
                  )}
                </div>

                {/* Profile Picture */}
                <div className="imageHover">
                  <img
                    src={
                      profileDetails?.userDetails?.profilePicture !== ""
                        ? pictures?.profilePicture ||
                          profileDetails?.userDetails?.profilePicture
                        : profileDetails?.userDetails?.name
                            .charAt(0)
                            .toUpperCase() ||
                          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    alt={profileDetails?.userDetails?.name
                      .charAt(0)
                      .toUpperCase()}
                    className="img-thumbnail profilePicture-2 d-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalCenterProfilePicture"
                  />
                  {isUser && profilePictueEdit && (
                    <div className="fileBase">
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64, file }) =>
                          setPictures({
                            ...pictures,
                            profilePicture: base64,
                          })
                        }
                      />
                    </div>
                  )}

                  {/*  */}
                  {isUser && !profilePictueEdit && (
                    <span
                      className="text-primary edit"
                      onClick={handleProfilePicture}
                    >
                      Change Profile Picture ?
                    </span>
                  )}
                </div>
              </div>

              {/* Image Update Button */}
              <div className="d-flex justify-content-start align-items-center mt-2 mb-2">
                {isUser && editForPicture && (
                  <>
                    <button
                      className="btn btn-outline-dark profEdit text-success"
                      type="button"
                      onClick={handleProfileImage}
                    >
                      <i className="bi bi-image-fill text-success"></i> Update
                      Pictures
                    </button>
                    <button
                      className="btn btn-outline-dark profEdit"
                      type="button"
                      onClick={handleProfileImageCancel}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
              {/* User Details */}
              <div className="d-flex flex-column justify-content-center">
                {/* User Name */}
                <div className="d-flex justify-content-start align-items-center">
                  {!nameEdit && (
                    <h5 className="profName mb-0 text-primary">
                      {userData?.firstName !== undefined &&
                        `${userData?.firstName} ${userData?.lastName}`}
                    </h5>
                  )}
                  {isUser && nameEdit && (
                    <>
                      <input
                        type="text"
                        className="form-control-custom form-control-sm-custom me-1"
                        id="colFormLabelSm"
                        placeholder="First Name"
                        value={userData.firstName}
                        onChange={(e) => setField("firstName", e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control-custom form-control-sm-custom"
                        id="colFormLabelSm"
                        placeholder="Last Name"
                        value={userData.lastName}
                        onChange={(e) => setField("lastName", e.target.value)}
                      />
                    </>
                  )}
                  {isUser && (
                    <div>
                      {!nameEdit ? (
                        <span className="edit ms-2" onClick={handleNameEdit}>
                          <i className="bi bi-pencil" />
                        </span>
                      ) : (
                        <span className="edit ms-2" onClick={handleNameEdit}>
                          <i className="bi bi-check-lg text-success"></i>
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {/* Email */}
                <p className="profBio text-muted mt-2">
                  {profileDetails?.userDetails?.email}
                </p>
                {/* Followers & Followings Count*/}
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <span className="d-flex justify-content-center align-items-center gap-2 mt-2">
                    <p className="profFollowCount">
                      {profileDetails?.userDetails?.following?.length}
                      <i className="bi bi-dot text-success"></i>
                      {profileDetails?.userDetails?.following?.length === 1 &&
                      profileDetails?.userDetails?.following?.length === 0
                        ? "Following"
                        : "Followings"}
                    </p>

                    <p className="profFollowCount">
                      {profileDetails?.userDetails?.followers?.length}
                      <i className="bi bi-dot text-success"></i>
                      {profileDetails?.userDetails?.followers?.length === 1 &&
                      profileDetails?.userDetails?.followers?.length === 0
                        ? "Follower"
                        : "Followers"}
                    </p>
                  </span>
                </div>
                {/* User Bio */}
                <div className="d-flex justify-content-start align-items-start mt-2 gap-2">
                  {!bioEdit && (
                    <p className="profBio">
                      {userData.bio !== undefined && userData.bio}
                    </p>
                  )}
                  {isUser && bioEdit && (
                    <>
                      <textarea
                        type="text"
                        className="form-control-custom form-control-sm-custom text-area me-1"
                        id="colFormLabelSm"
                        placeholder="Bio"
                        value={userData.bio}
                        onChange={(e) => setField("bio", e.target.value)}
                      />
                    </>
                  )}
                  {isUser && (
                    <div>
                      {!bioEdit ? (
                        <span className="edit ms-2" onClick={handleBioEdit}>
                          <i className="bi bi-pencil" />
                        </span>
                      ) : (
                        <span className="edit ms-2" onClick={handleBioEdit}>
                          <i className="bi bi-check-lg text-success"></i>
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {/* User Location */}
                <div className="d-flex align-items-center mt-2">
                  {!locationEdit && (
                    <p className="profLocation">
                      <i className="bi bi-geo-fill text-danger"></i>{" "}
                      {userData.city !== undefined && `${userData.city}, `}
                      {userData.country !== undefined && userData.country}{" "}
                    </p>
                  )}
                  {isUser && locationEdit && (
                    <>
                      <input
                        type="text"
                        className="form-control-custom form-control-sm-custom me-1"
                        id="colFormLabelSm"
                        placeholder="City"
                        value={userData.city}
                        onChange={(e) => setField("city", e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control-custom form-control-sm-custom"
                        id="colFormLabelSm"
                        placeholder="Country"
                        value={userData.country}
                        onChange={(e) => setField("country", e.target.value)}
                      />
                    </>
                  )}
                  {isUser && (
                    <div>
                      {!locationEdit ? (
                        <span
                          className="edit ms-2"
                          onClick={handleLocationEdit}
                        >
                          <i className="bi bi-pencil" />
                        </span>
                      ) : (
                        <span
                          className="edit ms-2 me-2"
                          onClick={handleLocationEdit}
                        >
                          <i className="bi bi-check-lg text-success"></i>
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <p className="profCreated fw-semibold me-2 mt-2 text-muted">
                  <i className="bi bi-dot text-success" />
                  Since{" "}
                  {moment(profileDetails?.userDetails?.createdAt).fromNow(true)}
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              {edit && (
                <>
                  <button
                    className="btn btn-outline-dark profEdit text-success"
                    type="button"
                    onClick={handleProfileUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-dark profEdit"
                    type="button"
                    onClick={handleProfileCancel}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
            {/* Password */}
            <div>
              {isUser && !passwordEdit && (
                <span
                  className="text-primary edit"
                  onClick={handlePasswordEdit}
                >
                  Change Password ?
                </span>
              )}
              {isUser && passwordEdit && (
                <>
                  <input
                    type="text"
                    className="form-control-custom form-control-sm-custom mt-2"
                    id="colFormLabelSm"
                    placeholder="Old Password"
                    onChange={(e) =>
                      setPasswordField("oldPassword", e.target.value)
                    }
                  />
                  {showFormError && (
                    <p className="formError">{errors?.oldPassword}</p>
                  )}
                  <div>
                    <input
                      type="text"
                      className="form-control-custom form-control-sm-custom mt-1"
                      id="colFormLabelSm"
                      placeholder="New Password"
                      onChange={(e) =>
                        setPasswordField("newPassword", e.target.value)
                      }
                    />
                    {showFormError && (
                      <p className="formError">{errors?.newPassword}</p>
                    )}
                    <input
                      type="text"
                      className="form-control-custom form-control-sm-custom mt-1"
                      id="colFormLabelSm"
                      placeholder="Confirm Password"
                      onChange={(e) =>
                        setPasswordField("confirmNewPassword", e.target.value)
                      }
                    />
                    {showFormError && (
                      <p className="formError">{errors?.confirmNewPassword}</p>
                    )}
                  </div>
                </>
              )}

              {/* Password Update/Cancel Button */}
              <div className="d-flex justify-content-center align-items-center mt-2 mb-4">
                {isUser && editForPassword && (
                  <>
                    <button
                      className="btn btn-outline-dark profEdit text-success"
                      type="button"
                      onClick={handleProfilePassWordUpdate}
                    >
                      Update Password
                    </button>
                    <button
                      className="btn btn-outline-dark profEdit"
                      type="button"
                      onClick={handleProfilePassWordCancel}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
