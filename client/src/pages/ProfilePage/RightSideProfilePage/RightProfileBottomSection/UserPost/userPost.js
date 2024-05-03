import React, { useState, useEffect } from "react";
import ViewEditModal from "../../../../../components/Modals/ViewEditModal/viewEditModal";

import "./userPost.css";

const UserPost = ({ post, profileDetails, isSaved = false }) => {
  const [postLikesCount, setLikesCount] = useState(post?.likes?.length);
  const [postCommentsCount, setCommentsCount] = useState(
    post?.commentsInfo?.postComment?.length
  );
  useEffect(() => {
    setLikesCount(post?.likes?.length);
    setCommentsCount(post?.commentsInfo?.postComment?.length);
  }, [post?.likes, post?.commentsInfo?.postComment]);

  let savedPostUser = {
    userDetails: {
      profilePicture: post.profilePicture,
      bio: post.creatorBio,
    },
    ...profileDetails,
  };

  return (
    <div>
      <div
        className="card imageHover customPostCard"
        data-bs-toggle="modal"
        data-bs-target={
          isSaved
            ? `#viewEditModal${post._id}_saved`
            : `#viewEditModal${post._id}`
        }
      >
        <img
          className="img-fluid d-block m-auto image-only"
          src={post?.selectedFile}
          alt="Post Image"
          // data-bs-toggle="modal"
          // data-bs-target={`#viewEditModal${post._id}`}
        />
        <div
          className="d-flex justify-content-center align-items-center hoverDiv"
          // data-bs-toggle="modal"
          // data-bs-target={`#viewEditModal${post._id}`}
        >
          <p className="hoverDiv-likeIcon">
            <i className="bi bi-heart-fill text-danger" /> {postLikesCount}
          </p>
          <p className="hoverDiv-commentIcon">
            <i className="bi bi-chat-fill text-danger" /> {postCommentsCount}
          </p>
        </div>
      </div>
      {/* <PostDetailsModal post={post} profileDetails={profileDetails} /> */}
      <ViewEditModal
        post={post}
        profileDetails={savedPostUser}
        isSaved={isSaved}
      />
    </div>
  );
};

export default UserPost;
