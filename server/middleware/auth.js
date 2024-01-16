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
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const isCustomAuth = token.length < 500;

    let decodedData;
    // For CustomAuth
    if (token && isCustomAuth) {
      // Validates, if the Active/Expired token sent from client
      // If verify fails, throw 403
      try {
        decodedData = jwt.verify(
          token,
          process.env.AUTH_ACCESS_TOKEN_SECRET_KEY
        );
        [req.userId, req.emailId] = [decodedData.id, decodedData.email];
      } catch (error) {
        if (req.url === "/refresh-session") {
          decodedData = jwt.decode(token);
          [req.userId, req.emailId] = [decodedData.id, decodedData.email];
          next();
          return;
        } else
          return res.status(403).json({
            status: false,
            message: "Forbidden Access",
          }); // Only on Auth Middleware we should throw 403, to initiate refresh token on client
      }
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
