import React, { useState, useEffect } from "react";

import PostUpperSection from "./PostUpperSection/postUpperSection";
import PostMiddleSection from "./PostMiddleSection/postMiddleSection";
import PostLowerSection from "./PostLowerSection/postLowerSection";

import "./posts.css";

const Posts = ({ post }) => {
  const [comments, setComments] = useState(post?.commentsInfo);

  useEffect(() => {
    setComments(post?.commentsInfo);
  }, [post]);

  return (
    <>
      <div className="card mb-3 mx-auto">
        {/* Creator Details & More Option - Card Header*/}
        <PostUpperSection post={post} />

        {/* Image */}
        <PostMiddleSection post={post} />

        {/* Caption & Comment - Card Body & Footer*/}
        <PostLowerSection
          post={post}
          comments={comments}
          setComments={setComments}
        />
      </div>
    </>
  );
};

export default Posts;
