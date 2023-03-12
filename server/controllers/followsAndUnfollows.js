import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

export const followRequest = async (req, res) => {
  const { companionId } = req.params;

  try {
    const currentUser = await User.findById(req.userId); // req.userId fetched from auth middleware
    const companionUser = await User.findById(companionId);

    // removes companionUser id on following array of current user account
    if (!currentUser.following.includes(companionId)) {
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

      res.status(200).json({
        success: true,
        message: "Request Sent",
        data: result,
      });
    } else {
      res.status(409).json({ status: false, message: "Already followed" });
    }
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
      res.status(409).json({ status: false, message: "No Friend Exists" });

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

    res.status(200).json({
      status: true,
      message: "UnFriend Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const removeFollowerRequest = async (req, res) => {
  const { companionId } = req.params;

  try {
    const currentUser = await User.findById(req.userId);
    const companionUser = await User.findById(companionId);

    if (!currentUser.followers.includes(companionId))
      res.status(409).json({ status: false, message: "No Follower Exists" });

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

    res.status(200).json({
      status: true,
      message: "Removed Follower",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const acceptFriendRequest = async (req, res) => {};

export const rejectFriendRequest = async (req, res) => {};

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
