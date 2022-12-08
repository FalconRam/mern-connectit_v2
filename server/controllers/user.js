import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // If User is Unauthorized one...

    if (!existingUser)
      return res.status(404).json({ message: "User not found." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Password is incorrect." });

    // If User is authorized one...
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secretKey,
      { expiresIn: "2h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. " + error });
  }
};

export const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    city,
    country,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      city,
      country,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secretKey, {
      expiresIn: "2h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ status: false, data: { message: error } });
  }
};