import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import User, { PasswordLink } from "../models/user.js";
import {
  saveUserToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../services/jwtTokenService/jwtTokenService.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../services/returnResponse/createResponse.js";
import { nanoid } from "nanoid";
import { sendResetEmail } from "../services/emailService/index.js";
import { analysticsLogger } from "../services/analystics-logger/index.js";

dotenv.config();

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    // If User is Unauthorized one...
    if (!existingUser)
      return createErrorResponse(
        res,
        400,
        {},
        "Email or Password is incorrect."
      );

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return createErrorResponse(
        res,
        400,
        {},
        "Email or Password is incorrect."
      );

    [req.emailId, req.userId] = [existingUser.email, existingUser._id];
    const sessionId = await analysticsLogger(req, false);

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
      return createErrorResponse(
        res,
        500,
        {},
        error.messsage || error.stack || error
      );
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
      sessionId,
    });
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    await analysticsLogger(req, true);
    createSuccessResponse(res, 200, {});
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
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
      return createErrorResponse(res, 400, {}, "User already exists.");

    if (password !== confirmPassword)
      return createErrorResponse(res, 400, {}, "Password doesn't match.");

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
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const initiateResetPassword = async (req, res) => {
  try {
    if (!req.body.email)
      return createErrorResponse(res, 400, {}, "Email is Required");

    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser)
      return createErrorResponse(res, 404, {}, "User not found");

    const resetId = nanoid(20);
    let baseURL = req.headers.origin;
    let resetLink = `${baseURL}/reset-password?resetId=${resetId}`;

    const result = await PasswordLink.create({
      email: existingUser.email,
      resetId,
      resetLink,
    });

    await sendResetEmail({
      email: existingUser.email,
      userName: existingUser.name,
      resetId,
      resetLink,
      baseURL,
    });

    return createSuccessResponse(
      res,
      200,
      { email: existingUser.email },
      "Reset Link Sent"
    );
  } catch (error) {
    return createErrorResponse(res, 500, {}, "Failed on Creating Reset link");
  }
};

export const validateResetLink = async (req, res) => {
  try {
    const { resetId } = req.query;
    if (!resetId)
      return createErrorResponse(res, 400, { valid: false }, "Invalid Link");

    const isValid = await PasswordLink.findOne({ resetId });
    if (!isValid)
      return createErrorResponse(res, 200, { valid: false }, "Invalid Link");

    if (isValid)
      return createSuccessResponse(
        res,
        200,
        { resetId, valid: true },
        "Success"
      );
    return createErrorResponse(res, 500, { valid: false }, "Invalid Link");
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      { valid: false },
      "Error Occured While validating"
    );
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, resetId } = req.body;
    if (!newPassword || !confirmPassword || !resetId)
      return createErrorResponse(
        res,
        400,
        { valid: false },
        "All the fields are Required"
      );

    const resetLinkDetails = await PasswordLink.findOne({ resetId });
    if (!resetLinkDetails)
      return createErrorResponse(res, 404, { valid: false }, "Invalid Link");

    const { email } = resetLinkDetails;
    let userDetails = await User.findOne({ email });

    if (!userDetails)
      return createErrorResponse(res, 404, { valid: false }, "Invalid User");
    if (newPassword !== confirmPassword)
      return createErrorResponse(res, 400, {}, "Password doesn't match.");

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const { _id } = userDetails;

    userDetails.password = hashedPassword;

    await User.findByIdAndUpdate(_id, userDetails, {
      new: true,
    });

    await PasswordLink.findByIdAndDelete(resetLinkDetails._id);

    return createSuccessResponse(res, 200, {}, "Password Reset Success");
  } catch (error) {
    return createErrorResponse(res, 500, {}, "Error Occured While reset");
  }
};

export const reportPassword = async (req, res) => {
  try {
    const { resetId } = req.body;
    if (!resetId)
      return createErrorResponse(
        res,
        400,
        { valid: false },
        "Reset link are Required"
      );

    const resetLinkDetails = await PasswordLink.findOne({ resetId });
    if (!resetLinkDetails)
      return createErrorResponse(res, 404, { valid: false }, "Invalid Link");

    await PasswordLink.findByIdAndDelete(resetLinkDetails._id);

    return createSuccessResponse(res, 200, {}, "Report Success");
  } catch (error) {
    return createErrorResponse(res, 500, {}, "Error Occured While reporting");
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
        return createErrorResponse(
          res,
          500,
          {},
          error.messsage || error.stack || error
        );
      }
    } else return createErrorResponse(res, 403, {}, "Refresh Token Not Exist");

    return createSuccessResponse(
      res,
      200,
      {
        accessToken: savedToken.accessToken,
        refreshToken: savedToken.refreshToken,
      },
      "Token refreshed successfully"
    );
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const getSearchUsers = async (req, res) => {
  let keyword = req.query.search;
  try {
    if (!keyword || keyword.trim() === "") {
      return createSuccessResponse(res, 200, { users: [] }, "No Users");
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

    createSuccessResponse(res, 200, { users });
  } catch (error) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};
