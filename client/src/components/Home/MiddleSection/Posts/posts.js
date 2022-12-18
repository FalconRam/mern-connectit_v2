import React from "react";
import moment from "moment";

import "./posts.css";

const Posts = ({ post }) => {
  const handleprofileDetails = (postId) => {};
  return (
    <>
      <div className="card mb-3 mx-auto">
        <div className="card-header d-flex flex-row align-items-center gap-2">
          <div>
            <img
              src={
                post?.creatorProfilePicture === ""
                  ? post?.post?.name.charAt(0).toUpperCase()
                  : post?.creatorProfilePicture ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              className="img-thumbnail rounded-circle postProfilePic d-flex align-items-center justify-content-center"
              alt={post?.post?.name.charAt(0).toUpperCase()}
            ></img>
          </div>
          <div>
            <h6 className="mb-0 postCreator">{post?.post?.name}</h6>
            <p className="text-muted m-0 postCreated">
              {moment(post?.post?.createdAt).fromNow()}
            </p>
          </div>
        </div>
        <div onClick={() => handleprofileDetails(post?.post?._id)}></div>
        <img
          src={
            post?.post?.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          className="card-img-top postImage"
          alt="Post Picture"
        ></img>
        <div className="card-body">
          <p className="card-text">{post?.post?.title}</p>
        </div>
        <div className="card-footer">2 days ago</div>
      </div>
    </>
  );
};

export default Posts;
