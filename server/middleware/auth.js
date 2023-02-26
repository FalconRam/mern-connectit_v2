import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

// Here middleware is used to validate and authorize the user to do some action. eg : like,comment,delete, etc
// If user Clicks like --> auth middleware --> next() => like controller

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization && !req.body.token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const token =
      req.headers.authorization === undefined
        ? req.body.token
        : req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Token not provided" });
    }

    const isCustomAuth = token.length < 500;

    let decodedData;
    // For CustomAuth
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secretKey);

      req.userId = decodedData.id;
    }
    // Google Oauth2
    else {
      decodedData = jwt.decode(token);

      req.userId = decodedData.sub; // sub - google's id to differentiate the user with it.
    }

    next();
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export default auth;
