import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { likePost, unLikePost } from "../../../../../actions/posts";

import Likes from "../../../../Shared/Likes/likes";

import "./postLikeSection.css";

const PostLikeSection = ({ post }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.id || user?.googleId;

  const [isLiked, setIsLiked] = useState(false);
  const [isLikeUpdating, setIsLikeUpdating] = useState(false);
  const [likes, setLikes] = useState(post?.likes?.length);

  useEffect(() => {
    setLikes(post?.likes?.length);
  }, [post]);

  useEffect(() => {
    if (post?.likes?.includes(userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post?.likes, userId]);

  const handlePostLike = () => {
    setIsLikeUpdating(true);

    if (isLiked) {
      setIsLiked(false);
      setLikes((currentLikeCount) => currentLikeCount - 1);
      dispatch(unLikePost(post?._id));
    } else {
      setIsLiked(true);
      setLikes((currentLikeCount) => currentLikeCount + 1);
      dispatch(likePost(post?._id));
    }

    setIsLikeUpdating(false);
  };

  return (
    <>
      <Likes isLiked={isLiked} likes={likes} likeFrom={"postCard"} handlePostLike={handlePostLike} />
    </>
  );
};

export default PostLikeSection;
