import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./sideCommentModal.css";
import LikeCommentSave from "../../Shared/LikeCommentSave/likeCommentSave";
import PostCommentSection from "../../Home/MiddleSection/Posts/PostLowerSection/PostCommentSection/postCommentSection";
import CommentFormButton from "../../Shared/CommentFormButton/commentFormButton";
import { setCommentReplydetails } from "../../../actions/posts";
// import { clearCmtReplyState } from "../../utils/clearCmtReplyState";

const SideCommentModal = ({
  post,
  handleShare,
  isPostSaved,
  comments,
  setComments,
}) => {
  const { commentReplyState } = useSelector((state) => state.posts);
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
  };
  return (
    <div>
      <div
        className="offcanvas offcanvas-end offcanvas-custom-style"
        tabIndex="-1"
        id={`offcanvasRight${post?._id}`}
        aria-labelledby="offcanvasRightLabel"
        data-bs-backdrop="static"
      >
        <div className="m-2 p-1 d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={clearCmtReplyState}
          />
        </div>
        {/* <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div> */}
        <div className="ms-2 ps-1 me-4">
          <LikeCommentSave
            post={post}
            isPostSaved={isPostSaved}
            handleShare={handleShare}
            isCommentsNotOpened={true}
          />
          <div className="float-end mb-1">
            <p className="mb-0 commenterCmt text-muted">
              {post?.commentsInfo?.postComment?.length} Comments
            </p>
          </div>
        </div>
        <div className="offcanvas-body">
          <PostCommentSection
            post={post}
            isModal={true}
            isSideModal={true}
            comments={comments}
            setComments={setComments}
          />
        </div>
        <div className="">
          <CommentFormButton
            post={post}
            setComments={setComments}
            commentReplyState={commentReplyState}
          />
        </div>
      </div>
      {/* <div
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
                onClick={clearCmtReplyState}
              />
            </div>
            <div className="ms-3 ps-1 me-4">
              <LikeCommentSave
                post={post}
                isPostSaved={isPostSaved}
                handleShare={handleShare}
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
              />
            </div>
            <div className="modal-footer">
              <CommentFormButton
                post={post}
                setComments={setComments}
                commentReplyState={commentReplyState}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SideCommentModal;
