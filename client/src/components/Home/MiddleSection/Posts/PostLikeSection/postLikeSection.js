import React, { useState } from "react";

import "./postLikeSection.css";

const PostLikeSection = ({ post, userId }) => {
  let likes = post.post.likes;
  const [isLikeUpdating, setIsLikeUpdating] = useState(false);
  if (likes?.length > 0) {
    return likes?.find((like) => like === userId) ? (
      <>
        {/* <FavoriteOutlinedIcon
          fontSize="small"
          style={{ color: "red" }}
          disabled={isLikeUpdating}
        /> */}
        <div className="d-flex align-items-center">
          <i class="bi bi-heart likeIcon"></i>&nbsp;
          {likes?.length > 2 ? (
            <p className="p-like">You, {likes?.length - 1} others</p>
          ) : (
            <p className="p-like">
              {likes?.length} Like{likes?.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </>
    ) : (
      <>
        {/* <FavoriteBorderOutlinedIcon
          fontSize="small"
          disabled={isLikeUpdating}
        /> */}
        <div className="d-flex align-items-center">
          <i class="bi bi-heart-fill text-danger likeIcon"></i>
          <p className="p-like text-danger mb-0">
            &nbsp;{likes?.length} {likes?.length <= 1 ? "Like" : "Likes"}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <FavoriteBorderOutlinedIcon fontSize="small" disabled={isLikeUpdating} /> */}
      <div>
        <i class="bi bi-heart-fill likeIcon"></i>
        <p className="p-like">&nbsp;Like</p>
      </div>
    </>
  );
};

export default PostLikeSection;
