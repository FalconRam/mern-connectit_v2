import React from "react";

import ShareModal from "../ShareModal/shareModal";

import "./shareCard.css";

const ShareCard = ({ userProfileDetails, isProfileLoading }) => {
  return (
    <>
      <div className="mb-3">
        <div className="card">
          <div className="card-body">
            {/* shareCardUpperPart */}
            <div className="d-flex align-items-center gap-3 mb-2">
              <img
                src={
                  userProfileDetails?.profilePicture ||
                  userProfileDetails?.name.charAt(0).toUpperCase() ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                className="img-thumbnail rounded-circle profilePic-share d-flex align-items-center justify-content-center"
                alt={userProfileDetails?.name.charAt(0).toUpperCase()}
              ></img>
              <div className="mb-2 w-100">
                <button
                  type="button"
                  className="form-control rounded-pill shareCard-input text-muted text-start"
                  data-bs-toggle="modal"
                  data-bs-target="#createModal"
                >
                  Share a Post
                </button>
              </div>

              {/* Modal */}
              <ShareModal />
            </div>
            {/* shareCardLowerPart */}
            <div className="d-flex align-items-center justify-content-between ms-2 me-2 shareIcon-text">
              <span className="d-flex align-items-center gap-2">
                <i className="bi bi-image text-primary"></i>
                <p className="mb-0 text-muted">Photo</p>
              </span>
              <span className="d-flex align-items-center gap-2">
                <i className="bi bi-play-btn-fill text-success"></i>
                <p className="mb-0 text-muted">Video</p>
              </span>
              <span className="d-flex align-items-center gap-2">
                <i className="bi bi-calendar-event text-warning"></i>
                <p className="mb-0 text-muted">Event</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareCard;
