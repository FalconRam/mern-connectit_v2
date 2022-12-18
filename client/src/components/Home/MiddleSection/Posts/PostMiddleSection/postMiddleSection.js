import React from "react";

import { useHistory } from "react-router-dom";

import "./postMiddleSection.css";

const PostMiddleSection = ({ post }) => {
  const history = useHistory();

  const handleprofileDetails = (postId) => {
    history.push("/");
  };

  return (
    <>
      <div onClick={() => handleprofileDetails(post?.post?._id)}>
        <img
          src={
            post?.post?.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          className="card-img-top postImage"
          alt="Post Picture"
        ></img>
      </div>
    </>
  );
};

export default PostMiddleSection;
