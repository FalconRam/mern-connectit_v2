import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";
import PostMessage, { SavedUserPosts } from "../models/postMessage.js";
import { convertImgToCloudinaryURL } from "../services/cloudinary/convertImgToCloudinaryURL.js";
import { deleteCloudinaryImg } from "../services/cloudinary/deleteCloudinaryImg.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../services/returnResponse/createResponse.js";

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

    const savedPosts = await SavedUserPosts.findOne({ userId: user._id });

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
          isSaved: {
            $in: [{ $toString: "$_id" }, savedPosts.savedPosts],
          },
        },
      },
    ]);

    const sortedPosts = followedPosts.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Wait for the loop to finish before sending the response

    return createSuccessResponse(res, 200, sortedPosts);
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
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

    return createSuccessResponse(res, 200, { userPosts: sortedPosts });
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

// Old version for get all post with pagination
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
    return createErrorResponse(
      res,
      500,
      {},
      error.messsage || error.stack || error
    );
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

    return createSuccessResponse(res, 200, postMessages);
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      {},
      error.messsage || error.stack || error
    );
  }
};

export const getPostsById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.userId);

    const post = await PostMessage.findById(id);

    const savedPosts = await SavedUserPosts.findOne({ userId: user._id });

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
          isSaved: { $in: [{ $toString: "$_id" }, savedPosts.savedPosts] },
        },
      },
    ]);

    return createSuccessResponse(res, 200, updatedPostWithprofPic[0]);
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      {},
      error.messsage || error.stack || error
    );
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.query;
    const post = await PostMessage.findById(postId);

    if (!postId)
      return createErrorResponse(res, 404, {}, "PostId cannot be Empty!");

    if (!post) return createErrorResponse(res, 404, {}, "Post not Found.");

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
    return createSuccessResponse(res, 200, result[0]);
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const getRepliesByComment = async (req, res) => {
  try {
    const { postId, commentId } = req.query;
    const post = await PostMessage.findById(postId);

    if (!postId)
      return createErrorResponse(res, 404, {}, "PostId cannot be Empty!");

    if (!post) return createErrorResponse(res, 404, {}, "Post not Found.");

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

    return createSuccessResponse(res, 200, result[0]);
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
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
      createErrorResponse(res, 500, {}, cloudinaryResponse);
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

    return createSuccessResponse(res, 201, createdPost);
  } catch (error) {
    createErrorResponse(res, 409, {}, error.messsage || error.stack || error);
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const user = await User.findById(req.userId);

    if (!mongoose.Types.ObjectId.isValid(_id))
      return createErrorResponse(res, 404, {}, "Post not Found.");

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

    return createSuccessResponse(res, 201, updatedPostWithprofPic[0]);
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const addCommentByPost = async (req, res) => {
  const { postId } = req.params;
  const { postComment } = req.body;

  try {
    if (!postId || !postComment) {
      return createErrorResponse(res, 400, {}, "All fields are required.");
    }

    const post = await PostMessage.findById(postId);

    if (!post) return createErrorResponse(res, 404, {}, "Post not Found.");

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

    return createSuccessResponse(res, 201, updatedPostWithprofPic[0]);
  } catch (error) {
    createErrorResponse(res, 409, {}, error.messsage || error.stack || error);
  }
};

export const addReplyToComment = async (req, res) => {
  const { postId } = req.params;
  const { commentReply, repliedTo } = req.body;

  try {
    if (!postId || !commentReply || !repliedTo) {
      return createErrorResponse(res, 400, {}, "All fields are required.");
    }

    const post = await PostMessage.findById(postId);

    if (!post) return createErrorResponse(res, 404, {}, "Post not Found.");

    post.commentsInfo.postComment.map((comment) => {
      if (comment._id === repliedTo) {
        comment.replyComments.push(commentReply);
      }
    });

    await PostMessage.findByIdAndUpdate(postId, post, {
      new: true,
    });

    return createSuccessResponse(res, 200, {});
  } catch (error) {
    createErrorResponse(res, 409, {}, error.messsage || error.stack || error);
  }
};

export const addReplyToReply = async (req, res) => {
  const { postId } = req.params;
  const { replyOfReply, repliedTo, commentId } = req.body;

  try {
    if (
      !postId ||
      !replyOfReply.replierId ||
      !replyOfReply.replierName ||
      !replyOfReply.reply ||
      !repliedTo ||
      !commentId
    ) {
      return createErrorResponse(res, 400, {}, "All fields are required.");
    }

    const post = await PostMessage.findById(postId);

    if (!post) return createErrorResponse(res, 404, {}, "Post not Found.");

    post.commentsInfo.postComment.map((comment) => {
      if (comment._id === commentId) {
        comment.replyComments.push(replyOfReply);
      }
    });

    await PostMessage.findByIdAndUpdate(postId, post, {
      new: true,
    });

    return createSuccessResponse(res, 200, {});
  } catch (error) {
    createErrorResponse(res, 409, {}, error.messsage || error.stack || error);
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const user = await User.findById(req.userId);
    if (!user) return createErrorResponse(res, 404, {}, "User not Found.");

    if (!mongoose.Types.ObjectId.isValid(_id))
      return createErrorResponse(res, 404, {}, "Post not Found.");

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

    return createSuccessResponse(res, 200, updatedPostWithprofPic[0]);
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const likeComentReply = async (req, res) => {
  const { postId, commentId, replyId, isComment } = req.query;
  try {
    const user = await User.findById(req.userId);
    if (!user) return createErrorResponse(res, 404, {}, "User not Found.");

    const post = await PostMessage.findById(postId);
    if (!post) return createErrorResponse(res, 404, {}, "Post not Found.");

    if (
      !post.commentsInfo.postComment.map((comment) =>
        comment.commentLikes.includes(commentId)
      )
    )
      return createErrorResponse(res, 404, {}, "Comment not Found.");

    if (isComment === "true") {
      // For comment like and Dislike
      post.commentsInfo.postComment.map((comment) => {
        if (comment._id === commentId) {
          const index = comment.commentLikes.findIndex(
            (id) => id === String(req.userId)
          );
          if (index === -1) {
            // like the Comment
            comment.commentLikes.push(req.userId);
          } else {
            // dislike the Comment
            // filter method !== --> returns all the values which not matched/does not return the matched id(value)
            comment.commentLikes = comment.commentLikes.filter(
              (id) => id !== String(req.userId)
            );
          }
        }
      });
    } else if (isComment === "false") {
      // For comment's Reply like and Dislike
      post.commentsInfo.postComment.map((comment) => {
        if (comment._id === commentId) {
          comment.replyComments.map((replyComment) => {
            // if (!replyComment.replyLikes.includes(replyId))
            //   return res
            //     .status(404)
            //     .json({ status: false, message: "No Reply Found" });
            if (replyComment._id === replyId) {
              const index = replyComment.replyLikes.findIndex(
                (id) => id === String(req.userId)
              );
              if (index === -1) {
                // If the user's ID is not in the replyLikes array, add it to like the comment.
                replyComment.replyLikes.push(req.userId);
              } else {
                // dislike the Comment
                // filter method !== --> returns all the values which not matched/does not return the matched id(value)
                replyComment.replyLikes = replyComment.replyLikes.filter(
                  (id) => id !== String(req.userId)
                );
              }
            }
          });
        }
      });
    }

    let updatedPost = await PostMessage.findByIdAndUpdate(post._id, post, {
      new: true,
    });

    return createSuccessResponse(res, 200, updatedPost);
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      {},
      error.messsage || error.stack || error
    );
  }
};

export const savePost = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return createErrorResponse(res, 404, {}, "User not Found.");

    const { postId } = req.query;
    const post = await PostMessage.findById(postId);
    if (!post) return createErrorResponse(res, 404, {}, "Post not Found.");

    const existingSaved = await SavedUserPosts.findOne({ userId: req.userId });
    if (!existingSaved) {
      const newSavedPost = new SavedUserPosts({
        userId: req.userId,
        savedPosts: [].push(postId),
      });
      await newSavedPost.save();
      return createSuccessResponse(res, 200, { isSaved: true }, "Post Saved");
    }
    let updatedSaved;
    if (existingSaved.savedPosts.includes(postId)) {
      existingSaved.savedPosts = existingSaved.savedPosts.filter(
        (id) => postId !== id
      );
      updatedSaved = await SavedUserPosts.findByIdAndUpdate(
        existingSaved._id,
        existingSaved,
        {
          new: true,
        }
      );
    } else {
      existingSaved.savedPosts.push(postId);
      updatedSaved = await SavedUserPosts.findByIdAndUpdate(
        existingSaved._id,
        existingSaved,
        {
          new: true,
        }
      );
    }

    return createSuccessResponse(
      res,
      200,
      { isSaved: true, updatedSaved },
      "Post Saved"
    );
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      {},
      error.messsage || error.stack || error
    );
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return createErrorResponse(res, 404, {}, "Post not Found.");
    let folderName = "Posts";
    const result = await deleteCloudinaryImg(_id, folderName);

    if (result.result === "ok") {
      await PostMessage.findByIdAndDelete(_id);
      return createSuccessResponse(res, 200, {}, "Post Deleted");
    }

    if (result.result === "not found") {
      return createErrorResponse(res, 400, {}, "Image not Found");
    } else {
      return createErrorResponse(
        res,
        500,
        { errorMessage: error.messsage || error.stack || error },
        "Error occured at Cloudinary to delete Asset"
      );
    }
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const deleteComment = async (req, res) => {
  const { commentId, postId } = req.query;
  try {
    if (!commentId || !postId)
      return createErrorResponse(res, 400, {}, "All fields are required.");

    let post = await PostMessage.findById(postId);
    if (!post) return createErrorResponse(res, 404, {}, "Post not Found.");

    // Filtering out the comment from postComment array
    let filteredComment = post.commentsInfo.postComment.filter(
      (comment) => comment._id !== commentId
    );
    // Updating the post with the filtered comments in DB
    const updatedPost = await PostMessage.findByIdAndUpdate(
      postId,
      {
        $set: { "commentsInfo.postComment": filteredComment },
      },
      { new: true }
    );

    // Direct remove comments in post doc
    // post.commentsInfo.postComment = post.commentsInfo.postComment.filter(
    //   (comment) => comment._id !== commentId
    // );

    return createSuccessResponse(res, 200, {}, "Comment Deleted");
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const deleteReply = async (req, res) => {
  const { replyId, commentId, postId } = req.query;
  try {
    if (!replyId || !commentId || !postId)
      return createErrorResponse(res, 400, {}, "All fields are required.");

    let post = await PostMessage.findById(postId);
    if (!post) return createErrorResponse(res, 404, {}, "Post not Found.");

    // Filtering out the Reply from comment's  postComment array
    let filteredReplyOnCommentArr = post.commentsInfo.postComment.map(
      (comment) => {
        if (comment._id === commentId) {
          comment.replyComments = comment.replyComments.filter(
            (replyComment) => replyComment._id !== replyId
          );
        }

        return comment;
      }
    );

    // Updating the post with the filtered Replies on Comments in DB
    const updatedPost = await PostMessage.findByIdAndUpdate(
      postId,
      {
        $set: { "commentsInfo.postComment": filteredReplyOnCommentArr },
      },
      { new: true }
    );

    return createSuccessResponse(res, 200, {}, "Reply Deleted");
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};
