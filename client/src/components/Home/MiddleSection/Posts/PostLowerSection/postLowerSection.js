import React, { useState } from "react";

import "./postLowerSection.css";
import PostCommentSection from "./PostCommentSection/postCommentSection";
import LikeCommentSave from "../../../../Shared/LikeCommentSave/likeCommentSave";
import PostCaptionMain from "../../../../Shared/PostCaptionMain/postCaptionMain";
import SideCommentModal from "../../../../Modals/SideModal/sideCommentModal";
import imgURLToBase64 from "../../../../../utils/imageURLToBase64";
import { shareOnMobile } from "react-mobile-share";

const PostLowerSection = ({ post, comments, setComments }) => {
  const [isPostSaved, setIsPostSaved] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  // const handleShare = () => {
  //   navigator.clipboard.writeText(
  //     `${window.location.origin}/post?postId=${post._id}`
  //   );
  // };

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
        {/* Like,Comment,Save */}

        <LikeCommentSave
          post={post}
          isPostSaved={isPostSaved}
          handleShare={handleShare}
          isCommentsNotOpened={true}
        />
        <SideCommentModal
          post={post}
          isPostSaved={isPostSaved}
          handleShare={handleShare}
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
