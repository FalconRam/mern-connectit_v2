import mongoose from "mongoose";
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
    const notifications = await Notification.find({
      userId: req.userId,
    });
    return createSuccessResponse(res, 200, notifications, "");
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
  } catch (error) {
    return createErrorResponse(
      res,
      500,
      {},
      "Something went wrong",
      error.messsage || error.stack || error
    );
  }
};
