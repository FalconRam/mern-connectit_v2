import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { convertImgToCloudinaryURL } from "../services/cloudinary/convertImgToCloudinaryURL.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../services/returnResponse/createResponse.js";

export const followingAndFollowersCount = async (req, res) => {
  const { profileId } = req.query;
  try {
    const user = await User.findById(profileId);
    const [following, followers] = [user.following, user.followers];

    return createSuccessResponse(res, 200, {
      following: following,
      followers: followers,
    });
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const followingProfileDetails = async (req, res) => {
  const { profileId } = req.query;
  try {
    const user = await User.findById(profileId);
    const following = user.following;
    const followingActDetail = following.map(async (id) => {
      let user = await User.findById(id);
      user.password = undefined;
      return user;
    });
    Promise.all(followingActDetail).then((followingActDetails) =>
      createSuccessResponse(res, 200, followingActDetails)
    );
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const followersProfileDetails = async (req, res) => {
  const { profileId } = req.query;
  try {
    const user = await User.findById(profileId);
    const followers = user.followers;
    const followerActDetail = followers.map(async (id) => {
      let user = await User.findById(id);
      user.password = undefined;
      return user;
    });
    Promise.all(followerActDetail).then((followerActDetails) =>
      createSuccessResponse(res, 200, followerActDetails)
    );
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const userDetails = async (req, res) => {
  const { profileId: id } = req.query;
  try {
    const user = await User.findById(id);
    user.password = undefined;
    if (id === req.userId) {
      return createSuccessResponse(res, 200, { userDetails: user });
    } else {
      user.password = undefined;
      return createSuccessResponse(res, 200, { userDetails: user });
    }
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const updateUserDetails = async (req, res) => {
  const userId = req.userId;
  const newUserDetails = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return createErrorResponse(res, 404, {}, "User not Found");

    newUserDetails.name = `${newUserDetails.firstName} ${newUserDetails.lastName}`;

    const updatedUserDetails = await User.findByIdAndUpdate(
      userId,
      newUserDetails,
      {
        new: true,
      }
    );
    updatedUserDetails.password = undefined;
    return createSuccessResponse(res, 200, { userDetails: updatedUserDetails });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateUserPassword = async (req, res) => {
  const userId = req.userId;
  const newUpdatePassword = req.body;
  let { oldPassword, newPassword, confirmNewPassword } = newUpdatePassword;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return createErrorResponse(res, 404, {}, "User not Found");
    let user = await User.findById(userId);

    let isSame = await bcrypt.compare(oldPassword, user.password);

    if (!isSame) return createErrorResponse(res, 400, {}, "Password Mismatch");

    if (newPassword !== confirmNewPassword)
      return createErrorResponse(res, 400, {}, "New Password Mismatch");

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = newHashedPassword;

    await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    return createSuccessResponse(res, 200, {}, "Password updated Successfully");
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const updateUserProfilePictures = async (req, res) => {
  const userId = req.userId;
  const { bgWallPicture, profilePicture } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return createErrorResponse(res, 404, {}, "User not Found");
    let user = await User.findById(userId);

    let folderNamePP = "ProfilePicture";
    let folderNameBWP = "BgWallPicture";

    // Promise.allSettled handles error if any one promise is falied
    const [
      profilePicturecloudinaryResponse,
      profileBgWallPicturecloudinaryResponse,
    ] = await Promise.allSettled([
      convertImgToCloudinaryURL(profilePicture, userId, folderNamePP),
      convertImgToCloudinaryURL(bgWallPicture, userId, folderNameBWP),
    ]);

    if (profilePicturecloudinaryResponse.status === "rejected") {
      return createErrorResponse(
        res,
        500,
        {},
        profilePicturecloudinaryResponse.reason
      );
    }

    if (profileBgWallPicturecloudinaryResponse.status === "rejected") {
      return createErrorResponse(
        res,
        500,
        {},
        profilePicturecloudinaryResponse.reason
      );
    }

    user.profilePicture = profilePicturecloudinaryResponse.value.secure_url;
    user.profileBgWallPicture =
      profileBgWallPicturecloudinaryResponse.value.secure_url;

    let updatedUserDetails = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    updatedUserDetails.password = undefined;

    return createSuccessResponse(
      res,
      200,
      { userDetails: updatedUserDetails },
      "BgWall and Profile Pictures Updated"
    );
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      {},
      "BgWall and Profile Pictures Not Updated"
    );
  }
};
