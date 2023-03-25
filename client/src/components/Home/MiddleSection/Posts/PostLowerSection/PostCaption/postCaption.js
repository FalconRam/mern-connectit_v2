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
        {/* 1st condi. will checks if message has content,
        if not has then checks tags array has any content, if not then set null.
        If tags has content then it will render tags only*/}
        {post?.message?.length === 0 ? (
          post?.tags?.length === 0 ? null : (
            <p className="tags text-muted mb-0">
              {post?.tags?.map((tag) => `#${tag} `)}
            </p>
          )
        ) : (
          // else, if message has content then both will render as below order
          <div>
            {isReadMore ? (
              <div className="scrollInView">
                <p className="p-content mb-1">{post?.message}</p>
                <p className="tags text-muted mb-0">
                  {post?.tags?.map((tag) => `#${tag} `)}
                </p>
              </div>
            ) : (
              <p className="p-content mb-0 d-inline-block text-muted">
                {post?.message?.slice(0, 165)}
              </p>
            )}
            <p onClick={handleReadMore} className="readMore mb-0">
              {isReadMore ? "show less" : "...read more"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostCaption;
