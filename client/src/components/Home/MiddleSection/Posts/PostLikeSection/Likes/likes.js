import React from "react";

import "./likes.css";

const Likes = ({ isLiked, likes, handleLike }) => {
  return (
    <>
      {isLiked ? (
        // Red Heart
        <div className="d-flex align-items-center">
          <i
            className="bi bi-heart-fill likeIcon likeIcon-danger"
            onClick={handleLike}
          ></i>
          <p className="p-like">
            &nbsp;
            {likes !== 0 ? likes : null} {likes > 1 ? "Likes" : "Like"}
          </p>
        </div>
      ) : (
        // Heart Outline
        <div className="d-flex align-items-center">
          <i className="bi bi-heart likeIcon" onClick={handleLike}></i>
          &nbsp;
          <p className="p-like">
            &nbsp;
            {likes !== 0 ? likes : null} {likes > 1 ? "Likes" : "Like"}
          </p>
        </div>
      )}
    </>
  );
};

export default Likes;
