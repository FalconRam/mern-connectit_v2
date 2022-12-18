import React from "react";

import { useHistory } from "react-router-dom";
import PostUpperSection from "./PostUpperSection/postUpperSection";
import PostMiddleSection from "./PostMiddleSection/postMiddleSection";
import PostLowerSection from "./PostLowerSection/postLowerSection";

import "./posts.css";

const Posts = ({ post }) => {
  const history = useHistory();

  return (
    <>
      <div className="card mb-3 mx-auto">
        {/* Creator Details & More Option - Card Header*/}
        <PostUpperSection post={post} />

        {/* Image */}
        <PostMiddleSection post={post} />

        {/* Caption & Comment - Card Body & Footer*/}
        <PostLowerSection post={post} />
      </div>
    </>
  );
};

export default Posts;
