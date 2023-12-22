import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  commentPostWithUserDetails,
  getCommentsWithProfilePicture,
  submitReplyToCommentAction,
  submitReplyToReplyAction,
} from "../../../actions/posts";

const CommentFormButton = ({ post, setComments }) => {
  let actionTo;
  let inputCommentReply = useRef(null);

  const { commentReplyState, commentReplyDetails } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");
  const actionType = {
    commentToPost: "commentToPost",
    replyToComment: "replyToComment",
    replyToReply: "replyToReply",
  };
  if (commentReplyState.commentToPost) {
    actionTo = actionType.commentToPost;
  } else if (commentReplyState.replyToComment) {
    actionTo = actionType.replyToComment;
    inputCommentReply.current.focus();
  } else if (commentReplyState.replyToReply) {
    actionTo = actionType.replyToReply;
  }

  if (commentReplyState.replyToComment || commentReplyState.replyToReply) {
    // inputCommentReply.current.scrollIntoView({ behavior: "smooth" });
    inputCommentReply?.current?.focus();
  }
  const handleSubmit = () => {
    switch (actionTo) {
      case actionType.commentToPost:
        let postComment = [];
        postComment.push({
          commenterId: user.id,
          commenterName: user.name,
          comment,
        });
        submitCommentToPost(postComment);
        break;
      case actionType.replyToComment:
        let replyToCommentBody = {
          commentReply: {
            replierId: user.id,
            replierName: user.name,
            reply: comment,
          },
          repliedTo: commentReplyDetails.commentId,
        };
        submitReplyToComment(replyToCommentBody);
        break;
      case actionType.replyToReply:
        let replyToReplyBody = {
          replyOfReply: {
            replierId: user.id,
            replierName: user.name,
            reply: comment,
          },
          commentId: commentReplyDetails.commentId,
          repliedTo: commentReplyDetails.replyId,
        };
        // console.log(replyToReplyBody);
        submitReplyToReply(replyToReplyBody);
        break;
      default:
        break;
    }
  };

  const submitCommentToPost = async (postComment) => {
    setIsPostingComment(true);
    const updatedPostWithComment = await dispatch(
      commentPostWithUserDetails(post?._id, { postComment })
    );
    setComment("");
    setIsPostingComment(false);
    dispatch(getCommentsWithProfilePicture(post?._id, false));
    setComments(updatedPostWithComment);
  };

  const submitReplyToComment = async (replyToCommentBody) => {
    setIsPostingComment(true);
    await dispatch(submitReplyToCommentAction(post?._id, replyToCommentBody));
    setComment("");
    setIsPostingComment(false);
    dispatch(getCommentsWithProfilePicture(post?._id, false));
  };

  const submitReplyToReply = async (replyToReplyBody) => {
    setIsPostingComment(true);
    await dispatch(submitReplyToReplyAction(post?._id, replyToReplyBody));
    setComment("");
    setIsPostingComment(false);
  };
  return (
    <div className="input-group">
      <input
        ref={inputCommentReply}
        disabled={isPostingComment}
        type="text"
        className={
          isPostingComment
            ? "form-control form-control-sm form-control-comment ms-2 text-muted"
            : "form-control form-control-sm form-control-comment ms-2"
        }
        placeholder={
          commentReplyDetails.repliedToCommenterName ||
          commentReplyDetails.repliedToReplierName
            ? `Replying to ${
                commentReplyDetails.repliedToCommenterName ||
                commentReplyDetails.repliedToReplierName
              }`
            : "Write your Comment..."
        }
        aria-label="Username"
        aria-describedby="basic-addon1"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={isPostingComment || !comment.length}
        className={
          isPostingComment || !comment.length
            ? "input-group-text text-success eyeButton commentIcon me-2 text-muted commentIconHold"
            : "input-group-text text-success eyeButton commentIcon me-2"
        }
        id="basic-addon1"
        onClick={handleSubmit}
      >
        <i className="bi bi-plus-circle commentIcon"></i>
      </button>
    </div>
  );
};

export default CommentFormButton;
