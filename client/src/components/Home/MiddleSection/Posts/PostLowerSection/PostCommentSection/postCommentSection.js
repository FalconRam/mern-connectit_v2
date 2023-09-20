import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  commentPostWithUserDetails,
  getCommentsWithProfilePicture,
} from "../../../../../../actions/posts";

import "./postCommentSection.css";
import CommentsWidget from "../../../../../Shared/CommentsWidget/commentsWidget";
import SideModal from "../../../../../SideModal/sideModal";

const PostCommentSection = ({ post, isModal }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.commentsInfo);

  useEffect(() => {
    setComments(post?.commentsInfo);
  }, [post]);

  let postComment = [];
  let [commenterId, commenterName] = [user.id, user.name];
  postComment[0] = { commenterId, commenterName, comment };
  const resultComment = { postComment };

  const handleComment = async () => {
    setIsPostingComment(true);
    const updatedPostWithComment = await dispatch(
      commentPostWithUserDetails(post?._id, resultComment)
    );
    setComment("");
    setIsPostingComment(false);
    dispatch(getCommentsWithProfilePicture(post?._id));
    setComments(updatedPostWithComment);
  };

  let commentSliced = comments?.postComment
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 1);

  return (
    <>
      <div className={isModal ? "pt-1" : "card-footer p-1 pt-1"}>
        <div className={isModal && ""}>
          <div>
            {!commentSliced?.length ? (
              <p className="text-start text-muted ms-2 mb-0 pb-1 p-like">
                Be first to comment...
              </p>
            ) : (
              <>
                {isModal ? (
                  // Shows Comments Widget
                  <>
                    <CommentsWidget post={post} isModal={isModal} />
                  </>
                ) : (
                  // Shows last comment
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center ms-1 gap-2 ">
                      <i className="bi bi-chat-left likeIcon text-success "></i>
                      <h5 className="mb-0 commenterName">
                        {commentSliced?.map((comment) => comment.commenterName)}
                      </h5>
                      <p className="mb-0 commenterCmt">
                        {commentSliced?.map((comment) => comment.comment)}
                      </p>
                    </div>
                    <div className="">
                      <p className="mb-0 me-1 commenterCmt text-muted">
                        {comments?.postComment?.length} Comments
                      </p>
                    </div>
                  </div>
                )}
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
      </div>
    </>
  );
};

export default PostCommentSection;
