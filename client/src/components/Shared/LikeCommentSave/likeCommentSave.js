import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostLikeSection from "../../Home/MiddleSection/Posts/PostLikeSection/postLikeSection";
import MiniProfilePicture from "../MiniProfilePicture/miniProfilePicture";
import { getCommentsWithProfilePicture } from "../../../actions/posts";

const LikeCommentSave = ({
  post,
  handleCopy,
  isPostSaved,
  isCommentsNotOpened,
}) => {
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
              "data-bs-toggle": "modal",
              "data-bs-target": `#staticBackdropComment${post?._id}`,
            })}
            onClick={getComments}
          >
            <i className="bi bi-chat-left likeIcon"></i>
            <p className="mb-0 p-like">Comment</p>
          </span>
          <span
            className="d-flex align-items-center gap-1 likeBtn"
            onClick={handleCopy}
          >
            <i className="bi bi-send"></i>
            <p className="mb-0 p-like">Share</p>
          </span>
        </div>
        <span>
          {!isPostSaved ? (
            <i className="bi bi-bookmark likeIcon"></i>
          ) : (
            <i className="bi bi-bookmark-fill likeIcon"></i>
          )}
        </span>
      </div>
    </div>
  );
};

export default LikeCommentSave;
