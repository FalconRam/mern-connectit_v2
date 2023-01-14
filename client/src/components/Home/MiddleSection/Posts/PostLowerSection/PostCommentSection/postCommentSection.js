import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { commentPostWithUserDetails } from "../../../../../../actions/posts";

import "./postCommentSection.css";

const PostCommentSection = ({ post }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.commentsInfo);

  let postComment = [];
  let [commenterId, commenterName] = [user.result._id, user.result.name];
  postComment[0] = { commenterId, commenterName, comment };
  const resultComment = { postComment };

  const handleComment = async () => {
    setIsPostingComment(true);
    const updatedPostWithComment = await dispatch(
      commentPostWithUserDetails(post?._id, resultComment)
    );
    setComment("");
    setIsPostingComment(false);
    setComments(updatedPostWithComment);
  };

  let sortedComment = comments?.postComment
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 1);
  return (
    <>
      <div className="card-footer p-1 pt-1">
        <div>
          {!sortedComment?.length ? (
            <p className="text-start text-muted ms-2 mb-0 pb-1 p-like">
              Be first to comment...
            </p>
          ) : (
            <>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center ms-1 gap-2 ">
                  <i className="bi bi-chat-left likeIcon text-success "></i>
                  <h5 className="mb-0 commenterName">
                    {sortedComment?.map((comment) => comment.commenterName)}
                  </h5>
                  <p className="mb-0 commenterCmt">
                    {sortedComment?.map((comment) => comment.comment)}
                  </p>
                </div>
                <div>
                  <p className="mb-0 me-1 commenterCmt text-muted">
                    {comments?.postComment?.length} Comments
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
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
      </div>
    </>
  );
};

export default PostCommentSection;
