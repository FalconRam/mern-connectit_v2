import React, { useState } from "react";
import { useDispatch } from "react-redux";

import PostLikeSection from "../../Home/MiddleSection/Posts/PostLikeSection/postLikeSection";
import MiniProfilePicture from "../MiniProfilePicture/miniProfilePicture";
import { getCommentsWithProfilePicture } from "../../../actions/posts";
import PostSave from "../PostSave/postSave";

const LikeCommentSave = ({ post, handleShare, isCommentsNotOpened }) => {
  const dispatch = useDispatch();
  const getComments = () => {
    isCommentsNotOpened &&
      dispatch(getCommentsWithProfilePicture(post?._id, true));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          {/* Mini Profile Picture */}
          <MiniProfilePicture post={post} />
          <PostLikeSection post={post} />
          <span
            className="d-flex align-items-center gap-1 likeBtn"
            {...(isCommentsNotOpened && {
              "data-bs-toggle": "offcanvas",
              "data-bs-target": `#offcanvasRight${post._id}`,
              "aria-controls": "offcanvasRight",
            })}
            onClick={getComments}
          >
            <i className="bi bi-chat-left likeIcon"></i>
            <p className="mb-0 p-like">Comment</p>
          </span>
          <span
            className="d-flex align-items-center gap-1 likeBtn"
            onClick={handleShare}
          >
            <i className="bi bi-send"></i>
            <p className="mb-0 p-like">Share</p>
          </span>
        </div>
        <PostSave post={post} />
      </div>
    </div>
  );
};

export default LikeCommentSave;
