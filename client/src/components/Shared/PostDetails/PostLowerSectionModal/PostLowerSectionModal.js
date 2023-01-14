import React, { useState } from "react";

import { useDispatch } from "react-redux";
import PostLikeSection from "../../../Home/MiddleSection/Posts/PostLikeSection/postLikeSection";
import PostCaption from "../../../Home/MiddleSection/Posts/PostLowerSection/PostCaption/postCaption";
import PostCommentSection from "../../../Home/MiddleSection/Posts/PostLowerSection/PostCommentSection/postCommentSection";

import "../../../Home/MiddleSection/Posts/PostLowerSection/postLowerSection.css";

const PostLowerSectionModal = ({ post }) => {
  const dispatch = useDispatch();

  const [isPostSaved, setIsPostSaved] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <div className="card-body p-2">
        {/* Mini Profile Picture */}
        <div className=" d-flex align-items-center justify-content-start gap-2">
          <img
            src={
              post?.profilePicture === ""
                ? post?.name?.charAt(0).toUpperCase()
                : post?.profilePicture ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="img-thumbnail rounded-circle miniPostProfilePic"
            alt={post?.name?.charAt(0).toUpperCase()}
          ></img>
          <div>
            <h6 className="mb-0 postCreator">{post?.name}</h6>
            <p className="p-content mb-0 d-sm-block d-md-none">
              {post?.creatorBio?.slice(0, 32)}...
            </p>
            <p className="p-content mb-0 d-none d-md-block d-lg-none">
              {post?.creatorBio?.slice(0, 45)}...
            </p>
            <p className="p-content mb-0 d-none d-lg-block">
              {post?.creatorBio?.slice(0, 86)}...
            </p>
          </div>
        </div>

        {/* Caption */}
        <div
          className={
            isReadMore
              ? "card-text postContent-scrollInView"
              : "card-text postContent"
          }
        >
          <h6 className="mt-1 mb-0 title">{post?.title}</h6>
          <PostCaption
            post={post}
            isReadMore={isReadMore}
            handleReadMore={handleReadMore}
          />
        </div>
      </div>

      <div className="divider custom-divider bg-light"></div>

      {/* Like,Comment,Save */}
      <div className="d-flex justify-content-between align-items-center ms-2 me-2">
        <div className="d-flex align-items-center gap-3">
          <PostLikeSection post={post} />

          <span className="d-flex align-items-center gap-1">
            <i className="bi bi-chat-left likeIcon"></i>
            <p className="mb-0 p-like">Comment</p>
          </span>
          <span className="d-flex align-items-center gap-1">
            <i className="bi bi-send"></i>
            <p className="mb-0 p-like">Share</p>
          </span>
        </div>
        <span>
          {!isPostSaved ? (
            <i className="bi bi-bookmark likeIcon"></i>
          ) : (
            <i className="bi bi-bookmark-fill likeIcon"></i>
          )}
        </span>
      </div>

      {/* Comment Section */}
      <PostCommentSection post={post} />
    </>
  );
};

export default PostLowerSectionModal;
