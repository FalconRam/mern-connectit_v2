import React from "react";

import PostDetails from "../../Shared/PostDetails/postDetails";

import "./postDetailsModal.css";
import { useDispatch } from "react-redux";
import { setCommentReplydetails } from "../../../actions/posts";

// import { clearCmtReplyState } from "../../../utils/clearCmtReplyState";

const PostDetailsModal = ({ post, profileDetails }) => {
  const dispatch = useDispatch();
  const clearCmtReplyState = async () => {
    await dispatch(
      setCommentReplydetails({
        postId: "",
        commentId: "",
        replyid: "",
        repliedToCommenterName: "", // Only for Showing Name in Input tag
      })
    );
    await dispatch(
      setCommentReplydetails({
        postId: "",
        commentId: "",
        replyId: "",
        repliedToReplierName: "", // Only for Showing Name in Input tag
      })
    );
    return null;
  };
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
                onClick={clearCmtReplyState}
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
