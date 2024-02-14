import React, { useEffect, useState } from "react";
import moment from "moment";
import MiniProfilePicture from "../MiniProfilePicture/miniProfilePicture";

import { useDispatch, useSelector } from "react-redux";
import {
  getRepliesWithProfilePicture,
  handleStateForCommentReply,
  likeCommentReply,
  setCommentReplydetails,
} from "../../../actions/posts";
import ReplyWidget from "./ReplyWidget/replyWidget";
import LoaderMini from "../utils/loaderMini";
import Likes from "../Likes/likes";
import DeleteIconButton from "../DeleteIconButton/deleteIconButton";

const CommentItem = ({ post, isModal, comment }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { commentReplies } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const [viewReplies, setviewReplies] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [replies, setReplies] = useState({});
  const [onCommentHover, setOnCommentHover] = useState(false);
  const [commentDeletePayload, setCommentcommentDeletePayload] = useState({
    commentId: "",
    postId: "",
  });

  const [canDeleteComment, setCanDeleteComment] = useState(false);
  useEffect(() => {
    if (comment.commenterId === user?.id || post.creator === user?.id)
      setCanDeleteComment(true);
  }, [comment]);

  const handleReplies = async () => {
    if (comment.replyComments.length && !viewReplies) {
      setIsApiLoading(true);
      let repliesResult = await dispatch(
        getRepliesWithProfilePicture(comment._id, post._id)
      );
      setReplies(repliesResult);
      setIsApiLoading(false);
      setviewReplies(true);
    } else if (viewReplies) {
      setviewReplies(false);
    }
  };

  const [isLiked, setIsLiked] = useState(
    comment?.commentLikes?.includes(user?.id)
  );
  const [likes, setLikes] = useState(comment?.commentLikes?.length);

  const likeCommentReplyParams = {
    postId: post._id,
    commentId: comment._id,
    isComment: true,
  };
  const handleCommentLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((currentLikeCount) => currentLikeCount - 1);
    } else {
      setIsLiked(true);
      setLikes((currentLikeCount) => currentLikeCount + 1);
    }
    dispatch(likeCommentReply(likeCommentReplyParams));
  };

  const handleReplyToComment = async () => {
    await dispatch(
      handleStateForCommentReply({
        commentToPost: false,
        replyToComment: true,
        replyToReply: false,
      })
    );
    await dispatch(
      setCommentReplydetails({
        postId: post._id,
        commentId: comment._id,
        replyid: "",
        repliedToCommenterName: comment.commenterName, // Only for Showing Name in Input tag
      })
    );
  };

  const handleCommentHover = () => {
    setOnCommentHover(!onCommentHover);
    setCommentcommentDeletePayload({
      commentId: comment._id,
      postId: post._id,
    });
  };

  const handleCommentTouch = () => {
    handleCommentHover();
    setTimeout(() => setOnCommentHover(false), 5000);
  };

  return (
    <>
      <div
        className="ms-1 mb-2 py-1"
        // {...(isModal && { "data-bs-dismiss": "modal", "aria-label": "Close" })}
      >
        <div
          className="position-relative"
          onMouseEnter={handleCommentHover}
          onMouseLeave={handleCommentHover}
          onTouchStart={handleCommentTouch}
        >
          <div className="d-flex align-items-start gap-2">
            {/* MiniProfilePicture */}
            <div
              className="likeIcon"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <MiniProfilePicture isComment={true} comment={comment} />
            </div>

            <div className="d-flex flex-column flex-grow-1">
              {/* Commenter Name, Comment */}
              <div className="">
                <span className="commenterName me-2">
                  {comment?.commenterName}
                </span>
                <span className="commenterCmt">{comment?.comment}</span>
              </div>
              {/* Timestamp, Like Count, Reply btn */}
              <div className=" d-flex align-items-center gap-3">
                <p className="mb-0 commenterCmt text-muted">
                  {moment(comment?.createdAt).fromNow()}
                </p>
                <p className="mb-0 commenterName text-muted">
                  {comment?.commentLikes?.length > 1
                    ? `${comment?.commentLikes?.length} Likes`
                    : `${
                        comment?.commentLikes?.length === 0 ? "Like" : "1 Like"
                      }`}
                </p>
                <span
                  className="mb-0 commenterName text-muted likeBtn"
                  onClick={handleReplyToComment}
                >
                  Reply
                </span>
              </div>
            </div>
            <div className="d-flex flex-column gap-1 align-items-center">
              <Likes
                isComment={true}
                isLiked={isLiked}
                likes={likes}
                likeFrom={"commentModal"}
                handleCommentLike={handleCommentLike}
              />
              {onCommentHover && canDeleteComment && (
                <div className="position-absolute bottom-0 end-0">
                  <DeleteIconButton
                    type="post_comment"
                    payload={commentDeletePayload}
                  />
                </div>
              )}
            </div>
          </div>

          {comment?.replyComments?.length > 0 &&
            !viewReplies &&
            !isApiLoading && (
              <div className="ms-4">
                <span
                  className="commenterName text-muted ms-3 likeBtn"
                  onClick={handleReplies}
                >
                  View replies ({comment?.replyComments?.length})
                </span>
              </div>
            )}
        </div>
        <>
          {isApiLoading ? (
            <LoaderMini />
          ) : (
            <>
              {viewReplies &&
                commentReplies?.replyComments?.map((reply, i) => (
                  <ReplyWidget
                    user={user}
                    reply={reply}
                    comment={comment}
                    post={post}
                    key={i}
                    setOnCommentHover={setOnCommentHover}
                  />
                ))}
            </>
          )}
        </>

        {viewReplies && (
          <div className="mb-3">
            <span
              className="commenterCmt text-muted float-end likeBtn"
              onClick={handleReplies}
            >
              Close Replies
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
