import React from "react";

import { useHistory } from "react-router-dom";
import PostDetailsModal from "../../../../Shared/PostDetailsModal/postDetailsModal";

import "./postMiddleSection.css";

const PostMiddleSection = ({ post }) => {
  const history = useHistory();

  return (
    <>
      <div className="postImage-container">
        <button
          type="button"
          className="post-image-btn"
          data-bs-toggle="modal"
          data-bs-target={`#exampleModalCenter${post._id}`}
        >
          <img
            src={
              post?.selectedFile ||
              post?.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="card-img-top postImage"
            alt="Post Picture"
          ></img>
        </button>
        <PostDetailsModal post={post} />
      </div>
    </>
  );
};

export default PostMiddleSection;
