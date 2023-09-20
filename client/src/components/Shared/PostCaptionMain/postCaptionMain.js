import React from "react";
import PostCaption from "../../Home/MiddleSection/Posts/PostLowerSection/PostCaption/postCaption";

const PostCaptionMain = ({ post, handleReadMore, isReadMore }) => {
  return (
    <div>
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
  );
};

export default PostCaptionMain;
