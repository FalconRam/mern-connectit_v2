import React, { useState } from "react";

import { useDispatch } from "react-redux";
import PostLikeSection from "../../../Home/MiddleSection/Posts/PostLikeSection/postLikeSection";
import PostCaption from "../../../Home/MiddleSection/Posts/PostLowerSection/PostCaption/postCaption";
import PostCommentSection from "../../../Home/MiddleSection/Posts/PostLowerSection/PostCommentSection/postCommentSection";

import "../../../Home/MiddleSection/Posts/PostLowerSection/postLowerSection.css";
import imgURLToBase64 from "../../../../utils/imageURLToBase64";
import { shareOnMobile } from "react-mobile-share";
import PostSave from "../../PostSave/postSave";

const PostLowerSectionModal = ({
  post,
  profileDetails,
  comments,
  setComments,
}) => {
  const [isPostSaved, setIsPostSaved] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleShare = async () => {
    const imgBase64 = await imgURLToBase64(post.selectedFile);

    const data = {
      text: `Hey checkout out ${post.name}'s Post`,
      url: `${window.location.origin}/post?postId=${post._id}`,
      title: `${post.title}`,
      images: [imgBase64],
    };
    try {
      shareOnMobile(data, () => navigator.clipboard.writeText(data.url));
    } catch (error) {
      navigator.clipboard.writeText(data.url);
    }
  };

  return (
    <>
      <div className="card-body p-2">
        {/* Mini Profile Picture */}
        <div className=" d-flex align-items-center justify-content-start gap-2">
          <img
            src={
              post?.profilePicture === "" ||
              profileDetails?.userDetails?.profilePicture === ""
                ? post?.name?.charAt(0).toUpperCase()
                : post?.profilePicture ||
                  profileDetails?.userDetails?.profilePicture ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="img-thumbnail rounded-circle miniPostProfilePic"
            alt={post?.name?.charAt(0).toUpperCase()}
          ></img>
          <div>
            <h6 className="mb-0 postCreator">{post?.name}</h6>
            <p className="p-content mb-0 d-sm-block d-md-none">
              {profileDetails?.userDetails
                ? profileDetails?.userDetails?.bio?.slice(0, 43)
                : post?.creatorBio?.slice(0, 43)}
              ...
            </p>
            <p className="p-content mb-0 d-none d-md-block d-lg-none">
              {profileDetails?.userDetails
                ? profileDetails?.userDetails?.bio?.slice(0, 51)
                : post?.creatorBio?.slice(0, 51)}
              ...
            </p>
            <p className="p-content mb-0 d-none d-lg-block">
              {profileDetails?.userDetails
                ? profileDetails?.userDetails?.bio?.slice(0, 89)
                : post?.creatorBio?.slice(0, 89)}
              ...
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

          <span className="d-flex align-items-center gap-1 likeBtn">
            <i className="bi bi-chat-left likeIcon"></i>
            <p className="mb-0 p-like">Comment</p>
          </span>
          <span
            className="d-flex align-items-center gap-1 likeBtn"
            onClick={handleShare}
          >
            <i className="bi bi-send"></i>
            <p className="mb-0 p-like">Share</p>
          </span>
        </div>
        <PostSave post={post} />
      </div>

      {/* Comment Section */}
      <PostCommentSection
        post={post}
        isModal={true}
        setComments={setComments}
      />
    </>
  );
};

export default PostLowerSectionModal;
