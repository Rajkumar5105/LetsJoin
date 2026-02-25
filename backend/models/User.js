// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    coins: {
      type: Number,
      default: 10000, // Each user starts with 10k coins
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
