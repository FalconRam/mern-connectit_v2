import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import User from "../models/user.js";
import {
  saveUserToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../services/jwtTokenService/jwtTokenService.js";

dotenv.config();

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // If User is Unauthorized one...
    if (!existingUser)
      return res
        .status(400)
        .json({ status: false, message: "Email or Password is incorrect." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ status: false, message: "Email or Password is incorrect." });

    [req.emailId, req.userId] = [existingUser.email, existingUser._id];
    // Generate AccessToken
    const accessToken = await signAccessToken(req);

    // Generate Refresh token
    const refreshToken = await signRefreshToken(req);
    let token;
    try {
      token = await saveUserToken(req.userId.toString(), {
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message || error.stack || error,
      });
    }

    let result = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };

    res.status(200).json({
      status: true,
      data: result,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.messsage || error.stack || error });
  }
};

export const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    city,
    country,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      city,
      country,
    });

    [req.emailId, req.userId] = [result.email, result._id];
    // Generate AccessToken
    const accessToken = await signAccessToken(req);

    // Generate Refresh token
    const refreshToken = await signRefreshToken(req);

    let resultUser = {
      id: result._id,
      name: result.name,
      email: result.email,
    };

    res
      .status(200)
      .json({ status: true, data: resultUser, accessToken, refreshToken });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.messsage || error.stack || error });
  }
};

export const refreshUserController = async (req, res) => {
  const { refreshToken: oldRefreshToken } = req.body;
  try {
    const isRefreshTokenValid = await verifyRefreshToken(req, oldRefreshToken);
    let newAccessToken, newRefreshToken, savedToken;

    if (isRefreshTokenValid) {
      try {
        // Generate a Access Token
        newAccessToken = await signAccessToken(req);

        // Generate a Refresh Token
        newRefreshToken = await signRefreshToken(req);

        // Save the New Access Token & Refresh Token to DB
        savedToken = await saveUserToken(req.userId, {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      } catch (error) {
        return res.status(500).json({
          status: false,
          message: error.messsage || error.stack || error,
        });
      }
    } else
      return res.status(403).json({
        status: false,
        message: "Refresh Token Not Exist",
      });

    return res.status(200).json({
      status: true,
      data: {
        accessToken: savedToken.accessToken,
        refreshToken: savedToken.refreshToken,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: error.messsage || error.stack || error });
  }
};

export const getSearchUsers = async (req, res) => {
  let keyword = req.query.search;
  try {
    if (!keyword || keyword.trim() === "") {
      res.status(200).json({ status: true, message: "No Users", data: [] });
      return;
    }

    const keywordResults = keyword && {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
    };

    const loggedInUser = await User.findById(req.userId);
    const followingIds = loggedInUser.following.map((id) =>
      mongoose.Types.ObjectId(id)
    );

    const users = await User.find({
      $and: [
        { _id: { $in: followingIds } }, // only return users whose _id is in followingIds
        keywordResults, // any additional search criteria you have
      ],
    }).select(
      "-password -following -followers -city -country -bio -profileBgWallPicture -createdAt -__v"
    );

    res.status(200).json({ status: true, data: { users: users } });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.messsage || error.stack || error });
  }
};
