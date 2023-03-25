import express from "express";
import mongoose from "mongoose";
import Chat from "../models/chat.js";
import User from "../models/user.js";

// One-on-One Chat access
export const accessChat = async (req, res) => {
  const userId = req.userId;
  const { companionId } = req.body;

  try {
    if (!companionId || companionId.trim() === "") {
      res.status(200).json({
        status: true,
        message: "No Companion Id is available",
        data: {},
      });
      return;
    }

    // get isChat as doc from Chat Model,
    //within the criteria of isGroupChat false
    //and both userId, companionId in the users array.
    // And then populate the users and latestMessage

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: companionId } } },
      ],
    })
      .populate(
        "users",
        "-password -following -followers -city -country -bio -profileBgWallPicture -__v"
      )
      .populate("latestMessage");

    // Here from the variable isChat doc ,
    // we are populating latestMessage's sender and selecting only name pic email to isChat

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name profilPicture email",
    });

    // isChat has length gtr than 0,then sending in response(Means, One-on-One chat already exists)
    // If not creating Chat
    if (isChat.length > 0) {
      res.status(200).json({ status: true, data: { chat: isChat[0] } });
      return;
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [userId, companionId],
      };
    }

    const newChat = await Chat.create(chatData);
    const chat = await Chat.findOne({ _id: newChat._id }).populate(
      "users",
      "-password -following -followers -city -country -bio -profileBgWallPicture -__v"
    );

    res.status(200).json({ status: true, data: { chat: chat } });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
