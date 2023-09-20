import React, { useState } from "react";

import { useHistory } from "react-router-dom";

const MiniProfilePicture = ({ post, isComment, comment }) => {
  const history = useHistory();
  const handleProfile = () => {
    history.push(
      `/profile/details?profileId=${
        isComment ? comment.commenterId : post.creator
      }`
    );
  };
  return (
    <>
      <div
        className=" d-flex flex-row align-items-center gap-2 likeBtn"
        onClick={handleProfile}
      >
        {isComment ? (
          // For Comment Modal
          <>
            <img
              src={
                comment?.profilePicture === ""
                  ? comment?.commenterName?.charAt(0).toUpperCase()
                  : comment?.profilePicture ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              className="img-thumbnail rounded-circle miniPostProfilePic d-flex align-items-center justify-content-center"
              alt={comment?.commenterName?.charAt(0).toUpperCase()}
            ></img>
          </>
        ) : (
          // For Post Card - lower section
          <>
            <img
              src={
                post?.profilePicture === ""
                  ? post?.name?.charAt(0).toUpperCase()
                  : post?.profilePicture ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              className="img-thumbnail rounded-circle miniPostProfilePic d-flex align-items-center justify-content-center"
              alt={post?.name?.charAt(0).toUpperCase()}
            ></img>
          </>
        )}
        <div>
          <h6 className="mb-0 postCreator">{post?.name}</h6>
        </div>
      </div>
    </>
  );
};

export default MiniProfilePicture;
