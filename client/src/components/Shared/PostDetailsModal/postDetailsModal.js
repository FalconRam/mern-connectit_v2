import React from "react";

import PostDetails from "../PostDetails/postDetails";

import "./postDetailsModal.css";

const PostDetailsModal = ({ post }) => {
  return (
    <>
      <div
        className="modal fade"
        id={`exampleModalCenter${post._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-bs-backdrop="static"
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
            <div className="modal-body">
              <PostDetails post={post} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailsModal;
