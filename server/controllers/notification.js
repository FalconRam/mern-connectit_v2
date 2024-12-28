import Notification from "../models/notification.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../services/returnResponse/createResponse.js";

export const notificationCountController = async (req, res) => {
  try {
    const notificationCount = await Notification.countDocuments({
      userId: req.userId,
      isRead: false,
    });
    return createSuccessResponse(res, 200, { notificationCount }, "");
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      {},
      error.messsage || error.stack || error
    );
  }
};

export const notificationListController = async (req, res) => {
  try {
    const { include_count, skip, limit } = req.query;
    const response = {};
    const query = {
      userId: req.userId,
    };

    response.notifications = await Notification.find(query)
      .skip(skip || 0)
      .limit(limit || 3)
      .sort({ createdAt: -1 });

    if (req.query.include_count === "true")
      response.count = await Notification.countDocuments(query);

    return createSuccessResponse(res, 200, response, "");
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      {},
      error.messsage || error.stack || error
    );
  }
};

export const notificationReadUpdateController = async (req, res) => {
  try {
    const { notificationId, type, isAccepted } = req.body;
    // console.log({ notificationId, type, isAccepted });
    const notifiResp = await Notification.findById(notificationId);

    const updateFields = { isRead: true };

    switch (type) {
      case "request":
        // console.log("Request");
        if (isAccepted) updateFields["metaData.requestBy.isAccepted"] = true;
        else if (isAccepted === false)
          updateFields["metaData.requestBy.isAccepted"] = false;
        break;
      case "message":
        break;
      default:
        // console.log("Default");

        throw new Error("No Notification type provided");
    }
    // console.log(updateFields);
    const notifiUpdateResp = await Notification.findByIdAndUpdate(
      notificationId,
      updateFields,
      { new: true }
    );
    return createSuccessResponse(res, 200, { notifiUpdateResp }, "");
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      {},
      error.messsage || error.stack || error
    );
  }
};
