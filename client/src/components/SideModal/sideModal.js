import React from "react";

import "./sideModal.css";
import LikeCommentSave from "../Shared/LikeCommentSave/likeCommentSave";
import PostCommentSection from "../Home/MiddleSection/Posts/PostLowerSection/PostCommentSection/postCommentSection";

const SideModal = ({ post, handleProfile, handleCopy, isPostSaved }) => {
  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-custom-side">
          <div className="modal-content">
            <div className="modal-header modal-header-custom">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body modal-body-custom">
              <LikeCommentSave
                post={post}
                isPostSaved={isPostSaved}
                handleProfile={handleProfile}
                handleCopy={handleCopy}
                isModal={true}
              />
              <PostCommentSection
                post={post}
                isModal={true}
                commentActive={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideModal;
