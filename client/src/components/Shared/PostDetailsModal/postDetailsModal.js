import React from "react";

import PostDetails from "../PostDetails/postDetails";

import "./postDetailsModal.css";

const PostDetailsModal = ({ post, profileDetails }) => {
  return (
    <>
      <div
        className="modal fade"
        id={`exampleModalCenter${post._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
      >
        <div className="modal-dialog modal-xl modal-dialog-md-custom">
          <div className="modal-content">
            <div className="d-flex justify-content-end mt-2 me-2">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body postDetails-modal-body-custom">
              <PostDetails post={post} profileDetails={profileDetails} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailsModal;
