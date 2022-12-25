import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { likePost, unLikePost } from "../../../../../actions/posts";

import Likes from "./Likes/likes";

import "./postLikeSection.css";

const PostLikeSection = ({ post }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id || user?.result?.googleId;

  const [isLiked, setIsLiked] = useState(false);
  const [isLikeUpdating, setIsLikeUpdating] = useState(false);
  const [likes, setLikes] = useState(post?.post?.likes.length);

  useEffect(() => {
    if (post?.post?.likes.includes(userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post.post.likes, userId]);

  const handleLike = async () => {
    setIsLikeUpdating(true);

    if (isLiked) {
      setIsLiked(false);
      setLikes(likes - 1);
      await dispatch(unLikePost(post?.post?._id));
    } else {
      setIsLiked(true);
      setLikes(likes + 1);
      await dispatch(likePost(post?.post?._id));
    }

    setIsLikeUpdating(false);
  };

  return (
    <>
      <Likes isLiked={isLiked} likes={likes} handleLike={handleLike} />
    </>
  );
};

export default PostLikeSection;
