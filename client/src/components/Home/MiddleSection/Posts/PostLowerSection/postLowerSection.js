import React, { useState } from "react";

import "./postLowerSection.css";
import PostCommentSection from "./PostCommentSection/postCommentSection";
import LikeCommentSave from "../../../../Shared/LikeCommentSave/likeCommentSave";
import PostCaptionMain from "../../../../Shared/PostCaptionMain/postCaptionMain";
import SideCommentModal from "../../../../Modals/SideModal/sideCommentModal";

const PostLowerSection = ({ post, comments, setComments }) => {
  const [isPostSaved, setIsPostSaved] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`);
  };

  return (
    <>
      <div className="card-body p-2">
        {/* Like,Comment,Save */}

        <LikeCommentSave
          post={post}
          isPostSaved={isPostSaved}
          handleCopy={handleCopy}
          isCommentsNotOpened={true}
        />
        <SideCommentModal
          post={post}
          isPostSaved={isPostSaved}
          handleCopy={handleCopy}
          comments={comments}
          setComments={setComments}
        />

        <div className="divider custom-divider bg-light"></div>
        {/* Caption */}
        <PostCaptionMain
          post={post}
          handleReadMore={handleReadMore}
          isReadMore={isReadMore}
        />
      </div>

      {/* Comment Section */}
      <PostCommentSection
        isModal={false}
        post={post}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
};

export default PostLowerSection;
