import React, { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";
import CommentItem from "./commentItem";
import LoaderMini from "../utils/loaderMini";

const CommentsWidget = ({ post, isModal, setComments }) => {
  const { postComments, isPostCommentsLoading } = useSelector(
    (state) => state.posts
  );

  let sortedComments = useMemo(() => {
    return postComments?.comments?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [postComments, post]);
  return (
    <div>
      {isPostCommentsLoading ? (
        <LoaderMini />
      ) : isModal && sortedComments?.length ? (
        sortedComments.map((comment, index) => (
          <CommentItem
            post={post}
            comment={comment}
            key={index}
            isModal={isModal}
          />
        ))
      ) : (
        // Shows below if no comments
        <p className="text-start text-muted ms-2 mb-0 pb-1 p-like">
          Be the first to comment...
        </p>
      )}
    </div>
  );
};

export default CommentsWidget;
