import React from "react";
import moment from "moment";

import "./posts.css";

const Posts = ({ post }) => {
  return (
    <>
      <div className="card  mb-3 mx-auto">
        <div className="card-header">
          <h6 className="mb-0">{post?.name}</h6>
          <p className="text-muted m-0">{moment(post?.createdAt).fromNow()}</p>
        </div>

        <img
          src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          className="card-img-top"
          alt="Post Picture"
        ></img>
        <div className="card-body">
          <p className="card-text">{post?.title}</p>
        </div>
        <div className="card-footer">2 days ago</div>
      </div>
    </>
  );
};

export default Posts;
