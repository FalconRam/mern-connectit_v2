import React from "react";

import PostDetails from "../PostDetails/postDetails";

import "./postDetailsModal.css";

const PostDetailsModal = ({ post }) => {
  return (
    <>
      <div
        class="modal fade"
        id={`exampleModalCenter${post._id}`}
        tabindex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div class="modal-dialog modal-xl modal-dialog-md-custom">
          <div class="modal-content">
            <div className="d-flex justify-content-end mt-2 me-2">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <PostDetails post={post} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailsModal;
