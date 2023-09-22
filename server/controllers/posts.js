import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";
import PostMessage from "../models/postMessage.js";
import { convertImgToCloudinaryURL } from "../services/HelperFunctions/convertImgToCloudinaryURL.js";
import { deleteCloudinaryImg } from "../services/HelperFunctions/deleteCloudinaryImg.js";

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
          creatorBio: { $arrayElemAt: ["$userInfo.bio", 0] },
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
          creator: { $toObjectId: post.creator },
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
          creatorBio: { $arrayElemAt: ["$userInfo.bio", 0] },
        },
      },
    ]);

    res.status(201).json({ status: true, data: updatedPostWithprofPic[0] });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.query;
    const post = await PostMessage.findById(postId);

    if (!postId)
      return res
        .status(400)
        .json({ status: false, message: "PostId cannot be Empty!" });
    if (!post)
      return res.status(404).json({ status: false, message: "No Post found" });

    const result = await PostMessage.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(postId),
        },
      },
      {
        $unwind: "$commentsInfo.postComment",
      },
      {
        $addFields: {
          commenterId: {
            $toObjectId: "$commentsInfo.postComment.commenterId",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "commenterId",
          foreignField: "_id",
          as: "commenterInfo",
        },
      },
      {
        $group: {
          _id: "$_id",
          comments: {
            $push: {
              _id: "$commentsInfo.postComment._id",
              commenterId: "$commentsInfo.postComment.commenterId",
              commenterName: "$commentsInfo.postComment.commenterName",
              comment: "$commentsInfo.postComment.comment",
              commentLikes: "$commentsInfo.postComment.commentLikes",
              replyComments: "$commentsInfo.postComment.replyComments",
              profilePicture: {
                $arrayElemAt: ["$commenterInfo.profilePicture", 0],
              },
              createdAt: "$commentsInfo.postComment.createdAt",
            },
          },
        },
      },
    ]);

    res.status(200).json({ status: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getRepliesByComment = async (req, res) => {
  try {
    const { postId, commentId } = req.query;
    const post = await PostMessage.findById(postId);

    if (!postId)
      return res
        .status(400)
        .json({ status: false, message: "PostId cannot be Empty!" });
    if (!post)
      return res.status(404).json({ status: false, message: "No Post found" });

    // const result = await PostMessage.aggregate([
    //   {
    //     $match: {
    //       _id: mongoose.Types.ObjectId(postId),
    //       "commentsInfo.postComment._id": commentId,
    //     },
    //   },
    //   {
    //     $unwind: "$commentsInfo.postComment.replyComments",
    //   },
    //   {
    //     $match: {
    //       "commentsInfo.postComment.replyComments._id": commentId,
    //     },
    //   },
    //   {
    //     $addFields: {
    //       replierId: {
    //         $toObjectId: "$commentsInfo.postComment.replyComments.replierId",
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "replierId",
    //       foreignField: "_id",
    //       as: "replierInfo",
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       replies: {
    //         $push: {
    //           _id: "$commentsInfo.postComment.replyComments._id",
    //           replierId: "$commentsInfo.postComment.replyComments.replierId",
    //           replierName:
    //             "$commentsInfo.postComment.replyComments.replierName",
    //           reply: "$commentsInfo.postComment.replyComments.reply",
    //           replyComments: "$commentsInfo.postComment.replyComments",
    //           profilePicture: {
    //             $arrayElemAt: ["$replierInfo.profilePicture", 0],
    //           },
    //           createdAt: "$commentsInfo.postComment.replyComments.createdAt",
    //         },
    //       },
    //     },
    //   },
    // ]);

    const result = await PostMessage.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(postId),
        },
      },
      {
        $unwind: "$commentsInfo.postComment",
      },
      {
        $match: {
          "commentsInfo.postComment._id": commentId,
        },
      },
      {
        $unwind: "$commentsInfo.postComment.replyComments",
      },
      {
        $addFields: {
          replierId: {
            $toObjectId: "$commentsInfo.postComment.replyComments.replierId",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "replierId",
          foreignField: "_id",
          as: "replierInfo",
        },
      },
      {
        $group: {
          _id: "$commentsInfo.postComment._id",
          replyComments: {
            $push: {
              _id: "$commentsInfo.postComment.replyComments._id",
              replierId: "$commentsInfo.postComment.replyComments.replierId",
              replierName:
                "$commentsInfo.postComment.replyComments.replierName",
              reply: "$commentsInfo.postComment.replyComments.reply",
              replyComments:
                "$commentsInfo.postComment.replyComments.replyComments",
              replyLikes: "$commentsInfo.postComment.replyComments.replyLikes",
              profilePicture: {
                $arrayElemAt: ["$replierInfo.profilePicture", 0],
              },
              createdAt: "$commentsInfo.postComment.replyComments.createdAt",
            },
          },
        },
      },
    ]);

    res.status(200).json({ status: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, message, tags, selectedFile, name } = req.body;
  const newPost = new PostMessage({
    title,
    message,
    tags,
    name,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    let createdPost = await newPost.save();

    // Convert the Base64 Image to Cloudinary Image URL(Image uploaded in Cloudinary account)
    let folderName = "Posts";
    const cloudinaryResponse = await convertImgToCloudinaryURL(
      selectedFile,
      createdPost._id,
      folderName
    );

    // Delete the created Post and send faliure response, if the cloudinary Image upload fails
    if (!cloudinaryResponse.secure_url) {
      await PostMessage.findByIdAndDelete(createdPost._id);
      res.status(500).json({ status: false, message: cloudinaryResponse });
      return;
    }

    // append the Post's selectedFile as Cloudinary Image URL in createdPost object
    createdPost.selectedFile = cloudinaryResponse.secure_url;

    // update the Post's selectedFile as Cloudinary Image URL
    createdPost = await PostMessage.findByIdAndUpdate(
      createdPost._id,
      createdPost,
      {
        new: true,
      }
    );

    res.status(201).json({ status: true, data: createdPost });
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
          creatorBio: { $arrayElemAt: ["$userInfo.bio", 0] },
        },
      },
    ]);

    res.status(201).json({ status: true, data: updatedPostWithprofPic[0] });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const addCommentByPost = async (req, res) => {
  const { postId } = req.params;
  const { postComment } = req.body;

  try {
    if (!postId || !postComment) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
    }

    const post = await PostMessage.findById(postId);

    if (!post)
      return res
        .status(404)
        .json({ status: false, message: "Post not Found." });

    post.commentsInfo.postComment.push(postComment[0]);

    const updatedCommentInfo = await PostMessage.findByIdAndUpdate(
      postId,
      post,
      {
        new: true,
      }
    );

    let updatedPostWithprofPic = await PostMessage.aggregate([
      {
        $match: {
          _id: updatedCommentInfo._id,
        },
      },
      {
        $addFields: {
          creator: { $toObjectId: updatedCommentInfo.creator },
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
          creatorBio: { $arrayElemAt: ["$userInfo.bio", 0] },
        },
      },
    ]);

    res.status(201).json({ status: true, data: updatedPostWithprofPic[0] });
  } catch (error) {
    res.status(409).json({ status: false, message: error.message });
  }
};

