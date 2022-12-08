import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";
import PostMessage from "../models/postMessage.js";

export const getPostsByFollowing = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.userId);
    loggedInUser.following.push(loggedInUser._id);

    const postByfollowing = loggedInUser.following.map(async (id) => {
      let ids = await User.findById(id);
      let creator = ids._id.toString();
      return await PostMessage.find({ creator: creator });
    });

    // With this the call to map returns an array of promises,
    // then Promise.all waits for all the promises to resolve and
    // passes an array of all the results into the callback.
    const matchedPosts = Promise.all(postByfollowing).then(
      (postsByfollowing) => postsByfollowing
    );
    const postsInOneArr = (await matchedPosts).flat();
    const sortedPosts = postsInOneArr.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(200).json({ status: true, data: sortedPosts });
  } catch (error) {
    res.status(400).json({ status: false, errorMessage: error.message });
  }
};

export const postsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    const posts = await PostMessage.find({ creator: user._id.toString() });

    const sortedPosts = posts.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json({ status: true, data: { userPosts: sortedPosts } });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    // number of posts per page (8 post per page)
    const LIMIT = 8;

    // get starting index of every pager.
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");

    const postMessages = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    }); // query have two params, so we use either/or ($or),
    // one is searchQuery and array of tags (is one of the tags in array of tags, equal to our tags )

    if (searchQuery === "none" && tags === "none")
      postMessages = await PostMessage.find();

    res.status(200).json({ data: postMessages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPostsById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post found");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const post = await PostMessage.findById(id);

    // push the comment from FE to the comments schema of the post
    post.comments.push(comment);

    const updatedPostWithCmt = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPostWithCmt);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const addCommentByPost = async (req, res) => {
  const { id } = req.params;
  const { postComment } = req.body;

  try {
    const post = await PostMessage.findById(id);

    post.commentsInfo.postComment.push(postComment[0]);

    const updatedCommentInfo = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedCommentInfo);
  } catch (error) {
    res.status(409).json({ status: "failure", message: error.message });
  }
};
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No Post found to Delete");

    await PostMessage.findByIdAndDelete(_id);
    res.json({ message: "Post Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!req.userId)
      return res.status(400).json({ message: "User not authorized" });

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No Post found");

    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // like the post
      post.likes.push(req.userId);
    } else {
      // dislike the post

      // filter method !== --> returns all the values which not matched/does not return the matched id(value)
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: error });
  }
};
