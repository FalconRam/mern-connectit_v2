import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";

export const followingAndFollowersCount = async (req, res) => {
  const { profileId } = req.query;
  try {
    const user = await User.findById(profileId);
    const [following, followers] = [user.following, user.followers];
    res.status(200).json({
      status: true,
      data: { following: following, followers: followers },
    });
  } catch (error) {
    res.status(404).json({ status: false, data: { message: error.message } });
  }
};

export const followingProfileDetails = async (req, res) => {
  const { profileId } = req.query;
  try {
    const user = await User.findById(profileId);
    const following = user.following;
    const followingActDetail = following.map(async (id) => {
      let user = await User.findById(id);
      user.password = undefined;
      return user;
    });
    Promise.all(followingActDetail).then((followingActDetails) =>
      res.status(200).json({ status: true, data: followingActDetails })
    );
  } catch (error) {
    res.status(404).json({ status: false, data: { message: error.message } });
  }
};

export const followersProfileDetails = async (req, res) => {
  const { profileId } = req.query;
  try {
    const user = await User.findById(profileId);
    const followers = user.followers;
    const followerActDetail = followers.map(async (id) => {
      let user = await User.findById(id);
      user.password = undefined;
      return user;
    });
    Promise.all(followerActDetail).then((followerActDetails) =>
      res.status(200).json({ status: true, data: followerActDetails })
    );
  } catch (error) {
    res.status(404).json({ status: false, data: { message: error.message } });
  }
};

export const userDetails = async (req, res) => {
  const { profileId: id } = req.query;
  try {
    const user = await User.findById(id);
    if (id === req.userId) {
      res.status(200).json({ status: true, data: { userDetails: user } });
    } else {
      user.password = undefined;
      res.status(200).json({ status: true, data: { userDetails: user } });
    }
  } catch (error) {
    res.status(404).json({ status: false, data: { message: error.message } });
  }
};
