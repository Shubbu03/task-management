import mongoose, { Schema } from "mongoose";

const user = new Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
    },
    fullname: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    avatar: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", user);
