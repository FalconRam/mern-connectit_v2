import React from "react";
import { useDispatch } from "react-redux";
import { deletePostCommentAction, deletePostReplyAction } from "../../../actions/posts";

const DeleteIconButton = ({ type, payload }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    switch (type) {
      case "post_comment":
        const { commentId, postId } = payload;
        console.log({ commentId, postId });
        dispatch(deletePostCommentAction(commentId, postId));
        break;
      case "post_comment_reply":
        const { replyId } = payload;
        dispatch(
          deletePostReplyAction(replyId, payload.commentId, payload.postId)
        );
        break;
      case "post":
        break;
      default:
        return;
    }
  };
  return (
    <>
      <span onClick={handleDelete}>
        <i className="bi bi-trash3"></i>
      </span>
    </>
  );
};

export default DeleteIconButton;
