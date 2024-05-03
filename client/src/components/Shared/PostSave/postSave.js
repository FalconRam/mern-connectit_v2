import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUnSavePost } from "../../../actions/posts";

const PostSave = ({ post }) => {
  const dispatch = useDispatch();
  const [sentSaved, setSentSaved] = useState(post.isSaved);

  const handleSave = async () => {
    // Send sentSaved opposite to current bool state for save/unsave based on Current State
    // eg: native State post.isSaved = true, then sentSaved will sent as false
    // This is only for redux disptach type
    const status = await dispatch(saveUnSavePost(post?._id, !sentSaved));
    // Will receive status as boolean from BE,
    // if post saved status -> true,
    // if post unsaved status -> false
    // true ? setSentSaved(false) : setSentSaved(true);
    status ? setSentSaved(true) : setSentSaved(false);
  };

  return (
    <span onClick={handleSave}>
      {sentSaved ? (
        <i className="bi bi-bookmark-fill likeIcon" />
      ) : (
        <i className="bi bi-bookmark likeIcon" />
      )}
    </span>
  );
};

export default PostSave;
