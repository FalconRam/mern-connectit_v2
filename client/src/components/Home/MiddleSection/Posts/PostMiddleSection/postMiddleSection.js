import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PostDetailsModal from "../../../../Modals/PostDetailsModal/postDetailsModal";

import "./postMiddleSection.css";
import { getCommentsWithProfilePicture } from "../../../../../actions/posts";

const PostMiddleSection = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const getComments = () => {
    dispatch(getCommentsWithProfilePicture(post?._id, true));
  };

  return (
    <>
      <div className="postImage-container">
        <button
          type="button"
          className="post-image-btn"
          data-bs-toggle="modal"
          data-bs-target={`#exampleModalCenter${post._id}`}
          onClick={getComments}
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
