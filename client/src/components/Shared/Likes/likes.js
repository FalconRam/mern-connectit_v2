import React from "react";

import "./likes.css";

const Likes = ({
  isComment,
  isLiked,
  likes,
  likeFrom,
  handlePostLike,
  handleCommentLike,
  handleReplyLike,
}) => {
  let type = {
    postCard: "postCard",
    commentModal: "commentModal",
    commentReply: "commentReply",
  };
  const handleLike = () => {
    switch (likeFrom) {
      case type.postCard:
        handlePostLike();
        break;
      case type.commentModal:
        handleCommentLike();
        break;
      case type.commentReply:
        handleReplyLike();
        break;
      default:
        break;
    }
  };
  return (
    <>
      {!isComment ? (
        <>
          {isLiked ? (
            // Red Heart
            <div className="d-flex align-items-center likeBtn">
              <i
                className="bi bi-heart-fill likeIcon likeIcon-danger"
                onClick={handleLike}
              />
              <p className="p-like">
                &nbsp;
                {likes > 1 ? `${likes} Likes` : `${likes || ""} Like`}
              </p>
            </div>
          ) : (
            // Heart Outline
            <div className="d-flex align-items-center likeBtn">
              <i className="bi bi-heart likeIcon" onClick={handleLike} />
              &nbsp;
              <p className="p-like">
                &nbsp;
                {likes > 1 ? `${likes} Likes` : `${likes || ""} Like`}
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {isLiked ? (
            // Red Heart
            <div className="d-flex align-items-center likeBtn">
              <i
                className="bi bi-heart-fill likeIcon likeIcon-danger"
                onClick={handleLike}
              />
            </div>
          ) : (
            // Heart Outline
            <div className="d-flex align-items-center likeBtn">
              <i className="bi bi-heart likeIcon" onClick={handleLike} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Likes;
