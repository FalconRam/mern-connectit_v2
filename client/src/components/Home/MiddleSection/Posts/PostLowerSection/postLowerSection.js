import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import PostLikeSection from "../PostLikeSection/postLikeSection";

import "./postLowerSection.css";
import PostCaption from "./PostCaption/postCaption";
import PostCommentSection from "./PostCommentSection/postCommentSection";
import SideModal from "../../../../SideModal/sideModal";
import LikeCommentSave from "../../../../Shared/LikeCommentSave/likeCommentSave";
import PostCaptionMain from "../../../../Shared/PostCaptionMain/postCaptionMain";

const PostLowerSection = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isPostSaved, setIsPostSaved] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`);
  };

  const handleProfile = () => {
    history.push(`/profile/details?profileId=${post.creator}`);
  };

  return (
    <>
      <div className="card-body p-2">
        {/* Like,Comment,Save */}

        <LikeCommentSave
          post={post}
          isPostSaved={isPostSaved}
          handleProfile={handleProfile}
          handleCopy={handleCopy}
          isModal={true}
        />
        <SideModal
          post={post}
          isPostSaved={isPostSaved}
          handleProfile={handleProfile}
          handleCopy={handleCopy}
        />

        <div className="divider custom-divider bg-light"></div>
        {/* Caption */}
        <PostCaptionMain
          post={post}
          handleReadMore={handleReadMore}
          isReadMore={isReadMore}
        />
      </div>

      {/* Comment Section */}
      <PostCommentSection post={post} />

      {/* <div className="card-footer p-1 pt-1">
        <div>
          {!sortedComment.length ? (
            <p className="text-start text-muted ms-2 mb-0 pb-1 p-like">
              Be first to comment...
            </p>
          ) : (
            <>
              <div className="d-flex align-items-center ms-1 gap-2 ">
                <i className="bi bi-chat-left likeIcon text-success "></i>
                <h5 className="mb-0 commenterName">
                  {sortedComment.map((comment) => comment.commenterName)}
                </h5>
                <p className="mb-0 commenterCmt">
                  {sortedComment.map((comment) => comment.comment)}
                </p>
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
            placeholder="Post your Comment..."
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
      </div> */}
    </>
  );
};

export default PostLowerSection;
