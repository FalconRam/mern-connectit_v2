import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCommentsWithProfilePicture } from "../../../actions/posts";
import CommentItem from "./commentItem";

const CommentsWidget = ({ post, isModal }) => {
  const { comments, isPostCommentsLoading } = useSelector(
    (state) => state.posts
  );
  comments?.comments?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <>
      <div>
        <div className="d-flex justify-content-end mb-1">
          <p className="mb-0 me-1 commenterCmt text-muted">
            {post?.commentsInfo?.postComment?.length} Comments
          </p>
        </div>
        {isModal &&
          comments?.comments?.map((comment, index) => (
            <CommentItem comment={comment} key={index} isModal={isModal} />
          ))}
      </div>
    </>
  );
};

export default CommentsWidget;
