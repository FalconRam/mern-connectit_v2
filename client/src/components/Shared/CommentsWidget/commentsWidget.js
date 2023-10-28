import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCommentsWithProfilePicture } from "../../../actions/posts";
import CommentItem from "./commentItem";

const CommentsWidget = ({ post, isModal }) => {
  const { postComments, isPostCommentsLoading } = useSelector(
    (state) => state.posts
  );
  postComments?.comments?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <>
      <div>
        
        {isModal &&
          postComments?.comments?.map((comment, index) => (
            <CommentItem
              post={post}
              comment={comment}
              key={index}
              isModal={isModal}
            />
          ))}
      </div>
    </>
  );
};

export default CommentsWidget;
