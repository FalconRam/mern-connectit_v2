import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { convertImgToCloudinaryURL } from "../services/HelperFunctions/convertImgToCloudinaryURL.js";

export const followingAndFollowersCount = async (req, res) => {
  const { profileId } = req.query;
  try {
    const user = await User.findById(profileId);
    const [following, followers] = [user.following, user.followers];
    res.status(200).json({
      status: true,
      data: { following: following, followers: followers },
    });
  } catch (error) {
    res.status(404).json({ status: false, data: { message: error.message } });
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
      res.status(200).json({ status: true, data: followingActDetails })
    );
  } catch (error) {
    res.status(404).json({ status: false, data: { message: error.message } });
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
      res.status(200).json({ status: true, data: followerActDetails })
    );
  } catch (error) {
    res.status(404).json({ status: false, data: { message: error.message } });
  }
};

export const userDetails = async (req, res) => {
  const { profileId: id } = req.query;
  try {
    const user = await User.findById(id);
    user.password = undefined;
    if (id === req.userId) {
      res.status(200).json({ status: true, data: { userDetails: user } });
    } else {
      user.password = undefined;
      res.status(200).json({ status: true, data: { userDetails: user } });
    }
  } catch (error) {
    res.status(404).json({ status: false, data: { message: error.message } });
  }
};

export const updateUserDetails = async (req, res) => {
  const userId = req.userId;
  const newUserDetails = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).json({ status: false, message: "User not Found" });

    newUserDetails.name = `${newUserDetails.firstName} ${newUserDetails.lastName}`;

    const updatedUserDetails = await User.findByIdAndUpdate(
      userId,
      newUserDetails,
      {
        new: true,
      }
    );
    updatedUserDetails.password = undefined;
    res
      .status(200)
      .json({ status: true, data: { userDetails: updatedUserDetails } });
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
      return res.status(404).json({ status: false, message: "User not Found" });
    let user = await User.findById(userId);

    let isSame = await bcrypt.compare(oldPassword, user.password);

    if (!isSame)
      return res.status(400).json({
        status: false,
        message: "Password Mismatch",
      });

    if (newPassword !== confirmNewPassword)
      return res.status(400).json({
        status: false,
        message: "New Password Mismatch",
      });

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = newHashedPassword;

    await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    res
      .status(200)
      .json({ status: true, message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateUserProfilePictures = async (req, res) => {
  const userId = req.userId;
  const { bgWallPicture, profilePicture } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).json({ status: false, message: "User not Found" });
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
      res.status(500).json({
        status: false,
        message: profilePicturecloudinaryResponse.reason,
      });
      return;
    }

    if (profileBgWallPicturecloudinaryResponse.status === "rejected") {
      res.status(500).json({
        status: false,
        message: profileBgWallPicturecloudinaryResponse.reason,
      });
      return;
    }

    user.profilePicture = profilePicturecloudinaryResponse.value.secure_url;
    user.profileBgWallPicture =
      profileBgWallPicturecloudinaryResponse.value.secure_url;

    let updatedUserDetails = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    updatedUserDetails.password = undefined;

    res.status(200).json({
      status: true,
      data: {
        message: "BgWall and Profile Pictures Updated",
        userDetails: updatedUserDetails,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: {
        message: "BgWall and Profile Pictures Not Updated",
        errorMessage: error.message,
      },
    });
  }
};
