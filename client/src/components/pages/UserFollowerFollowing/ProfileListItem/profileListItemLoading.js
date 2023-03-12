import React from "react";

const ProfileListItemLoading = () => {
  return (
    <>
      <div className="d-flex flex-row align-items-center gap-2 likeBtn mb-3">
        <img
          src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          className="img-thumbnail rounded-circle postProfilePic d-flex align-items-center justify-content-center"
          alt="Loading"
        />
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
        </div>
      </div>
    </>
  );
};

export default ProfileListItemLoading;