export const addReplyToComment = async (req, res) => {
  const { postId } = req.params;
  const { commentReply, repliedTo } = req.body;

  try {
    if (!postId || !commentReply || !repliedTo) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
    }

    const post = await PostMessage.findById(postId);

    if (!post)
      return res
        .status(404)
        .json({ status: false, message: "Post not Found." });

    post.commentsInfo.postComment.map((comment) => {
      if (comment._id === repliedTo) {
        comment.replyComments.push(commentReply);
      }
    });

    await PostMessage.findByIdAndUpdate(postId, post, {
      new: true,
    });

    res.status(200).json({ status: true });
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
    let folderName = "Posts";
    const result = await deleteCloudinaryImg(_id, folderName);

    if (result.result === "ok") {
      await PostMessage.findByIdAndDelete(_id);
      res.status(200).json({ status: true, message: "Post Deleted" });
      return;
    }

    if (result.result === "not found") {
      res.status(400).json({
        status: true,
        message: "No Asset found to Delete in Cloudinary",
      });
      return;
    } else {
      res.status(500).json({
        status: true,
        message: "Error occured at Cloudinary to delete Asset",
      });
    }
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
          creator: { $toObjectId: updatedPost.creator },
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
          creatorBio: { $arrayElemAt: ["$userInfo.bio", 0] },
        },
      },
    ]);

    res.status(200).json({ status: true, data: updatedPostWithprofPic[0] });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
