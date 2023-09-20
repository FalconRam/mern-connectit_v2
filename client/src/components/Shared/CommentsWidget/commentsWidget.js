import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCommentsWithProfilePicture } from "../../../actions/posts";
import CommentItem from "./commentItem";

const CommentsWidget = ({ post, isModal }) => {
  const { comments, isPostCommentsLoading } = useSelector(
    (state) => state.posts
  );
  console.log(JSON.stringify(comments));
  console.log(isModal);
  return (
    <>
      {isModal &&
        comments?.comments?.map((comment, index) => {
          <>
            {console.log(comments?.comment)}
            <CommentItem comment={comment} key={index} />
          </>;
        })}
      {/* <CommentItem comment={comment} /> */}
    </>
  );
};

export default CommentsWidget;
