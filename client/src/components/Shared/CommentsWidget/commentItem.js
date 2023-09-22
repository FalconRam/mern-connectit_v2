import React, { useEffect } from "react";
import MiniProfilePicture from "../MiniProfilePicture/miniProfilePicture";

import { useDispatch, useSelector } from "react-redux";
import { getRepliesWithProfilePicture } from "../../../actions/posts";

const CommentItem = ({ post, isModal, comment }) => {
  const dispatch = useDispatch();
  const { commentReplies } = useSelector((state) => state.posts);

  const handleGetReplies = async () => {
    if (comment.replyComments.length) {
      let replies = await dispatch(
        getRepliesWithProfilePicture(comment._id, post._id)
      );
      console.log(replies.data);
    }
  };
  return (
    <>
      <div
        // {...(isModal && { "data-bs-dismiss": "modal", "aria-label": "Close" })}
      >
        <div className="d-flex justify-content-between">
          <div
            className="d-flex align-items-center ms-1 gap-2 mb-2"
            onClick={handleGetReplies}
          >
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
