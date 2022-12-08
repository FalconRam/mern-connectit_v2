import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

export const followRequest = async (req, res) => {
  const { companionId } = req.params;

  try {
    const currentUser = await User.findById(req.userId); // req.userId fetched from auth middleware
    const companionUser = await User.findById(companionId);

    if (!companionUser.following.includes(req.userId)) {
      currentUser.following.push(companionId);
      companionUser.followers.push(req.userId);

      currentUser.followers.push(companionId);
      companionUser.following.push(req.userId);
      const updatedCurrentUser = await User.findByIdAndUpdate(
        currentUser._id,
        currentUser,
        { new: true }
      );
      const updatedCompanionUser = await User.findByIdAndUpdate(
        companionUser._id,
        companionUser,
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Request Sent",
        data: updatedCurrentUser,
      });
    } else {
      res.status(409).json({ status: false, message: "Already followed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const acceptFriendRequest = async (req, res) => {};

export const unFollowRequest = async (req, res) => {
  const { companionId } = req.params;

  try {
    const currentUser = await User.findById(req.userId);
    const companionUser = await User.findById(companionId);

    // removes companionUser id from following and followers on current user account
    const indexFollowingCurUser = currentUser.following.findIndex(
      (compId) => compId === companionUser._id
    );
    const indexFollowersCurUser = currentUser.followers.findIndex(
      (compId) => compId === companionUser._id
    );

    currentUser.following.splice(indexFollowingCurUser, 1);
    currentUser.followers.splice(indexFollowersCurUser, 1);

    // removes currentUser id from following and followers on companion user account
    const indexFollowingCompUser = companionUser.following.findIndex(
      (curId) => curId === currentUser._id
    );
    const indexFollowersCompUser = companionUser.followers.findIndex(
      (curId) => curId === currentUser._id
    );

    companionUser.following.splice(indexFollowingCompUser, 1);
    companionUser.followers.splice(indexFollowersCompUser, 1);

    const updatedCurrentUser = await User.findByIdAndUpdate(
      currentUser._id,
      currentUser,
      { new: true }
    );

    const updatedCompanionUser = await User.findByIdAndUpdate(
      companionUser._id,
      companionUser,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "UnFriend Success",
      data: updatedCurrentUser,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getFollowersByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { followers } = user;
    res.status(200).json({ status: true, data: { followersIds: followers } });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

export const getFollowingByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { following } = user;
    res.status(200).json({ status: true, data: { followingIds: following } });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
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
      res.status(200).json({ status: true, data: similarCityProfiles });
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
    res.status(500).json({ status: false, error: error.message });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await User.findById(id);
    const post = await PostMessage.find({ creator: profile._id });
    res.status(200).json({
      status: true,
      data: {
        profile: {
          id: profile._id,
          name: profile.name,
          email: profile.email,
          following: profile.following,
          followers: profile.followers,
          createdAt: profile.createdAt,
          city: profile.city,
          country: profile.country,
        },
        post,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};
