import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUnSavePost } from "../../../actions/posts";

const PostSave = ({ postId }) => {
  const dispatch = useDispatch();
  const [isPostSaved, setIsPostSaved] = useState(false);
  const handleSave = () => {
    dispatch(saveUnSavePost(postId));
  };
  return (
    <>
      <span onClick={handleSave}>
        {isPostSaved ? (
          <i className="bi bi-bookmark-fill likeIcon" />
        ) : (
          <i className="bi bi-bookmark likeIcon" />
        )}
      </span>
    </>
  );
};

export default PostSave;
