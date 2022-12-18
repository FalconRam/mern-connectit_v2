import React, { useState } from "react";

import "./postCaption.css";

const PostCaption = ({ post }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <div>
        {isReadMore ? (
          <div className="scrollInView">
            <p className="p-content mb-1">{post?.post?.message}</p>
            <p className="tags text-muted">
              {post?.post?.tags.map((tag) => `#${tag} `)}
            </p>
          </div>
        ) : (
          <p className="p-content mb-0 d-inline-block text-muted">
            {post?.post?.message.slice(0, 165)}
          </p>
        )}
        <p onClick={handleReadMore} className="readMore mb-0">
          {isReadMore ? "show less" : "...read more"}
        </p>
      </div>
    </>
  );
};

export default PostCaption;
