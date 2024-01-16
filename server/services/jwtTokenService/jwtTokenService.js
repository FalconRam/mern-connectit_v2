import jwt from "jsonwebtoken";
import { Token } from "../../models/token.js";
import User from "../../models/user.js";

export const signAccessToken = async (req) => {
  try {
    const accessToken = await jwt.sign(
      { email: req.emailId, id: req.userId },
      process.env.AUTH_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY } // 1hr
    );
    return accessToken;
  } catch (error) {
    return error.messsage || error.stack || error;
  }
};

export const signRefreshToken = async (req) => {
  try {
    const refreshToken = await jwt.sign(
      { email: req.emailId, id: req.userId },
      process.env.AUTH_REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRY } // 1d
    );
    return refreshToken;
  } catch (error) {
    return error.messsage || error.stack || error;
  }
};

export const verifyRefreshToken = async (req, refreshToken) => {
  try {
    let refreshTokenData;
    try {
      refreshTokenData = await jwt.verify(
        refreshToken,
        process.env.AUTH_REFRESH_TOKEN_SECRET_KEY
      );
    } catch (error) {
      return false;
    }

    // Check if User Id is matching, from expired access token verified userId
    //  with refresh token verified id
    if (req.userId !== refreshTokenData.id) return false;

    // Check if data is not undefined
    if (
      !refreshTokenData ||
      refreshTokenData === undefined ||
      refreshTokenData === null
    )
      return false;

    // Check Token exists for UserId && refreshToken
    let token;
    try {
      token = await Token.find({
        userId: { $eq: refreshTokenData.id },
        refreshToken: { $eq: refreshToken },
      });
    } catch (error) {
      return false;
    }
    if (token.length === 0) return false;

    // Check User exists for UserId
    const user = await User.findById(refreshTokenData.id);
    if (!user) return false;

    return true;
  } catch (error) {
    return error.messsage || error.stack || error;
  }
};

export const saveUserToken = async (...userToken) => {
  // ...userToken: [] => [userId,{accessToken, refreshToken}]
  try {
    const savedToken = await Token.create({
      userId: userToken[0],
      accessToken: userToken[1].accessToken,
      refreshToken: userToken[1].refreshToken,
    });
    return savedToken;
  } catch (error) {
    return error.messsage || error.stack || error;
  }
};
