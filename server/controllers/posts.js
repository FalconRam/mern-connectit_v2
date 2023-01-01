import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";
import PostMessage from "../models/postMessage.js";

export const getPostsByFollowing = async (req, res) => {
  try {
    // First, retrieve the user object for the given userId
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error(`User not found with id: ${req.userId}`);
    }

    // Retrieve the list of user IDs for the users that the given user is following
    const followedUserIds = user.following;
    followedUserIds.push(user._id);

    // Use the list of followed user IDs to retrieve the post objects
    // made by users by using mongoose db query
    let followedPosts = await PostMessage.aggregate([
      {
        $match: {
          creator: { $in: followedUserIds },
        },
      },
      {
        $addFields: {
          creator: { $toObjectId: "$creator" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $project: {
          title: 1,
          message: 1,
          name: 1,
          creator: 1,
          tags: 1,
          selectedFile: 1,
          likes: 1,
          comments: 1,
          commentsInfo: 1,
          createdAt: 1,
          // Use the $arrayElemAt operator to retrieve the first element in the "userInfo" array
          // (since we expect there to be only one element in the array)
          profilePicture: { $arrayElemAt: ["$userInfo.profilePicture", 0] },
        },
      },
    ]);

    const sortedPosts = followedPosts.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Wait for the loop to finish before sending the response
    res.status(200).json({ status: true, data: sortedPosts });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
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
    res.status(404).json({ status: false, message: error.message });
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
    res.status(404).json({ status: false, message: error.message });
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

    res.status(200).json({ status: true, data: postMessages });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const getPostsById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.userId);

    const post = await PostMessage.findById(id);

    let updatedPostWithprofPic = await PostMessage.aggregate([
      {
        $match: {
          _id: post._id,
        },
      },
      {
        $addFields: {
          creator: user._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $project: {
          title: 1,
          message: 1,
          name: 1,
          creator: 1,
          tags: 1,
          selectedFile: 1,
          likes: 1,
          comments: 1,
          commentsInfo: 1,
          createdAt: 1,
          profilePicture: { $arrayElemAt: ["$userInfo.profilePicture", 0] },
        },
      },
    ]);

    res.status(201).json({ status: true, data: updatedPostWithprofPic[0] });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
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

    res.status(201).json({ status: true, data: newPost });
  } catch (error) {
    res.status(409).json({ status: false, message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const user = await User.findById(req.userId);

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post found");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    let updatedPostWithprofPic = await PostMessage.aggregate([
      {
        $match: {
          _id: updatedPost._id,
        },
      },
      {
        $addFields: {
          creator: user._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $project: {
          title: 1,
          message: 1,
          name: 1,
          creator: 1,
          tags: 1,
          selectedFile: 1,
          likes: 1,
          comments: 1,
          commentsInfo: 1,
          createdAt: 1,
          profilePicture: { $arrayElemAt: ["$userInfo.profilePicture", 0] },
        },
      },
    ]);

    res.status(201).json({ status: true, data: updatedPostWithprofPic[0] });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const addCommentByPost = async (req, res) => {
  const { id } = req.params;
  const { postComment } = req.body;

  try {
    const user = await User.findById(req.userId);
    const post = await PostMessage.findById(id);

    post.commentsInfo.postComment.push(postComment[0]);

    const updatedCommentInfo = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    let updatedPostWithprofPic = await PostMessage.aggregate([
      {
        $match: {
          _id: updatedCommentInfo._id,
        },
      },
      {
        $addFields: {
          creator: user._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $project: {
          title: 1,
          message: 1,
          name: 1,
          creator: 1,
          tags: 1,
          selectedFile: 1,
          likes: 1,
          comments: 1,
          commentsInfo: 1,
          createdAt: 1,
          profilePicture: { $arrayElemAt: ["$userInfo.profilePicture", 0] },
        },
      },
    ]);

    res.status(201).json(updatedPostWithprofPic[0]);
  } catch (error) {
    res.status(409).json({ status: false, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res
        .status(404)
        .json({ status: false, message: "No Post found to Delete" });

    await PostMessage.findByIdAndDelete(_id);
    res.status(200).json({ status: true, message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const user = await User.findById(req.userId);
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
    let updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    let updatedPostWithprofPic = await PostMessage.aggregate([
      {
        $match: {
          _id: updatedPost._id,
        },
      },
      {
        $addFields: {
          creator: user._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $project: {
          title: 1,
          message: 1,
          name: 1,
          creator: 1,
          tags: 1,
          selectedFile: 1,
          likes: 1,
          comments: 1,
          commentsInfo: 1,
          createdAt: 1,
          profilePicture: { $arrayElemAt: ["$userInfo.profilePicture", 0] },
        },
      },
    ]);

    res.status(200).json({ status: true, data: updatedPostWithprofPic[0] });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
