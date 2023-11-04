import React from "react";

import { useSelector } from "react-redux";
import CommentItem from "./commentItem";
import LoaderMini from "../utils/loaderMini";

const CommentsWidget = ({ post, isModal }) => {
  const { postComments, isPostCommentsLoading } = useSelector(
    (state) => state.posts
  );
  postComments?.comments?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <>
      {isPostCommentsLoading ? (
        <LoaderMini />
      ) : (
        <>
          {isModal &&
            postComments?.comments?.map((comment, index) => (
              <CommentItem
                post={post}
                comment={comment}
                key={index}
                isModal={isModal}
              />
            ))}
        </>
      )}
    </>
  );
};

export default CommentsWidget;
