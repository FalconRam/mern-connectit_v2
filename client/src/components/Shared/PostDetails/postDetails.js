import React from "react";

import PostUpperSection from "../../Home/MiddleSection/Posts/PostUpperSection/postUpperSection";
import PostLowerSectionModal from "./PostLowerSectionModal/PostLowerSectionModal";

import "./postDetails.css";

const PostDetails = ({ post, profileDetails }) => {
  return (
    <>
      <div className="gap-3">
        <div className="card col mx-auto">
          <div className="d-flex flex-column flex-md-row">
            {/* Upper/Left Section */}
            <div className="col-sm-12 col-md-6 ps-0">
              <PostUpperSection post={post} profileDetails={profileDetails} />
              <img
                src={
                  post?.selectedFile ||
                  post?.selectedFile ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                className="card-img-top postImage"
                alt="Post Picture"
              ></img>
            </div>
            {/* Lower/Right Section */}
            <div className="col-sm-12 col-md-6">
              <PostLowerSectionModal
                post={post}
                profileDetails={profileDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
