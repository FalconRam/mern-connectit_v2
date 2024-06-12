import Notification from "../../models/notification.js";
import User from "../../models/user.js";

export const createNotificationService = async (type, data) => {
  try {
    if (type === "request") {
      const { userId, userEmail, userName, profilePicture } =
        data.notificationCreatedBy;
      const { userId: notfiUserId } = data.notificationTo;
      const notificationToUser = await User.findById(notfiUserId);
      let payload = {
        // NotificationTo
        userId: notificationToUser._id,
        userEmail: notificationToUser.email,
        type,
        // Notification CreatedBy / Request sent by
        metaData: {
          requestBy: {
            userId,
            userName,
            email: userEmail,
            profilePicture,
          },
        },
        message: `${userName} Sent you Friend Request`,
        actionURL: encodeURIComponent(`/profile/details?profileId=${userId}`),
      };

      const newNotification = await Notification.create(payload);
      await newNotification.save();
    }
    return;
  } catch (error) {
    console.log(`Notification Creation Error: ${error}`);
  }
};
