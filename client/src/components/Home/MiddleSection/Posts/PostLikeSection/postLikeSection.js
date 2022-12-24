import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  likeUserPost,
  unLikeUserPost,
} from "../../../../../actions/posts";

import Likes from "./Likes/likes";

import "./postLikeSection.css";

const PostLikeSection = ({ post }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id || user?.result?.googleId;

  const [isLiked, setIsLiked] = useState(false);
  const [isLikeUpdating, setIsLikeUpdating] = useState(false);
  const [likes, setLikes] = useState(post?.post?.likes);

  useEffect(() => {
    if (post?.post?.likes.find((id) => id === userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post.post.likes, userId]);

  // const handleLike = async () => {
  //   console.log("Like");
  //   setIsLikeUpdating(true);
  //   setIsLiked(true);
  //   const newPost = await dispatch(likeUserPost(post?.post, userId));
  //   setIsLikeUpdating(false);
  // };

  // const handleUnLike = async () => {
  //   console.log("Unlike");
  //   setIsLikeUpdating(true);
  //   setIsLiked(false);
  //   const newPost = await dispatch(unLikeUserPost(post?.post, userId));
  //   setIsLikeUpdating(false);
  // };

  const handleLike = async () => {
    setIsLikeUpdating(true);

    if (isLiked) {
      setIsLiked(false);
      await dispatch(likePost(post?.post?._id));
      setLikes(post.post.likes.filter((id) => id !== userId));
    } else {
      setIsLiked(true);
      await dispatch(likePost(post?.post?._id));
      setLikes([...post.post.likes, userId]);
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
