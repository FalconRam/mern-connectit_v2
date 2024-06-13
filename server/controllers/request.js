import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";
import { createNotificationService } from "../services/Notification/index.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../services/returnResponse/createResponse.js";

export const followRequest = async (req, res) => {
  const { companionId } = req.params;

  try {
    const currentUser = await User.findById(req.userId); // req.userId fetched from auth middleware
    const companionUser = await User.findById(companionId);

    if (currentUser.following.includes(companionId))
      return createSuccessResponse(
        res,
        200,
        { isFollowed: true, isAlreadyFollowed: true },
        "Already followed"
      );

    // Flow to follow
    currentUser.following.push(companionId);

    const updatedCurrentUser = await User.findByIdAndUpdate(
      currentUser._id,
      currentUser,
      { new: true }
    );

    let result = {
      id: updatedCurrentUser._id,
      name: updatedCurrentUser.name,
      following: updatedCurrentUser.following,
    };

    createNotificationService("request", {
      notificationCreatedBy: {
        userId: req.userId,
        userEmail: req.emailId,
        name: result.name,
        profilePicture: updatedCurrentUser.profilePicture,
      },
      notificationTo: { userId: companionId },
    });
    return createSuccessResponse(
      res,
      200,
      { ...result, isFollowed: true, isAlreadyFollowed: false },
      "Request Sent"
    );
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const unFollowRequest = async (req, res) => {
  const { companionId } = req.params;

  try {
    const currentUser = await User.findById(req.userId);
    const companionUser = await User.findById(companionId);

    if (!currentUser.following.includes(companionId))
      return createErrorResponse(res, 409, {}, "No Friend Exists");

    // removes companionUser id from following on current user account
    const index = currentUser.following.indexOf(companionUser._id);
    if (index !== -1) {
      currentUser.following.splice(index, 1);
    }

    const updatedCurrentUser = await User.findByIdAndUpdate(
      currentUser._id,
      currentUser,
      { new: true }
    );

    let result = {
      id: updatedCurrentUser._id,
      name: updatedCurrentUser.name,
      following: updatedCurrentUser.following,
    };
    return createSuccessResponse(
      res,
      200,
      { ...result, isUnFollowed: true },
      ""
    );
  } catch (error) {
    return createErrorResponse(res, 500, {}, error.message);
  }
};

export const removeFollowerRequest = async (req, res) => {
  const { companionId } = req.params;

  try {
    const currentUser = await User.findById(req.userId);
    const companionUser = await User.findById(companionId);

    if (!currentUser.followers.includes(companionId))
      return createErrorResponse(res, 409, {}, "No Follower Exists");

    // removes companionUser id from following on current user account
    const index = currentUser.followers.indexOf(companionUser._id);
    if (index !== -1) {
      currentUser.followers.splice(index, 1);
    }

    const updatedCurrentUser = await User.findByIdAndUpdate(
      currentUser._id,
      currentUser,
      { new: true }
    );

    let result = {
      id: updatedCurrentUser._id,
      name: updatedCurrentUser.name,
      followers: updatedCurrentUser.followers,
    };

    return createSuccessResponse(
      res,
      200,
      { ...result, isUnFollowed: true },
      "Removed Follower"
    );
  } catch (error) {
    return createErrorResponse(res, 500, {}, error.message);
  }
};

export const acceptFriendRequest = async (req, res) => {};

export const rejectFriendRequest = async (req, res) => {};

export const getFollowersByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { followers: followersIds } = user;
    return createSuccessResponse(res, 200, followersIds, "");
  } catch (error) {
    return createErrorResponse(res, 500, {}, error.message);
  }
};

export const getFollowingByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { following: followingIds } = user;
    return createSuccessResponse(res, 200, followingIds, "");
  } catch (error) {
    return createErrorResponse(res, 500, {}, error.message);
  }
};

export const suggestPeoples = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { city } = user;
    const similarProfiles = await User.find({ city: city });
    // const indexUserProfile = similarCityProfiles.findIndex((id) =>
    //    id._id.toString() === user._id.toString());
    // similarCityProfiles.splice(indexUserProfile, 1);
    const similarCityProfiles = similarProfiles.filter(
      (ids) => ids._id.toString() !== user._id.toString()
    );
    const similarCityProfile = similarCityProfiles.map((city) => city);
    Promise.all(similarCityProfile).then((similarCityProfiles) => {
      return createSuccessResponse(res, 200, similarCityProfiles, "");
    });
    //   res.status(201).json({
    //     status: true,
    //     data: {
    //       suggestedProfiles: {
    //         id: similarCityProfiles._id,
    //         userName: similarCityProfiles.name,
    //         city: similarCityProfiles.city,
    //         country: similarCityProfiles.country,
    //       },
    //     },
    //   })
    // );
  } catch (error) {
    return createErrorResponse(res, 500, {}, error.message);
  }
};

export const getProfile = async (req, res) => {
  const { profileId } = req.query;
  try {
    const profilePromise = User.findById(profileId).select("-__v -password");
    const postPromise = PostMessage.find({ creator: profileId });
    const [profile, post] = await Promise.all([profilePromise, postPromise]);
    return createSuccessResponse(
      res,
      200,
      {
        profile,
        post,
      },
      ""
    );
  } catch (error) {
    return createErrorResponse(res, 500, {}, error.message);
  }
};
