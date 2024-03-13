import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Task } from "./task.models.js";

const user = new Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
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
      required: [true, "Password is required!!"],
      type: String,
    },
    avatar: {
      required: true,
      type: String,
    },
    task: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//this middleware is used to encrypt user password using bcrypt library before saving it to the db
user.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
}); //dont write callback using arrow function because it does not have access to this keyword and context is not known.

//this middleware is used to compare the hashed password and the password user sends while logging in
user.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

user.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

user.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", user);
