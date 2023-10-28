import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {
  commentPostWithUserDetails,
  getCommentsWithProfilePicture,
} from "../../../actions/posts";

const CommentFormButton = ({ post, setComments }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");

  let postComment = [];
  postComment.push({ commenterId: user.id, commenterName: user.name, comment });

  const handleComment = async () => {
    setIsPostingComment(true);
    const updatedPostWithComment = await dispatch(
      commentPostWithUserDetails(post?._id, { postComment })
    );
    setComment("");
    setIsPostingComment(false);
    dispatch(getCommentsWithProfilePicture(post?._id));
    setComments(updatedPostWithComment);
  };
  return (
    <div className="input-group">
      <input
        disabled={isPostingComment}
        type="text"
        className={
          isPostingComment
            ? "form-control form-control-sm form-control-comment ms-2 text-muted"
            : "form-control form-control-sm form-control-comment ms-2"
        }
        placeholder="Write your Comment..."
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
        onClick={handleComment}
      >
        <i className="bi bi-plus-circle commentIcon"></i>
      </button>
    </div>
  );
};

export default CommentFormButton;
