import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./sideCommentModal.css";
import LikeCommentSave from "../Shared/LikeCommentSave/likeCommentSave";
import PostCommentSection from "../Home/MiddleSection/Posts/PostLowerSection/PostCommentSection/postCommentSection";
import CommentFormButton from "../Shared/CommentFormButton/commentFormButton";
import { getCurrentCommentReplyState } from "../../actions/posts";

const SideCommentModal = ({
  post,
  handleCopy,
  isPostSaved,
  comments,
  setComments,
}) => {
  const [selectedReplyToComment, setSelectedReplyToComment] = useState("");

  const { commentReplyState } = useSelector((state) => state.posts);

  return (
    <div>
      <div
        className="modal fade"
        id={`staticBackdropComment${post?._id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-custom-side">
          <div className="modal-content modal-content-custom">
            <div className="modal-header modal-header-custom">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="ms-3 ps-1 me-4">
              <LikeCommentSave
                post={post}
                isPostSaved={isPostSaved}
                handleCopy={handleCopy}
                isCommentsNotOpened={true}
              />
              <div className="d-flex justify-content-end mb-1">
                <p className="mb-0 me-1 commenterCmt text-muted">
                  {post?.commentsInfo?.postComment?.length} Comments
                </p>
              </div>
            </div>
            <div className="modal-body modal-body-custom">
              <PostCommentSection
                post={post}
                isModal={true}
                isSideModal={true}
                comments={comments}
                setComments={setComments}
                selectedReplyToComment={selectedReplyToComment}
              />
            </div>
            <div className="modal-footer">
              <CommentFormButton
                post={post}
                setComments={setComments}
                commentReplyState={commentReplyState}
                setSelectedReplyToComment={setSelectedReplyToComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCommentModal;
