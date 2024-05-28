import Logger from "../../models/logger.js";

// Intentioanlly made it as Syncronous, since this operation should not block the thread
export const analysticsLogger = async (req, isUpdate) => {
  try {
    if (isUpdate) {
      let sessionDetails = await Logger.findById(req.body.sessionId);
      const logoutTime = new Date();
      sessionDetails.logoutAt = logoutTime;

      sessionDetails.sessionDuration =
        new Date(logoutTime) - new Date(sessionDetails.createdAt); // Stores in MilliSeconds

      await Logger.findByIdAndUpdate(req.body.sessionId, sessionDetails, {
        new: true,
      });
      return;
    } else {
      let userSession = {};
      userSession.ip =
        req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || "";
      userSession.platform = req.headers["sec-ch-ua-platform"] || "";
      userSession.userAgent = req.headers["user-agent"] || "";
      userSession.browser = req.headers["sec-ch-ua"] || "";

      const session = await Logger.create({
        email: req.emailId,
        userId: req.userId,
        userSession,
      });
      return session._id;
    }
  } catch (error) {
    console.log(error.message || error.stack || error);
    return !isUpdate && "";
  }
};
