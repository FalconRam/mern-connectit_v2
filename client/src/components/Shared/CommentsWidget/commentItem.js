import React from "react";
import MiniProfilePicture from "../MiniProfilePicture/miniProfilePicture";

const CommentItem = ({ post, isModal, comment }) => {
  return (
    <>
      <div
        {...(isModal && { "data-bs-dismiss": "modal", "aria-label": "Close" })}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center ms-1 gap-2 mb-2">
            <div className="likeIcon text-success ">
              <MiniProfilePicture isComment={true} comment={comment} />
            </div>
            <h5 className="mb-0 commenterName">{comment?.commenterName}</h5>
            <p className="mb-0 commenterCmt">{comment?.comment}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
